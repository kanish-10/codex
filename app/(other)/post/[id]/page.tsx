import Playground from "@/components/Playground";

const PostPage = ({ params }: { params: { id: string } }) => {
  return <Playground type="post" id={params.id} />;
};

export default PostPage;
