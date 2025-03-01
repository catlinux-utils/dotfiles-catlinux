import Notifd from "gi://AstalNotifd";
import { bind } from "astal";
const notifd = Notifd.get_default();

export default function Notification(): JSX.Element {
  /*return (
    <box className="notification group">
      <icon icon="preferences-system-notifications-symbolic" />
      <label label={bind(notifd, "popups").as((p) => p[0]?.summary || "")} />
    </box>
  );*/

  return (
    <box className="notification group">
      <icon icon="preferences-system-notifications-symbolic" />
      <label
        label={bind(notifd, "notifications").as(
          (notifs) => `${notifs[0].get_summary() || ""}`
        )}
      ></label>
    </box>
  );
}
export { Notification };
