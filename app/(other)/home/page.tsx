"use client";

import CreateCodeButton from "@/components/CreateCodeButton";
import CodeGrid from "@/components/CodeGrid";

const HomePage = () => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl md:text-3xl">All Posts</p>
        <CreateCodeButton />
      </div>
      <CodeGrid type="home" />
    </div>
  );
};

export default HomePage;
