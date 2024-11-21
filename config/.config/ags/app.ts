import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./modules/bar";

App.start({
  instanceName: "ts",
  css: style,
  main() {
    Bar(0);
  },
});
