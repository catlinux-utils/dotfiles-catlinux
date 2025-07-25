import { createPoll } from "ags/time";
import GLib from "gi://GLib";

export default function Time({ format = "%A - %m/%d/%Y - %H:%M" }) {
  const time = createPoll(0, 1000, () => {
    return GLib.DateTime.new_now_local().format(format);
  });

  return <label class="time group" label={`${time}`} />;
}
