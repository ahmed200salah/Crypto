"use client";
import Image from "next/image";
import { CoolMode } from "../animata/Cool-Mode/Cool-Mode";

export default function Logo() {
  return (
    <CoolMode
      options={{
        particle: "../../favicon.ico",
      }}
    >
      <Image
        src={"/favicon.ico"}
        width={50}
        height={50}
        alt="logo"
        priority
        className="transition-all hover:-rotate-12 hover:-translate-y-2 cursor-pointer active:scale-90 "
      />
    </CoolMode>
  );
}
