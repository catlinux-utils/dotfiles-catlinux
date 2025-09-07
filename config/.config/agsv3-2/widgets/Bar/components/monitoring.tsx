import { createBinding, createState } from "ags"
import { exec, execAsync } from "ags/process"
import { createPoll } from "ags/time"
import GTop from "gi://GTop"

export default function Monitoring() {
  const [lastCpuTop, setLastCpuTop] = createState(new GTop.glibtop_cpu())
  const INTERVAL = 1000

  const cpu = createPoll(0, INTERVAL, () => {
    const cpuTop = new GTop.glibtop_cpu()
    GTop.glibtop_get_cpu(cpuTop)
    const total = cpuTop.total - lastCpuTop.get().total
    const user = cpuTop.user - lastCpuTop.get().user
    const sys = cpuTop.sys - lastCpuTop.get().sys
    const nice = cpuTop.nice - lastCpuTop.get().nice
    setLastCpuTop(cpuTop)
    return (user + sys + nice) / total
  })

  const ram = createPoll(0, INTERVAL, () => {
    const memTop = new GTop.glibtop_mem()
    GTop.glibtop_get_mem(memTop)
    return memTop.user / memTop.total
  })
  /*
  const disk = createPoll(0, INTERVAL, () => {
    const diskTop = new GTop.glibtop_fsusage();
    GTop.glibtop_get_fsusage(diskTop, "/");
    return diskTop.bavail / diskTop.bfree;
  });*/

  const temp = createPoll(0, INTERVAL, () => {
    return parseInt(exec(`cat /sys/class/hwmon/hwmon3/temp1_input`)) / 1000
  })

  console.log(cpu, ram, temp)
  return (
    <button
      class={"monitoring group"}
      onClicked={() => {
        execAsync("kitty -e btop")
      }}
    >
      <box>
        <label label={` CPU: ${cpu.as(String)}%`} class={"item"} wrap={true} />
        <label label={`RAM: ${ram}%`} class={"item"} wrap={true} />
        <label label={`TEMP: ${temp}°C `} class={"item"} wrap={true} />
      </box>
    </button>
  )
}
