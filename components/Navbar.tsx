"use client";

import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { NavLinks, PlaygroundLink } from "@/constants";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import useStoreUserEffect from "@/hooks/use-store-user";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import MobileNav from "@/components/MobileNav";

const Navbar = () => {
  const scrolled = useScrollTop();
  const userId = useStoreUserEffect();

  return (
    <>
      <nav
        className={cn(
          "z-50 fixed bg-black top-0 flex flex-row justify-between items-center w-full p-8",
          scrolled && "border-b shadow-sm",
        )}
      >
        <p className="text-3xl font-bold text-white">
          <Link href="/home" className="flex flex-row">
            <Image
              src="/logo.png"
              alt="Logo"
              height={70}
              width={70}
              className="text-white"
            />
          </Link>
        </p>
        <div className="hidden md:flex md:flex-row md:items-center md:justify-between md:gap-10">
          <Authenticated>
            <NavigationMenu>
              <NavigationMenuList>
                {NavLinks.map((link) => {
                  if (link.title === "Profile")
                    link.path = `/profile/${userId}`;
                  if (link.title !== "Playground") {
                    return (
                      <NavigationMenuItem key={link.title}>
                        <Link href={link.path} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={`${navigationMenuTriggerStyle()} bg-black text-white`}
                          >
                            {link.title}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    );
                  } else {
                    return (
                      <NavigationMenuItem
                        key={link.title}
                        className="flex flex-col"
                      >
                        <NavigationMenuTrigger className="bg-black text-white">
                          {link.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="mx-4 mt-1 flex flex-col gap-1.5">
                            {PlaygroundLink.map((component) => (
                              <>
                                <Link
                                  className="mt-1"
                                  key={component.title}
                                  href={component.path}
                                >
                                  {component.title}
                                </Link>
                                <hr />
                              </>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }
                })}
              </NavigationMenuList>
            </NavigationMenu>
            <UserButton afterSignOutUrl="/home" />
          </Authenticated>
          <Unauthenticated>
            <NavigationMenu>
              <NavigationMenuList>
                {NavLinks.map((link) => {
                  if (link.title === "Profile") {
                    return (
                      <NavigationMenuItem key={link.title}>
                        <NavigationMenuLink
                          className={`${navigationMenuTriggerStyle()} bg-black text-white`}
                        >
                          <SignInButton mode="modal" />
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                  if (link.title !== "Playground") {
                    return (
                      <NavigationMenuItem key={link.title}>
                        <Link href={link.path} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={`${navigationMenuTriggerStyle()} bg-black text-white`}
                          >
                            {link.title}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    );
                  } else {
                    return (
                      <NavigationMenuItem
                        key={link.title}
                        className="flex flex-col"
                      >
                        <NavigationMenuTrigger className="bg-black text-white">
                          {link.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="mx-4 mt-1 flex flex-col gap-1.5">
                            {PlaygroundLink.map((component) => (
                              <>
                                <Link
                                  className="mt-1"
                                  key={component.title}
                                  href={component.path}
                                >
                                  {component.title}
                                </Link>
                                <hr />
                              </>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </Unauthenticated>
        </div>
        <MobileNav userId={userId} />
      </nav>
    </>
  );
};

export default Navbar;
