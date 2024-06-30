"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks, PlaygroundLink } from "@/constants";
import { Id } from "@/convex/_generated/dataModel";
import { ChevronDown, ChevronUp } from "lucide-react";

const MobileNav = ({ userId }: { userId: Id<"users"> | null }) => {
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const togglePlayground = () => setIsPlaygroundOpen(!isPlaygroundOpen);

  return (
    <div className="flex items-center justify-center md:hidden">
      <Sheet>
        <Authenticated>
          <SheetClose>
            <UserButton afterSignOutUrl="/" />
          </SheetClose>
        </Authenticated>
        <Unauthenticated>
          <SheetClose>
            <SignInButton mode="modal" />
          </SheetClose>
        </Unauthenticated>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center">
            <button className="p-2">
              <Image src="/hamburger.svg" alt="menu" width={24} height={24} />
            </button>
          </div>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] border-l-0 bg-black sm:w-[400px]"
        >
          <div className="flex h-full flex-col text-white">
            <div className="mb-8 flex items-center justify-between">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            </div>

            <nav className="grow">
              <ul className="flex flex-col space-y-4">
                {NavLinks.map((link) => {
                  if (link.title === "Playground") {
                    return (
                      <div key={link.title} className="my-0">
                        <button
                          onClick={togglePlayground}
                          className=" flex items-center justify-center rounded px-4 py-2 text-left text-lg transition-colors hover:bg-gray-800"
                        >
                          <p className="">{link.title} </p>
                          {isPlaygroundOpen ? <ChevronUp /> : <ChevronDown />}
                        </button>
                        {isPlaygroundOpen && (
                          <div className="mt-2 flex flex-col space-y-2 text-left">
                            {PlaygroundLink.map((subLink) => (
                              <SheetClose key={subLink.title}>
                                <Link
                                  key={subLink.title}
                                  href={subLink.path}
                                  className="block rounded px-4 py-1 transition-colors hover:bg-gray-800"
                                >
                                  {subLink.title}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  if (link.title === "Profile") {
                    return (
                      <>
                        <Authenticated>
                          <li>
                            <SheetClose>
                              <Link
                                href={
                                  link.title === "Profile"
                                    ? `/profile/${userId}`
                                    : link.path
                                }
                                className="block rounded px-4 py-2 text-lg transition-colors hover:bg-gray-800"
                              >
                                {link.title}
                              </Link>
                            </SheetClose>
                          </li>
                        </Authenticated>
                        <Unauthenticated>
                          <SheetClose className="block rounded px-4 py-2 text-left text-lg transition-colors hover:bg-gray-800">
                            <SignInButton mode="modal" />
                          </SheetClose>
                        </Unauthenticated>
                      </>
                    );
                  }
                  return (
                    <li key={link.title}>
                      <SheetClose>
                        <Link
                          href={link.path}
                          className="block rounded px-4 py-2 text-lg transition-colors hover:bg-gray-800"
                        >
                          {link.title}
                        </Link>
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
