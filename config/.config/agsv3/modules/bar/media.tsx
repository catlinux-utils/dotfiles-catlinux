import { bind, Variable } from "astal";
import Mpris from "gi://AstalMpris";
import { Astal, Gtk, Gdk } from "astal/gtk3";

export default function Media() {
  const mpris = Mpris.get_default();

  return (
    <box class={"media group"}>
      {bind(mpris, "players").as((ps) =>
        ps[0] ? (
          <box class={"item"}>
            <box
              class="Cover"
              valign={Gtk.Align.CENTER}
              css={bind(ps[0], "coverArt").as(
                (cover) => `background-image: url('${cover}');`
              )}
            />
            <label
              maxWidthChars={10}
              label={bind(ps[0], "metadata").as(
                () => `${ps[0].title} - ${ps[0].artist}`
              )}
            />
          </box>
        ) : (
          <label class={"item"} label="Nothing Playing" />
        )
      )}
    </box>
  );
}
