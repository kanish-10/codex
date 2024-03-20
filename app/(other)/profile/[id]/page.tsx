"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import CodeGrid from "@/components/CodeGrid";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const userInfo = useQuery(api.users.find, { id: params.id as Id<"users"> });

  return (
    <>
      <div className="flex flex-col items-start justify-between">
        <div className="flex flex-row items-start gap-4">
          {userInfo?.picture && (
            <Image
              src={userInfo?.picture}
              alt="profile picture"
              width={120}
              height={130}
              className="rounded-md object-cover"
            />
          )}
          <div className="mt-3">
            <h2 className="md:text-3xl">{userInfo?.name}</h2>
            <p className="font-semibold text-muted-foreground md:text-xl">
              @{userInfo?.username}
            </p>
            <p className="md:text-lg">
              Created{" "}
              {userInfo?._creationTime
                ? getTimestamp(userInfo?._creationTime)
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-xl">Code Snippets</h2>
      </div>
      <CodeGrid type="profile" id={params.id} />
    </>
  );
};

export default ProfilePage;
