import { execAsync } from "astal";

export default function ToolBox(): JSX.Element {
  let idleEnabled: boolean = false;

  return (
    <box className="tool-box group">
      <button
        className="item"
        onClicked={() => execAsync(["hyprshot", " -m ", "region", " -z"])}
      >
        <icon icon="applets-screenshooter-symbolic" />
      </button>
      <button
        className="item"
        onClicked={(self: any) => {
          idleEnabled = !idleEnabled;

          self.toggleClassName("item_enabled", idleEnabled);
          if (idleEnabled)
            execAsync([
              "bash",
              "-c",
              `pidof wayland-idle-inhibitor.py || ~/.config/hypr/scripts/wayland-idle-inhibitor.py`,
            ]).catch(printerr);
          else execAsync("pkill -f wayland-idle-inhibitor.py").catch(printerr);
        }}
        setup={(self: any) => self.toggleClassName("item_enabled", idleEnabled)}
      >
        <icon icon="clock" />
      </button>
    </box>
  );
}
