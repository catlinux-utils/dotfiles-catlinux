import { createPoll } from "ags/time"
import GLib from "gi://GLib"

export default function Time({ format = "%A - %d/%m/%Y - %H:%M" }) {
  const time = createPoll("", 1000, () => {
    return GLib.DateTime.new_now_local().format(format)
  })

  return <label class="time group" label={time((time) => time!.toString())} />
}
