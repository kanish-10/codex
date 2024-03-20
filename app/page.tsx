import { BoxesCore } from "@/components/ui/background-boxes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex size-full flex-col items-center justify-center gap-5 overflow-hidden rounded-lg bg-black">
      <div className="pointer-events-none absolute inset-0 z-20 size-full bg-black [mask-image:radial-gradient(transparent,white)]" />

      <BoxesCore />
      {/* <h1 className={cn("md:text-4xl text-white relative z-20 text-2xl")}> */}
      {/*  CodeX */}
      {/* </h1> */}
      <Image
        src="/logo.png"
        alt="logo"
        height={120}
        width={120}
        className="z-20"
      />
      <p className="relative z-20 mt-2 text-center text-sm text-neutral-300">
        Platform where you can run and store your code snippets.
        <br /> Share your code snippets with the world and more.
      </p>
      <Button variant="outline" className="z-20 text-black">
        <Link href="/home">Enter CodeX</Link>
      </Button>
    </div>
  );
}
