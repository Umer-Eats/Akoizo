import { Composition, Folder } from "remotion";
import { Promo } from "./Promo";
import { Hook } from "./Hook";
import { Free } from "./Free";
import { Tools } from "./Tools";
import { Impact } from "./Impact";
import { Community } from "./Community";
import { Closing } from "./Closing";

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
