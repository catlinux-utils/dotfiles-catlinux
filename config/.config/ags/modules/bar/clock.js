const date = Variable("", {
  poll: [1000, 'date "+%H:%M %b %e"'],
});
function Clock() {
  return Widget.Label({
    class_name: "clock def_box",
    label: date.bind(),
  });
}

export { Clock };
