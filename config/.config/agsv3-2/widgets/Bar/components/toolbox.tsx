import { execAsync } from "ags/process"
import { createState } from "ags"

export default function ToolBox(): JSX.Element {
  const [idle, setIdle] = createState(false)

  return (
    <box class="tool-box group">
      <button
        class={`item ${idle.get() ? "item_enabled" : ""}`}
        onClicked={() => {
          setIdle(!idle.get())
          if (idle.get())
            execAsync([
              "bash",
              "-c",
              `pidof wayland-idle-inhibitor.py || ~/.config/hypr/scripts/wayland-idle-inhibitor.py`,
            ]).catch(printerr)
          else execAsync("pkill -f wayland-idle-inhibitor.py").catch(printerr)
        }}
      >
        <image iconName="preferences-system-time-symbolic" pixelSize={12} />
      </button>
    </box>
  )
}
