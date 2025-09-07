import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widgets/Bar/App"

app.start({
  css: style,
  instanceName: "js",
  main() {
    app.get_monitors().map(Bar)
  },
})
