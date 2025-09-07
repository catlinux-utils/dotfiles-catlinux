import Hyprland from "gi://AstalHyprland"
import Pango from "gi://Pango"
import { createBinding, With } from "ags"

export default function ClientTitle() {
  const hyprland = Hyprland.get_default()
  const focused = createBinding(hyprland, "focusedClient")
  return (
    <box class="client-title group" visible={focused.as(Boolean)}>
      <With value={focused}>
        {(value) =>
          value && (
            <label
              class={"client-title-label"}
              //wrap={true}
              //max_width_chars={20}
              //maxWidthChars={20}
              label={createBinding(value, "title").as(String)}
            />
          )
        }
      </With>
    </box>
  )
}
