const hyprland = await Service.import("hyprland");

function Workspaces() {
  return Widget.EventBox({
    onScrollUp: () => hyprland.messageAsync(`dispatch workspace -1`),
    onScrollDown: () =>
      hyprland.active.workspace.id < 20
        ? hyprland.messageAsync(`dispatch workspace +1`)
        : "",
    child: Widget.Box({
      class_name: "workspaces def_box",
      children: Array.from({ length: 20 }, (_, i) => i + 1).map((workspaceId) =>
        Widget.Button({
          attribute: workspaceId,
          label: `${workspaceId}`,
          onClicked: () =>
            hyprland.messageAsync(`dispatch workspace ${workspaceId}`),
          setup: (self) =>
            self.hook(hyprland, () => {
              self.toggleClassName(
                "focused",
                hyprland.active.workspace.id === workspaceId
              );
              self.toggleClassName(
                "occupied",
                (hyprland.getWorkspace(workspaceId)?.windows || 0) > 0
              );
            }),
        })
      ),

      // remove this setup hook if you want fixed number of buttons
      setup: (self) =>
        self.hook(hyprland, () =>
          self.children.forEach((btn) => {
            if (btn.label > 9) {
              btn.visible = hyprland.workspaces.some(
                (ws) => ws.id === btn.attribute
              );
            }
          })
        ),
    }),
  });
}

export { Workspaces };
