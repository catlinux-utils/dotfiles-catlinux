function ToolBox() {
  return Widget.Box({
    class_name: "tool-box def_box",
    children: [
      Widget.Button({
        on_primary_click: () =>
          Utils.execAsync(["bash", "-c", "hyprshot -m region -z"])
            .then((out) => print(out))
            .catch((err) => print(err)),
        child: Widget.Icon("applets-screenshooter-symbolic"),
        class_name: "def_item",
      }),
      Widget.Button({
        attribute: {
          enabled: false,
        },
        className: "def_item",
        tooltipText: "Keep system awake",
        onClicked: (self) => {
          self.attribute.enabled = !self.attribute.enabled;
          self.toggleClassName("def_item_enabled", self.attribute.enabled);
          if (self.attribute.enabled)
            Utils.execAsync([
              "bash",
              "-c",
              `pidof wayland-idle-inhibitor.py || ${App.configDir}/scripts/wayland-idle-inhibitor.py`,
            ]).catch(print);
          else
            Utils.execAsync("pkill -f wayland-idle-inhibitor.py").catch(print);
        },
        child: Widget.Icon("clock"),
        setup: (self) => {
          self.attribute.enabled = Utils.exec(
            "pidof wayland-idle-inhibitor.py"
          );
          self.toggleClassName("def_item_enabled", self.attribute.enabled);
        },
      }),
    ],
  });
}

export { ToolBox };
