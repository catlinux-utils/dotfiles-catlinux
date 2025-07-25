import Wp from "gi://AstalWp";
import { createBinding } from "ags";
import { Astal, Gtk, Gdk } from "ags/gtk4";

export default function Audio() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;

  return (
    <box>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={(_, event) => {
          const direction = event.delta_y > 0 ? -0.01 : +0.01;
          speaker.volume = Math.max(0, Math.min(1, speaker.volume + direction));
        }}
      />
      <box class="audio group">
        <image class="item" iconName={createBinding(speaker, "volumeIcon")} />
        <label class="item">
          {createBinding(speaker, "volume").as(
            (v) => Math.floor(v * 100) + "%"
          )}
        </label>
      </box>
    </box>
  );
}
