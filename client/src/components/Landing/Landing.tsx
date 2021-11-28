import { useRef } from "react";
import { NeuButton } from "../NeuButton";

export const Landing = () => {
  const audio = useRef(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"));

  const playAudio = () => {
    audio.current.muted = false;
    audio.current.play();
  };

  const mute = () => {
    audio.current.muted = true;
  };

  return (
    <div className="flex flex-col justify-between items-center w-full h-1/2 md:w-1/2 md:h-1/2 bg-light rounded elevation m-4 pt-40 pb-4">
      <NeuButton text="start" height="10rem" width="10rem" handleClick={playAudio} />
      <NeuButton text="mute" height="1rem" width="1rem" handleClick={mute} />
    </div>
  );
};
