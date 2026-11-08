import { Img, staticFile } from "remotion";
import { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Player, PlayerRef } from "@remotion/player";
import { Promo } from "./Promo";
const App = () => {
  const player = useRef<PlayerRef>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const p = player.current;
    if (!p) return;
    const play = () => setPlaying(true);
    const pause = () => setPlaying(false);
    p.addEventListener("play", play);
    p.addEventListener("pause", pause);
    p.addEventListener("ended", pause);
    return () => {
      p.removeEventListener("play", play);
      p.removeEventListener("pause", pause);
      p.removeEventListener("ended", pause);
    };
  }, []);
  return (
    <main>
      <header>
        <span>AKOIZO®</span>
        <span>THE OPEN STUDY LAB</span>
      </header>
      <div className="layout">
        <section
          className="stage"
          aria-label="Akoizo 30-second portrait promotional video"
        >
          <Player
            ref={player}
            component={Promo}
            durationInFrames={900}
            fps={30}
            compositionWidth={1080}
            compositionHeight={1920}
            renderPoster={() => (
              <Img
                src={staticFile("poster.png")}
                alt="Akoizo — Your next breakthrough starts here"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            showPosterWhenUnplayed
            controls
            clickToPlay
            doubleClickToFullscreen
            showVolumeControls
            style={{ width: "100%", aspectRatio: "9/16" }}
            aria-label="Play Akoizo promotional video"
          />
        </section>
        <aside>
          <p className="eyebrow">30 SECONDS. A WORLD OF POSSIBILITY.</p>
          <h1>
            Stay curious.
            <br />
            <em>Go further.</em>
          </h1>
          <p>
            A free Science Olympiad study app, open to everyone. Already
            impacting 400+ students.
          </p>
          <button
            className="primary"
            onClick={() => {
              if (playing) {
                player.current?.pause();
              } else {
                player.current?.play();
              }
              setPlaying(!playing);
            }}
          >
            {playing ? "Pause film" : "Play film"} <span>↗</span>
          </button>
          <nav aria-label="Jump to a scene">
            {[
              ["The idea", 0],
              ["Always free", 120],
              ["Study tools", 255],
              ["Our impact", 420],
              ["Your community", 570],
              ["Get started", 720],
            ].map(([label, frame]) => (
              <button
                key={label}
                onClick={() => player.current?.seekTo(Number(frame) + 30)}
              >
                {label}
              </button>
            ))}
          </nav>
          <a
            className="primary"
            href="https://akoizo.app"
            target="_blank"
            rel="noreferrer"
          >
            Explore Akoizo <span>↗</span>
          </a>
          <a
            className="school"
            href="https://akoizo.app/contact"
            target="_blank"
            rel="noreferrer"
          >
            Set up your school community ↗
          </a>
          <p className="small">
            Sound on for the original soundtrack.
            <br />
            Portrait · 1080 × 1920 · 30 seconds
          </p>
        </aside>
      </div>
    </main>
  );
};
createRoot(document.getElementById("root")!).render(<App />);
