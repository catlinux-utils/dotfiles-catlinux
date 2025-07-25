#!/usr/bin/ags run
import app from "ags/gtk4/app";
import style from "./style.scss";
import Bar from "./modules/bar";

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar);
  },
});
