"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { langCode } from "@/constants";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "@/components/ui/use-toast";

interface PlaygroundProps {
  type: "post" | "playground";
  language?: string;
  id?: string;
}

const Playground = ({ type = "playground", id, language }: PlaygroundProps) => {
  let post = null;
  if (type === "post")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    post = useQuery(api.posts.find, { postId: id as Id<"posts"> });

  let extension;
  if (post?.language === "javascript" || language === "javascript") {
    extension = [javascript({ jsx: true })];
  } else if (post?.language === "python" || language === "python") {
    extension = [python()];
  } else if (post?.language === "cpp" || language === "cpp") {
    extension = [cpp()];
  } else if (post?.language === "java" || language === "java") {
    extension = [java()];
  }

  const [code, setCode] = useState<string | undefined>(post?.code);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState<string | undefined>(post?.input);
  const [submitting, setSubmitting] = useState(false);
  const { mutate, pending } = useApiMutation(api.posts.save);

  useEffect(() => {
    if (post !== null) {
      setCode(post?.code);
      setInput(post?.input);
    }
  }, [post]);

  const handleButtonClick = async () => {
    setSubmitting(true);
    try {
      // @ts-ignore
      const snippet = { code, input, langCode: langCode[post?.language] };
      const response = await axios.post("/api/judge0", snippet);
      console.log(response);
      setOutput(response.data.result.stdout);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  const saveCode = async () => {
    try {
      await mutate({
        postId: id as Id<"posts">,
        code,
        input,
      });
      toast({ title: "Saved successfully" });
    } catch (e) {
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black p-10">
      <div className=" flex flex-col-reverse items-start justify-between md:flex-row md:justify-between">
        <p className="m-2 text-3xl font-bold text-white">
          {post?.title || "Playground"}
        </p>
        <Badge className="text-lg">{post?.language || language}</Badge>
      </div>
      <div className="mt-5 flex flex-col md:flex-row">
        <div className="flex w-full flex-col md:mx-5 md:w-1/2">
          <div className="mb-5 flex flex-row items-center justify-between">
            <p className="text-sm text-white">Code Below</p>
            <div className="">
              {type === "post" && (
                <Button
                  className="mx-2 bg-green-600 text-white"
                  size="sm"
                  onClick={saveCode}
                  disabled={pending}
                >
                  {pending ? "Saving" : "Save"}
                </Button>
              )}
              <Button
                size="sm"
                className=""
                disabled={submitting}
                onClick={handleButtonClick}
              >
                {submitting ? "Running" : "Run"}
              </Button>
            </div>
          </div>
          <CodeMirror
            height="500px"
            theme="dark"
            value={code}
            defaultValue={code}
            onChange={(value, viewUpdate) => {
              console.log(viewUpdate);
              setCode(value);
            }}
            extensions={extension}
            basicSetup={{
              lineNumbers: true,
              syntaxHighlighting: true,
              closeBrackets: true,
              autocompletion: true,
            }}
          />
        </div>
        <div className="flex w-full flex-col md:w-1/2">
          <div className="h-1/2 p-1 md:my-3">
            <p className="text-sm text-white">Input</p>
            <CodeMirror
              height="100px"
              value={input}
              defaultValue={input}
              onChange={(value) => setInput(value)}
              theme="dark"
              basicSetup={{
                lineNumbers: true,
              }}
              className="my-5 h-full bg-[#282C34] text-white"
            />
          </div>
          <div className="h-1/2 py-5 md:my-5">
            <p className="text-sm text-white">Output</p>
            <Textarea
              disabled
              value={output}
              className="my-5 h-full bg-[#282C34] text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
