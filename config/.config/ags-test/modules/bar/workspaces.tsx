import Hyprland from "gi://AstalHyprland";
import { Variable, bind } from "astal";

export default function Workspaces(): JSX.Element {
  const hyprland = Hyprland.get_default();
  return (
    <eventbox
      onScroll={(_, e) => {
        e.delta_y > 0
          ? hyprland.dispatch("workspace", "+1")
          : hyprland.dispatch("workspace", "-1");
      }}
    >
      <box className="workspaces def_box">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((workspaceId) => {
          const className = Variable.derive(
            [bind(hyprland, "workspaces"), bind(hyprland, "focusedWorkspace")],
            (workspaces, focused) => {
              const workspace = workspaces.find((w) => w.id === workspaceId);
              if (!workspace) {
                return "Workspace";
              }

              const occupied = workspace.get_clients().length > 0;
              const active = focused.id === workspaceId;
              console.log(
                "workspaceid:",
                workspaceId,
                `workspace${active ? " active" : ""}${
                  occupied ? " occupied" : ""
                }`
              );

              return `workspace${active ? " active" : ""}${
                occupied ? " occupied" : ""
              }`;
            }
          );
          return (
            <button
              className={className()}
              onClicked={() => hyprland.dispatch("workspace", `${workspaceId}`)}
            >
              {workspaceId}
            </button>
          );
        })}
      </box>
    </eventbox>
  );
}
