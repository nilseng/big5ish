import { NeuButton } from "../NeuButton";

interface IProps {
  createRoom: () => void;
}

export const Landing = ({ createRoom }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-1/2 md:w-1/2 md:h-1/2 bg-light rounded-3xl m-4 pb-4">
      <NeuButton
        type="light"
        className="text-gray-700 font-bold text-xl bg-gradient-to-r from-red-400 to-blue-500 bg-clip-text text-transparent"
        text="START"
        style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
        action={createRoom}
      />
    </div>
  );
};
