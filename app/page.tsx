"use client";

import useStoreUserEffect from "@/hooks/use-store-user";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const userId = useStoreUserEffect();
  if (userId === null) {
    return <div>Storing user...</div>;
  }
  return (
    <div>
      Stored user ID: {userId}
      <UserButton afterSignOutUrl="/" />
    </div>
  );

  //   return (
  //   <main>
  //     <div className="flex flex-col">
  //       <div>This page is only for authenticated users only.</div>
  //       <UserButton afterSignOutUrl="/" />
  //     </div>
  //   </main>
  // );
}
