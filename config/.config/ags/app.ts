#!/usr/bin/ags run
import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./modules/bar";

App.start({
  css: style,
  instanceName: "astral",
  requestHandler(request, res) {
    print(request);
    res("ok");
  },
  main: () => App.get_monitors().map(Bar),
});
