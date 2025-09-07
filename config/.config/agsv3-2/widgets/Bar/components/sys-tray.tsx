import AstalTray from "gi://AstalTray"
import Gtk from "gi://Gtk?version=4.0"
import { createBinding, For } from "ags"

export default function SysTray() {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
    btn.menuModel = item.menuModel
    btn.insert_action_group("dbusmenu", item.actionGroup)
    item.connect("notify::action-group", () => {
      btn.insert_action_group("dbusmenu", item.actionGroup)
    })
  }

  return (
    <box class="tray group">
      <For each={items}>
        {(item) => (
          <menubutton $={(self) => init(self, item)} class="item">
            <image gicon={createBinding(item, "gicon")} pixelSize={12} />
          </menubutton>
        )}
      </For>
    </box>
  )
}

export { SysTray }
