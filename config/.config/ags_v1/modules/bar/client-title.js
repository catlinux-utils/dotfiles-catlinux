const hyprland = await Service.import("hyprland");

function ClientTitle() {
  return Widget.Label({
    class_name: "client-title",
    label: hyprland.active.client
      .bind("title")
      .as((title) =>
        title.length > 100 ? `${title.substring(0, 47)}...` : title
      ),
    visible: hyprland.active.client.bind("address").as((addr) => addr !== "0x"),
  });
}

export { ClientTitle };
