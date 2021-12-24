import { PostSummary } from "./PostSummary";

export default function Posts({ posts }) {
  return (
    <ol className="flex flex-col gap-8 py-8 border-t">
      {posts.map((post) => {
        return <PostSummary post={post} />;
      })}
    </ol>
  );
}
