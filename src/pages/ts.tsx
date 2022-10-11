import { type } from "os";
import React from "react";

type Props = {
  a: string;
  b: number;
};

export const TypeScript = (Prpps: Props) => {
  const a = "AAAA";
  const b = 1111;

  return (
    <div>
      <h1>TypeScript</h1>
      <input>{Prpps.a}</input>
      <input>{Prpps.b}</input>
    </div>
  );
};
