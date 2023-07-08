"use client";
import React from "react";
import Image from "next/image";
import nought from "@/icons/icon-o.svg";
import Link from "next/link";

interface ModalProps {
  gameResult?: string;
  firstBtnLabel: string;
  secondBtnLabel: string;
  showModal: boolean;
  navigateQuitButton: string;
  onFirstBtnClick: () => void;
  onSecondBtnClick: () => void;
}

export default function Modal({
  gameResult,
  firstBtnLabel,
  secondBtnLabel,
  showModal,
  navigateQuitButton,
  onFirstBtnClick,
  onSecondBtnClick,
}: ModalProps) {
  if (!showModal) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-screen my-6 mx-auto">
          <div className="border-0 shadow-lg relative flex flex-col pt-5 px-10 pb-10 w-full bg-light-green outline-none focus:outline-none">
            <div className="flex flex-col justify-center items-center p-5">
              <h3 className="text-xl font-semibold text-silver">
                {gameResult}
              </h3>
              <div className="flex items-center gap-5">
                <Image src={nought} alt="mark" className="h-16" />
                <p className="text-bright-yellow font-bold text-5xl leading-relaxed">
                  TAKES THE ROUND
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5">
              <Link
                href={navigateQuitButton}
                onClick={onFirstBtnClick}
                className="bg-bright-blue p-4 font-semibold rounded-xl cursor-pointer active:translate-y-2  active:[box-shadow:0_0px_0_0_#228c88,0_0px_0_0_#228c88] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#228c88] border-b-[1px] border-y-light-green"
                type="button"
              >
                {firstBtnLabel}
              </Link>
              <button
                className="bg-bright-yellow p-4 font-semibold rounded-xl cursor-pointer active:translate-y-2  active:[box-shadow:0_0px_0_0_#f0a607,0_0px_0_0_#ffd452] active:border-b-[0px] transition-all duration-150 [box-shadow:0_10px_0_0_#d48f04] border-b-[1px] border-y-amber-800"
                type="button"
                onClick={onSecondBtnClick}
              >
                {secondBtnLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
