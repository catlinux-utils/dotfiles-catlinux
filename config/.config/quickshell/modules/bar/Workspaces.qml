import Quickshell
import Quickshell.Io
import Quickshell.Hyprland
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls

Rectangle {
    color: "#6f1212"
    Layout.leftMargin: 4
    Layout.rightMargin: 4

    width: childrenRect.width
    Layout.fillHeight: true

    radius:8

    RowLayout {
        id: workspaces
        height: parent.height

        Item {
            Layout.preferredWidth: 2

        }
        Repeater {
            model: 15

            Item {
                id: container
                width: Math.max(fontMetrics.boundingRect(text.text).width, 12)
                Layout.fillHeight: true

                FontMetrics {
                    id: fontMetrics
                    font: text.font
                }
                Rectangle {
                    id: rect
                    anchors {
                        fill: parent
                    }
                    color: "transparent"
                    border.color: area.containsMouse ? "white" : "transparent"
                    border.width: 1
                    radius: 26
                    Text {
                        id: text
                        font.pixelSize: 13
                        color: "white"
                        text: index + 1
                        anchors.centerIn: parent
                    }
                }

                MouseArea {
                    id: area
                    hoverEnabled: true
                    anchors.fill: rect
                }
            }
        }
        Item {
            Layout.preferredWidth: 3
        }
    }
}
