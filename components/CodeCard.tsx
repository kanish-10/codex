"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getTimestamp, truncateString } from "@/lib/utils";
import Link from "next/link";
import CodeMirror from "@uiw/react-codemirror";

interface CodeCardProps {
  title: string;
  language: string;
  time: any;
  userId: string;
  code: string | undefined;
  postId: string;
  className?: string;
}

const CodeCard = ({
  title,
  language,
  time,
  userId,
  code,
  postId,
  className,
}: CodeCardProps) => {
  const user = useQuery(api.users.find, { id: userId as Id<"users"> });

  return (
    <Card className={`${className} border-0 bg-[#282C34] text-white`}>
      <div className="flex h-full flex-col justify-between">
        <CardHeader>
          <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle>
              <Link href={`/post/${postId}`}>{title}</Link>
            </CardTitle>
            <CardDescription>
              <Badge>{language}</Badge>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grow">
          <Link href={`/post/${postId}`}>
            <CodeMirror
              value={truncateString(code) + "..."}
              defaultValue={truncateString(code) + "..."}
              theme="dark"
              editable={false}
              basicSetup={{
                lineNumbers: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
              }}
            />
          </Link>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Link href={`/profile/${userId}`}>
            <p className="text-sm">@{user?.username}</p>
          </Link>
          <p className="text-sm">{getTimestamp(time)}</p>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CodeCard;
