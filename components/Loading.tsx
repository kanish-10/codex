import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center bg-black">
      <Image
        src="/logo.png"
        alt="Logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default Loading;
