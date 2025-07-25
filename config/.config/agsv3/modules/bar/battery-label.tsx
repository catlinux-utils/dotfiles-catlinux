import { createBinding } from "ags";
import Battery from "gi://AstalBattery";

export default function BatteryLevel() {
  const bat = Battery.get_default();

  return (
    <box class="battery group" visible={createBinding(bat, "isPresent")}>
      <image iconName={createBinding(bat, "batteryIconName")} />
      <label
        label={createBinding(bat, "percentage").as(
          (p) => ` ${Math.floor(p * 100)} %`
        )}
      />
    </box>
  );
}
