import Hyprland from "gi://AstalHyprland";

const workspaceCount: number = 10;

export default function Workspaces(): JSX.Element {
  const hyprland = Hyprland.get_default();

  return (
    <eventbox
      onScroll={(_, event) => {
        const direction = event.delta_y > 0 ? "+1" : "-1";
        if (
          !(
            hyprland.get_focused_workspace().get_id() === 1 &&
            direction === "-1"
          )
        )
          hyprland.dispatch("workspace", direction);
      }}
    >
      <box className="workspaces group">
        {Array.from({ length: workspaceCount }, (_, index) => index + 1).map(
          (workspaceNumber) => {
            return (
              <button
                className={`workspace item${
                  hyprland.get_workspace(workspaceNumber)?.get_clients()
                    .length > 0
                    ? " occupied"
                    : ""
                }${
                  hyprland.get_focused_workspace().get_id() === workspaceNumber
                    ? " active"
                    : ""
                }`}
                visible={
                  workspaceNumber <= workspaceCount ||
                  hyprland.get_workspace(workspaceNumber) !== null
                }
                onClicked={() =>
                  hyprland.get_focused_workspace().get_id() != workspaceNumber
                    ? hyprland.dispatch("workspace", `${workspaceNumber}`)
                    : ""
                }
                setup={(self) => {
                  self.hook(hyprland, "event", (_, event) => {
                    if (
                      event === "openwindow" ||
                      event === "closewindow" ||
                      event === "movewindowv2" ||
                      event === "movewindow"
                    ) {
                      let ws = hyprland
                        .get_clients()
                        .some((c) => c.get_workspace()?.id === workspaceNumber);

                      self.toggleClassName("occupied", ws);
                    }
                    if (event === "workspacev2") {
                      self.toggleClassName(
                        "active",
                        hyprland.get_focused_workspace().get_id() ===
                          workspaceNumber
                      );
                    }
                  });
                }}
              >
                {workspaceNumber}
              </button>
            );
          }
        )}
      </box>
    </eventbox>
  );
}
