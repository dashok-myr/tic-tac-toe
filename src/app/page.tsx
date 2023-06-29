"use client";
import React from "react";
import logo from "../icons/logo.svg";
import Image from "next/image";
import NewGameButtons from "@/components/NewGameButtons";
import ChooseMarkSwitch from "@/components/ChooseMarkSwitch";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center md:w-[480px] md:mx-auto h-screen">
        <div className="w-full flex flex-col gap-10">
          <Image
            src={logo}
            alt="x"
            width="80"
            height="80"
            className="self-center"
          />
          <ChooseMarkSwitch />
          <NewGameButtons />
        </div>
      </main>
    </>
  );
}
