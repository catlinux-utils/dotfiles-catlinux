const hyprland = await Service.import("hyprland");

function ClientTitle() {
  return Widget.Label({
    class_name: "client-title",
    label: hyprland.active.client.bind("title"),
  });
}

export { ClientTitle };
