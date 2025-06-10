import Wp from "gi://AstalWp";
import { bind } from "astal";

export default function Audio() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;

  return (
    <eventbox
      onScroll={(_, event) => {
        const direction = event.delta_y > 0 ? -0.01 : +0.01;
        speaker.volume = Math.max(0, Math.min(1, speaker.volume + direction));
      }}
    >
      <box className="audio group">
        <icon className="item" icon={bind(speaker, "volumeIcon")} />
        <label className="item">
          {bind(speaker, "volume").as((v) => Math.floor(v * 100) + "%")}
        </label>
      </box>
    </eventbox>
  );
}
