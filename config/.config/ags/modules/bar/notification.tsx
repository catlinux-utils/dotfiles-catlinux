import Notifd from "gi://AstalNotifd";

function Notification() {
  const notifd = Notifd.get_default();
  return (<box
    class_name="notification"
    visible=11popups.as((p) => p.length > 0)>
    </box>
    children= [
      Widget.Icon({
        icon: "preferences-system-notifications-symbolic",
      }),
      Widget.Label({
        label: popups.as((p) => p[0]?.summary || ""),
      }),
    ],
  );
}

export { Notification };
