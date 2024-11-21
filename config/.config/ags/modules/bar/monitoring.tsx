function Monitoring() {
  return Widget.Box({
    children: [
      Widget.Label({
        class_name: "def_box",
        setup: (self) =>
          self.poll(5000, () =>
            Utils.execAsync([
              "bash",
              "-c",
              "LANG=C top -bn1 | grep Cpu | sed 's/\\,/\\./g' | awk '{print $2}'",
            ]).then((output) => {
              self.label = `󰍛  ${Math.round(Number(output))}%`;
            })
          ),
      }),
      Widget.Label({
        class_name: "def_box",
        setup: (self) =>
          self.poll(5000, () =>
            Utils.execAsync([
              "bash",
              "-c",
              `LANG=C free | awk '/^Mem/ {printf("%.1f / %.1f GiB", $3/1024/1024, $2/1024/1024)}'`,
            ]).then((output) => {
              self.label = `  ${output}`;
            })
          ),
      }),
    ],
  });
}

export { Monitoring };
