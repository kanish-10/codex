import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <hr className="w-3/4 text-white" />
      <footer className="m-3 flex w-3/4 flex-row items-center justify-between pb-3">
        <div className="hidden md:flex">
          <Image src="/logo.png" alt="logo" height={50} width={50} />
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-sm">
            Made by <span className="font-bold underline">Kanish</span>
          </p>
          <Button size="sm" variant="outline" className="text-black">
            <Link href="https://github.com/kanish-10">Github</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
