import { exec, execAsync } from "astal";

export default function ToolBox() {
  let idleEnabled = false;

  execAsync(["bash", "-c", "pidof wayland-idle-inhibitor.py"]).then(
    (output) => {
      idleEnabled = Boolean(output.trim());
    }
  );

  return (
    <box className="tool-box group">
      <button
        className="item"
        onClicked={() => execAsync(["bash", "-c", "hyprshot -m region -z"])}
      >
        <icon icon="applets-screenshooter-symbolic" />
      </button>
      <button
        className="item"
        onClicked={(self) => {
          idleEnabled = !idleEnabled;
          self.toggleClassName("item_enabled", idleEnabled);
          if (idleEnabled)
            execAsync([
              "bash",
              "-c",
              `pidof wayland-idle-inhibitor.py || ~/.config/hypr/scripts/wayland-idle-inhibitor.py`,
            ]).catch(print);
          else execAsync("pkill -f wayland-idle-inhibitor.py").catch(print);
        }}
      >
        <icon icon="clock" />
      </button>
    </box>
  );
}
