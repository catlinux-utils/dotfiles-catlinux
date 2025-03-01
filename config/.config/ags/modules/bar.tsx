import { App, Astal, Gtk, Gdk } from "astal/gtk3";

import Workspaces from "./bar/workspaces";
import ClientTitle from "./bar/client-title";
import Clock from "./bar/clock";
import SysTray from "./bar/sys-tray";
import BatteryLabel from "./bar/battery-label";
import ToolBox from "./bar/toolbox";
import Monitoring from "./bar/monitoring";
export default function Bar(monitor: Gdk.Monitor) {
  return (
    <window
      className="Bar"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox>
        <box hexpand halign={Gtk.Align.START}>
          <Workspaces />
        </box>
        <box>
          <ClientTitle />
        </box>
        <box hexpand halign={Gtk.Align.END}>
          <Monitoring />
          <ToolBox />
          <SysTray />
          <BatteryLabel />
          <Clock />
        </box>
      </centerbox>
    </window>
  );
}
