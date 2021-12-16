import { NeuButton } from "../NeuButton";

interface IProps {
  createRoom: () => void;
}

export const Landing = ({ createRoom }: IProps) => {
  return (
    <div className="flex flex-col justify-between items-center w-full h-1/2 md:w-1/2 md:h-1/2 bg-light rounded elevation m-4 pt-40 pb-4">
      <NeuButton
        type="light"
        className="text-gray-700"
        text="start"
        style={{ height: "10rem", width: "10rem", padding: "2.5rem" }}
        handleClick={createRoom}
      />
    </div>
  );
};
