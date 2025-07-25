import Hyprland from "gi://AstalHyprland";
import { For, createState, createBinding, With } from "ags";
import { Astal, Gtk, Gdk } from "ags/gtk4";

const workspaceCount: number = 15;

const [workspaceArray, setWorkspaceArray] = createState<Array<number>>([]);
const newWorkspaceIds: number[] = [];

for (let i = 1; i <= 15; i++) {
  newWorkspaceIds.push(i);
}
setWorkspaceArray(newWorkspaceIds);

export default function Workspaces(): JSX.Element {
  const hyprland = Hyprland.get_default();
  return (
    <box>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
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
      />

      <box class="workspaces group">
        <With value={workspaceArray}>
          {(workspaceNumber) => {
            <button
              class={`workspace item${
                hyprland.get_workspace(workspaceNumber)?.get_clients().length >
                0
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
              $={(self) => {
                hyprland.connect("event", (_, event) => {
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
            </button>;
          }}
        </With>
      </box>
    </box>
  );
}
