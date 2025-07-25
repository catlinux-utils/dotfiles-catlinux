import { execAsync } from "ags/process";
import { createState } from "ags";

export default function ToolBox(): JSX.Element {
  const idleEnabled = createState(false);

  return (
    <box class="tool-box group">
      <button
        class="item"
        onClicked={() => execAsync(["hyprshot", " -m ", "region", " -z"])}
      >
        <image iconName="applets-screenshooter-symbolic" />
      </button>
      <button
        class={`item ${idleEnabled.value ? "item_enabled" : ""}`}
        onClicked={() => {
          idleEnabled.value = !idleEnabled.value;
          if (idleEnabled.value)
            execAsync([
              "bash",
              "-c",
              `pidof wayland-idle-inhibitor.py || ~/.config/hypr/scripts/wayland-idle-inhibitor.py`,
            ]).catch(printerr);
          else execAsync("pkill -f wayland-idle-inhibitor.py").catch(printerr);
        }}
      >
        <image iconName="preferences-system-time-symbolic" />
      </button>
    </box>
  );
}
