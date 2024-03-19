import Playground from "@/components/Playground";

const PlaygroundPage = ({ params }: { params: { id: string } }) => {
  return <Playground type="playground" language={params.id} />;
};

export default PlaygroundPage;
