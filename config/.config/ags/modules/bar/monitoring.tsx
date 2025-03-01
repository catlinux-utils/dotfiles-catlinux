import { bind, Variable } from "astal";

const cpu = Variable(0).poll(1000, [
  "sh",
  "-c",
  `LANG=C top -bn1 | rg '%Cpu' | tail -1 | awk '{print 100-$8}'`,
]);

const ram = Variable(0).poll(
  1000,
  ["sh", "-c", `free | tail -2 | head -1 | awk '{print $3/$2*100}'`],
  (out) => parseInt(out)
);

const temp = Variable(0).poll(
  1000,
  `cat /sys/class/hwmon/hwmon3/temp1_input`,
  (out) => parseInt(out) / 1000
);

export default function Monitoring() {
  return (
    <box className={"monitoring group"}>
      <label
        label={bind(cpu).as((v) => `CPU: ${v.toString()}%`)}
        className={"item"}
      />
      <label
        label={bind(ram).as((v) => `RAM: ${v.toString()}%`)}
        className={"item"}
      />
      <label
        label={bind(temp).as((v) => `TEMP: ${v.toString()}°C`)}
        className={"item"}
      />
    </box>
  );
}
