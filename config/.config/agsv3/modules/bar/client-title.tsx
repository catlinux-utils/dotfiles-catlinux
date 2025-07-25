import Hyprland from "gi://AstalHyprland";
import { createBinding } from "ags";

export default function ClientTitle() {
  const hyprland = Hyprland.get_default();
  const focused = createBinding(hyprland, "focusedClient");
  return (
    <box class="client-title group" visible={focused.as(Boolean)}>
      {focused.as(
        (client) =>
          client && (
            <label
              class={"client-title-label"}
              wrap={true}
              maxWidthChars={70}
              label={createBinding(client, "title").as(String)}
            />
          )
      )}
    </box>
  );
}
