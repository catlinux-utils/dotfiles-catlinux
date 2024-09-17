import { Workspaces } from "./bar/workspaces.js";
import { ClientTitle } from "./bar/client-title.js";
import { Notification } from "./bar/notification.js";
import { ToolBox } from "./bar/toolbox.js";
import { Clock } from "./bar/clock.js";
import { SysTray } from "./bar/sys-tray.js";
import { BatteryLabel } from "./bar/battery-label.js";

function Left() {
  return Widget.Box({
    spacing: 8,
    children: [Workspaces()],
  });
}

function Center() {
  return Widget.CenterBox({
    spacing: 8,
    //startWidget: Media(),
    centerWidget: ClientTitle(),
    //endWidget: ToolBox(),
  });
}

function Right() {
  return Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
      Notification(),
      ToolBox(),
      //Volume(),
      SysTray(),
      BatteryLabel(),
      Clock(),
    ],
  });
}

function Bar(monitor = 0) {
  return Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });
}

export { Bar };
