"use client";
import React from "react";
import { H2 } from "./typography";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  const router = useRouter();
  return (
    <section className="flex items-center">
      <Image
        src="/back.svg"
        alt="Back"
        className="h-10 w-12 cursor-pointer"
        width={12}
        height={10}
        onClick={() => router.back()}
      />
      <div className="flex flex-grow justify-center">
        <H2 className="text-center">{title}</H2>
      </div>
    </section>
  );
}
