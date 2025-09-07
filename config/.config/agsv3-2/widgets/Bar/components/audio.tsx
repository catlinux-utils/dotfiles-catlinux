import AstalWp from "gi://AstalWp"
import { createBinding } from "ags"
import { Astal, Gtk, Gdk } from "ags/gtk4"

export default function Audio() {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!
  const volume = createBinding(speaker, "volume")

  function transformLabel(volume: number) {
    return `${Math.round(volume * 100)}%`
  }

  return (
    <box>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={(_, __, y) => {
          const direction = y > 0 ? -0.01 : +0.01
          speaker.set_volume(
            Math.max(0, Math.min(1, speaker.volume + direction))
          )
        }}
      />
      <box class="audio group">
        <image
          class="item"
          iconName={createBinding(speaker, "volumeIcon")}
          pixelSize={12}
        />
        <label class="item" label={volume(transformLabel)} />
      </box>
    </box>
  )
}
