import Image from "next/image";
import restart from "@/icons/icon-restart.svg";
import React from "react";

interface IRestartButton {
  onRestart: () => void;
}

export default function RestartButton({ onRestart }: IRestartButton) {
  return (
    <button
      onClick={onRestart}
      className="flex justify-center items-center h-12 w-12 bg-silver rounded-xl ml-7"
    >
      <Image src={restart} alt="restart" className="h-5 w-5" />
    </button>
  );
}
