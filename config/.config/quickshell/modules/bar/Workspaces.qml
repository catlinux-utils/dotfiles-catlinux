import Quickshell
import Quickshell.Io
import Quickshell.Hyprland
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls

Rectangle {
    color: "#4d000000"
    Layout.leftMargin: 4
    Layout.rightMargin: 2

    width: childrenRect.width
    height: childrenRect.height

    radius:5

    RowLayout {
        id: workspaces
        Repeater {
            model: 15
            MouseArea {
                width: Math.max(childrenRect.width, 12)
                height: childrenRect.height
                Layout.leftMargin: 2
                Layout.rightMargin: 2
                Rectangle {
                    width: childrenRect.width
                    height: childrenRect.height
                    color: "transparent"
                    Text {
                        font.pixelSize: 12
                        id: text
                        color: "white"
                        text: index + 1
                    }
                }
            }
        }
    }
}
