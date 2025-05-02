import Quickshell
import Quickshell.Io
import Quickshell.Hyprland
import QtQuick
import QtQuick.Layouts
import "bar" as BarModules

Scope {
  Variants {
    model: Quickshell.screens


    PanelWindow {
      id: barWindow
      property var modelData
      screen: modelData

      color: "#00000000"
      height: 23


      visible: true

      anchors {
        top: true
        left: true
        right: true
      }

      Rectangle {
        id: bar
        anchors {
          fill: parent
          margins: 2
        }
        color: "#31000000"
        radius:5
        border.color: "#00000000"
        border.width: 5

        RowLayout {
          id: left
          Layout.alignment: Qt.AlignLeft

          BarModules.Workspaces {}
        }
      }
    }
  }
}