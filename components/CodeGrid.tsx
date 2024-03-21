"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CodeCard from "@/components/CodeCard";
import CreateCodeButton from "@/components/CreateCodeButton";
import { Id } from "@/convex/_generated/dataModel";

interface CodeGridProps {
  type: "home" | "profile";
  id?: string;
}

const CodeGrid = ({ type, id }: CodeGridProps) => {
  let posts:
    | {
        _id: Id<"posts">;
        _creationTime: number;
        code?: string | undefined;
        input?: string | undefined;
        authorId: Id<"users">;
        language: string;
        title: string;
      }[]
    | undefined;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (type === "home") posts = useQuery(api.posts.findAll);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  else if (type === "profile") {
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    posts = useQuery(api.posts.findByAuthor, { authorId: id });
  } else posts = undefined;

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts?.length > 0 &&
          posts?.map((post) => (
            <CodeCard
              key={post?._id}
              title={post?.title}
              language={post?.language}
              time={post?._creationTime}
              userId={post?.authorId}
              code={post?.code}
              postId={post?._id as string}
            />
          ))}
      </div>
      {posts?.length === 0 && type === "profile" ? (
        <div className="flex h-[500px] flex-col items-center justify-center">
          <>
            <p>No Post made yet.</p>
            <CreateCodeButton />
          </>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CodeGrid;
