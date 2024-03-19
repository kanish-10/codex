import { UserButton } from "@clerk/nextjs";
import CreateCodeButton from "@/components/CreateCodeButton";

const HomePage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <CreateCodeButton />
    </div>
  );
};

export default HomePage;
