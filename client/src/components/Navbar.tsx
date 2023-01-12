import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { Logo } from "./Logo";
import { NeuButton } from "./NeuButton";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();

  const { isMuted, setIsMuted, audio } = useContext(AppContext);

  const mute = () => {
    if (audio) audio.current.muted = true;
    if (setIsMuted) setIsMuted(true);
  };

  const unmute = () => {
    if (audio) {
      audio.current.muted = false;
    }
    if (audio?.current.paused) audio.current.play();
    if (setIsMuted) setIsMuted(false);
  };

  return (
    <nav className="w-screen flex items-center flex-wrap p-4">
      <Link to="/" className="flex items-center">
        <NeuButton type="colored" style={{ padding: "1rem" }} componentIcon={<Logo height="2rem" width="2rem" />} />
      </Link>
      <button
        className="inline-flex p-3 rounded lg:hidden text-gray-50 ml-auto hover:text-white outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className={`${isMenuOpen ? "" : "hidden"} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <div
            className="text-sm lg:inline-flex lg:w-auto w-full lg:px-6 py-2 rounded text-gray-50 font-light items-center justify-center hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            {isMuted ? (
              <NeuButton
                type="colored"
                icon={faVolumeMute}
                style={{ height: "2rem", width: "2rem", padding: "0.5rem" }}
                action={unmute}
              />
            ) : (
              <NeuButton
                type="colored"
                icon={faVolumeUp}
                style={{ height: "2rem", width: "2rem", padding: "0.5rem" }}
                action={mute}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
