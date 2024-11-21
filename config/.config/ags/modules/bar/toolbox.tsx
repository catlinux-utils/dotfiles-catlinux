import { exec, execAsync } from "astal";

export default function ToolBox() {
  let idleEnabled = exec("pidof wayland-idle-inhibitor.py") ? true : false;
  return (
    <box className="tool-box def_box">
      <button
        className="def_item"
        onClicked={() => execAsync(["bash", "-c", "hyprshot -m region -z"])}
      >
        <icon>applets-screenshooter-symbolic</icon>
      </button>
      <button
        className="def_item"
        onClicked={(self) => {
          idleEnabled = !idleEnabled;
          self.toggleClassName("def_item_enabled", idleEnabled);
          if (idleEnabled)
            execAsync([
              "bash",
              "-c",
              `pidof wayland-idle-inhibitor.py || ~/.config/hypr/scripts/wayland-idle-inhibitor.py`,
            ]).catch(print);
          else execAsync("pkill -f wayland-idle-inhibitor.py").catch(print);
        }}
      >
        <icon>clock</icon>
      </button>
    </box>
  );
}
