import Tray from "gi://AstalTray";
import { createBinding } from "ags";

export default function SysTray() {
  const tray = Tray.get_default();

  return (
    <box class="tray group">
      {createBinding(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            class="item"
            tooltipMarkup={createBinding(item, "tooltipMarkup")}
            usePopover={false}
            actionGroup={createBinding(item, "action-group").as((ag) => [
              "dbusmenu",
              ag,
            ])}
            menuModel={createBinding(item, "menu-model")}
          >
            <icon gicon={createBinding(item, "gicon")} />
          </menubutton>
        ))
      )}
    </box>
  );
}

export { SysTray };
