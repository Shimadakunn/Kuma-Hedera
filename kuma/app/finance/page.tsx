"use client";

import SuppliedBalance from "./supplied-balance";
import Interact from "./interact";

export default function Finance() {
  return (
    <main className="h-full w-full flex items-start justify-start flex-col">
      <SuppliedBalance />
      <Interact />
    </main>
  );
}
