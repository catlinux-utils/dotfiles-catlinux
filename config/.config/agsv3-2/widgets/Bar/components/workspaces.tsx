import AstalHyprland from "gi://AstalHyprland"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "ags"

const hyprland = AstalHyprland.get_default()
const focusedWorkspaceBind = createBinding(hyprland, "focusedWorkspace")

const workspaceCount: number = 15

export default function Workspaces() {
  return (
    <box>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={(_, __, y) =>
          hyprland.dispatch("workspace", y > 0 ? "+1" : "-1")
        }
      />
      <box class="workspaces group">
        {Array.from({ length: workspaceCount }, (_, index) => index + 1).map(
          (workspaceNumber) => {
            return (
              <button
                class={focusedWorkspaceBind((focused) => {
                  const workspace = hyprland.workspaces.find(
                    (w) => w.id == workspaceNumber
                  )

                  // Empty workspace or monitor was reconnected
                  if (!workspace || !focused) return "item"

                  const isOccupied = workspace.get_clients().length > 0
                  const active = focused.id == workspaceNumber

                  return `item${active ? " active" : ""}${
                    isOccupied ? " occupied" : ""
                  }`
                })}
                visible={
                  workspaceNumber <= workspaceCount ||
                  hyprland.get_workspace(workspaceNumber) !== null
                }
                onClicked={() =>
                  hyprland.get_focused_workspace().get_id() != workspaceNumber
                    ? hyprland.dispatch("workspace", `${workspaceNumber}`)
                    : ""
                }
              >
                {workspaceNumber}
              </button>
            )
          }
        )}
      </box>
    </box>
  )
}
