import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLinks, PlaygroundLink } from "@/constants";
import Link from "next/link";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";

const MobileNav = ({ userId }: { userId: Id<"users"> | null }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4 md:hidden">
      <Authenticated>
        <UserButton afterSignOutUrl="/home" />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal" />
      </Unauthenticated>
      <Sheet>
        <SheetTrigger asChild>
          <Image src="/hamburger.svg" alt="menu" height={50} width={50} />
        </SheetTrigger>
        <SheetContent className="bg-black">
          <SheetHeader>
            <Image src="/logo.png" alt="logo" height={100} width={100} />
          </SheetHeader>
          <div className="mt-32 flex flex-col items-center justify-center">
            <Authenticated>
              <NavigationMenu className="flex flex-col items-center justify-center">
                <NavigationMenuList className="flex flex-col items-center justify-center">
                  {NavLinks.map((link) => {
                    if (link.title === "Profile")
                      link.path = `/profile/${userId}`;
                    if (link.title !== "Playground") {
                      return (
                        <SheetClose key={link.title}>
                          <NavigationMenuItem key={link.title}>
                            <Link href={link.path} legacyBehavior passHref>
                              <NavigationMenuLink
                                className={`${navigationMenuTriggerStyle()} bg-black text-white`}
                              >
                                {link.title}
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                        </SheetClose>
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
                            <ul className="mx-4 my-1 flex h-[130px] flex-col gap-1.5">
                              {PlaygroundLink.map((component) => (
                                <SheetClose key={component.title}>
                                  <Link className="mt-1" href={component.path}>
                                    {component.title}
                                  </Link>
                                  <hr />
                                </SheetClose>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    }
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </Authenticated>
            <Unauthenticated>
              <NavigationMenu className="flex flex-col items-center justify-center">
                <NavigationMenuList className="flex flex-col items-center justify-center">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
