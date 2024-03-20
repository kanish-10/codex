"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CodeCard from "@/components/CodeCard";
import CreateCodeButton from "@/components/CreateCodeButton";

interface CodeGridProps {
  type: "home" | "profile";
  id?: string;
}

const CodeGrid = ({ type, id }: CodeGridProps) => {
  let posts;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (type === "home") posts = useQuery(api.posts.findAll);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (type === "profile") {
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    posts = useQuery(api.posts.findByAuthor, { authorId: id });
  }
  return (
    <>
      {(!posts || posts?.length <= 0) && (
        <div className="flex h-[500px] flex-col items-center justify-center">
          <>
            <p>No Post made yet.</p>
            <CreateCodeButton />
          </>
        </div>
      )}

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
    </>
  );
};

export default CodeGrid;
