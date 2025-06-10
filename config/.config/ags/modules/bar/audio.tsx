import Wp from "gi://AstalWp";
import { bind } from "astal";

export default function Audio() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  print(bind(speaker, "volume"));

  return (
    <box className="audio group">
      <icon className="item" icon={bind(speaker, "volumeIcon")} />
      <label className="item">
        {bind(speaker, "volume").as((v) => Math.floor(v * 100) + "%")}
      </label>
    </box>
  );
}
