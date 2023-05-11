import Post from "@/models/Post";
import connect from "@/utils/mongodb";

export default function Home(post: PostType) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div className="prose md:prose-lg lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
    </
    div>
  )
}

export async function getServerSideProps() {
  await connect();

  const postObj = await Post.findOne({ slug: 'slug-aaa'});
  const post = postObj.toJSON();

  return {
    props: post,
  };
}