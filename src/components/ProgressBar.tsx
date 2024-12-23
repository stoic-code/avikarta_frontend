"use client";
import React from "react";
import { AppProgressBar } from "next-nprogress-bar";

export default function Progressbar() {
  return (
    <AppProgressBar
      height="4px"
      color="#4cae4e"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
