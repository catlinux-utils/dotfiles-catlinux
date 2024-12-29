import Tray from "gi://AstalTray";
import { bind } from "astal";
import { App, Astal, Gtk, Gdk } from "astal/gtk3";

export default function SysTray() {
  const tray = Tray.get_default();

  return (
    <box className="tray group">
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            className="item"
            tooltipMarkup={bind(item, "tooltipMarkup")}
            usePopover={false}
            actionGroup={bind(item, "action-group").as((ag) => [
              "dbusmenu",
              ag,
            ])}
            menuModel={bind(item, "menu-model")}
          >
            <icon gicon={bind(item, "gicon")} />
          </menubutton>
        ))
      )}
    </box>
  );
}

export { SysTray };
