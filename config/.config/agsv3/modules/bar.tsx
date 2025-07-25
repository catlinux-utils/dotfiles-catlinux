import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";

import Workspaces from "./bar/workspaces";
import Clock from "./bar/clock";
import SysTray from "./bar/sys-tray";
import BatteryLabel from "./bar/battery-label";
import ToolBox from "./bar/toolbox";
import Monitoring from "./bar/monitoring";
import ClientTitle from "./bar/client-title";
import Audio from "./bar/audio";

export default function Bar(monitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  return (
    <window
      class="Bar"
      gdkmonitor={monitor}
      margin={2.5}
      marginBottom={1}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
        <box hexpand halign={Gtk.Align.START}>
          <Workspaces />
          <ClientTitle />
        </box>
        <box></box>
        <box hexpand halign={Gtk.Align.END}>
          <Monitoring />
          <Audio />
          <ToolBox />
          <SysTray />
          <BatteryLabel />
          <Clock />
        </box>
      </centerbox>
    </window>
  );
}
