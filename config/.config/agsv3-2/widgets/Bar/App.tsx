import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"

import Workspaces from "./components/workspaces"
import ClientTitle from "./components/client-title"
import Monitoring from "./components/monitoring"
import Audio from "./components/audio"
import ToolBox from "./components/toolbox"
import SysTray from "./components/sys-tray"
// import BatteryLabel from "./components/battery-label"
import Clock from "./components/clock"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="Bar"
      margin={2.5}
      marginBottom={1}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
        <box $type="start">
          <Workspaces />
          <ClientTitle />
        </box>
        <box $type="end">
          <Monitoring />
          <Audio />
          <ToolBox />
          <SysTray />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
//hexpand halign={Gtk.Align.START}
/* <ClientTitle /> */

/* <box $type="start">
          <Workspaces />
          
        </box> 

<box></box>
        <box hexpand halign={Gtk.Align.END}>
          <Monitoring />
          <Audio />
          <ToolBox />
          <SysTray />
          <BatteryLabel />
          <Clock />
        </box> */
