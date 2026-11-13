import { Composition, Folder } from "remotion";
import { Promo } from "./Promo";
import { Hook } from "./Hook";
import { Free } from "./Free";
import { Tools } from "./Tools";
import { Impact } from "./Impact";
import { Community } from "./Community";
import { Closing } from "./Closing";
import { Reel } from "./reel/Reel";
import { Tutorial, grid, tutorials } from "./tutorials/Tutorial";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Akoizo-Portrait"
        component={Promo}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={900}
      />
      <Composition
        id="Akoizo-Reel"
        component={Reel}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={900}
        defaultProps={{ music: true }}
      />
      <Composition
        id="Akoizo-Reel-SFX-Only"
        component={Reel}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={900}
        defaultProps={{ music: false }}
      />
      <Folder name="Tutorials">
        {tutorials.map((t) => (
          <Composition
            key={t.id}
            id={`Tutorial-${t.id}`}
            component={Tutorial}
            width={1080}
            height={1920}
            fps={30}
            durationInFrames={grid(t).duration}
            defaultProps={{ id: t.id, music: true }}
          />
        ))}
      </Folder>
      <Folder name="Tutorials-SFX-Only">
        {tutorials.map((t) => (
          <Composition
            key={t.id}
            id={`Tutorial-SFX-${t.id}`}
            component={Tutorial}
            width={1080}
            height={1920}
            fps={30}
            durationInFrames={grid(t).duration}
            defaultProps={{ id: t.id, music: false }}
          />
        ))}
      </Folder>
      <Folder name="Scenes">
        <Composition
          id="Hook"
          component={Hook}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={132}
        />
        <Composition
          id="Free"
          component={Free}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={147}
        />
        <Composition
          id="Tools"
          component={Tools}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={177}
        />
        <Composition
          id="Impact"
          component={Impact}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={162}
        />
        <Composition
          id="Community"
          component={Community}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={162}
        />
        <Composition
          id="Closing"
          component={Closing}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={180}
        />
      </Folder>
    </>
  );
};
