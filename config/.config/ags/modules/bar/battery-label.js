const battery = await Service.import("battery");

function BatteryLabel() {
  const icon = battery
    .bind("percent")
    .as((p) => `battery-level-${Math.floor(p / 10) * 10}-symbolic`);

  return Widget.Box({
    class_name: "battery def_box",
    visible: battery.bind("available"),
    children: [
      Widget.Label({
        label: battery.bind("percent").as((p) => `${p}%`),
        maxWidthChars: 4,
      }),
      Widget.Icon({ icon }),
    ],
  });
}

export { BatteryLabel };
