import { Variable, GLib } from "astal";

export default function Time({ format = "%H:%M - %A %e." }) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!
  );

  return (
    <label
      className="time group"
      onDestroy={() => time.drop()}
      label={time()}
    />
  );
}
