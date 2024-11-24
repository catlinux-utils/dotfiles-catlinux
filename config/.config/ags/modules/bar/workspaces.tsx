import Hyprland from "gi://AstalHyprland";

export default function Workspaces(): JSX.Element {
  const hyprland = Hyprland.get_default();

  return (
    <eventbox
      onScroll={(_, event) => {
        const direction = event.delta_y > 0 ? "+1" : "-1";
        hyprland.dispatch("workspace", direction);
      }}
    >
      <box className="workspaces group">
        {Array.from({ length: 10 }, (_, index) => index + 1).map(
          (workspaceNumber) => {
            return (
              <button
                className={`workspace${
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
                  workspaceNumber <= 9 ||
                  hyprland.get_workspace(workspaceNumber) !== null
                }
                setup={(self) => {
                  self.hook(hyprland, "event", (_, event) => {
                    if (event === "openwindow" || event === "closewindow") {
                      if (
                        hyprland.get_focused_workspace().get_id() !==
                        workspaceNumber
                      ) {
                        return;
                      }

                      self.toggleClassName(
                        "occupied",
                        (hyprland.get_workspace(workspaceNumber)?.get_clients()
                          .length ?? 0) !== 0
                      );
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
