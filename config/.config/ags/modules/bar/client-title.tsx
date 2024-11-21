import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";

export default function ClientTitle() {
  const hyprland = Hyprland.get_default();
  const focused = bind(hyprland, "focusedClient");
  return (
    <box className="client-title group" visible={focused.as(Boolean)}>
      {focused.as(
        (client) => client && <label label={bind(client, "title").as(String)} />
      )}
    </box>
  );
}