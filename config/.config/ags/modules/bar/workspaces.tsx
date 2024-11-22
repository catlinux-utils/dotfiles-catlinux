import Hyprland from "gi://AstalHyprland";
import { Variable, bind } from "astal";

export default function Workspaces(): JSX.Element {
  const hyprland = Hyprland.get_default();
  return (
    <eventbox
      onScroll={(_, e) => {
        e.delta_y > 0
          ? hyprland.dispatch("workspace", "+1")
          : hyprland.dispatch("workspace", "-1");
      }}
    >
      <box className="workspaces group">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((workspaceId) => {
          return (
            <button
              className={`workspace${
                hyprland.get_workspace(workspaceId)?.get_clients().length > 0
                  ? " occupied"
                  : ""
              }${
                hyprland.get_focused_workspace().get_id() === workspaceId
                  ? " active"
                  : ""
              }`}
              onClicked={() => hyprland.dispatch("workspace", `${workspaceId}`)}
              setup={(self) => {
                self.hook(hyprland, "event", (_, event) => {
                  /*if (event === "openwindow" || event === "closewindow") {
                    return self.toggleClassName(
                      "occupied",
                      hyprland.get_workspace(workspaceId)?.get_clients()
                        .length > 0
                    );
                  }*/
                  if (event === "workspacev2") {
                    return self.toggleClassName(
                      "active",
                      hyprland.get_focused_workspace().get_id() === workspaceId
                    );
                  }
                });
              }}
            >
              {workspaceId}
            </button>
          );
        })}
      </box>
    </eventbox>
  );
}
