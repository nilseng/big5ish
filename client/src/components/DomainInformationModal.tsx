import { Domain } from "@big5ish/types";
import { Dispatch, SetStateAction } from "react";

export const DomainInformationModal = ({
  isOpen,
  setIsOpen,
  domain,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  domain: Domain;
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="absolute z-50 flex justify-center items-center w-full h-full bg-white/50 top-0 p-6"
      onClick={() => setIsOpen(false)}
    >
      <div className="min-h-[50%] max-h-full w-full max-w-md overflow-y-auto bg-white rounded-2xl text-gray-700 p-6">
        <h1 className="text-2xl pb-4">{domain.title}</h1>
        {domain.description.split(/<br\s?\/>/).map((text, i) => (
          <p key={i} className="pb-2">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};
