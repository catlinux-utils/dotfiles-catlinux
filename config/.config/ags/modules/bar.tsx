import { App, Astal, Gtk } from "astal/gtk3";
import { Variable } from "astal";

import Workspaces from "./bar/workspaces";
import ClientTitle from "./bar/client-title";
//import Notification from "./bar/notification";
//import ToolBox from "./bar/toolbox";
import Clock from "./bar/clock";
import SysTray from "./bar/sys-tray";
import BatteryLabel from "./bar/battery-label";
//import Monitoring from "./bar/monitoring";

function Left() {
  return (
    <box halign={Gtk.Align.CENTER}>
      <Workspaces />
    </box>
  );
}

function Center() {
  return (
    <centerbox spacing={8}>
      <ClientTitle />
    </centerbox>
  );
}

function Right() {
  return (
    <box spacing={8}>
      <SysTray />
      <BatteryLabel />
      <Clock />
    </box>
  );
}
const time = Variable("").poll(1000, "date");

export default function Bar(monitor: number) {
  return (
    <window
      className="Bar"
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox>
        <Left />
        <ClientTitle />

        <Right />
      </centerbox>
    </window>
  );
}
