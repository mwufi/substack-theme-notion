import { getDatabase } from "../lib/notion";
import Layout from "../components/blog/Layout";
import { Header } from "../components/blog/Header";
import { PostSummary } from "../components/blog/PostSummary";

export const databaseId = process.env.NOTION_DATABASE_ID;

function Posts({ posts }) {
  return (
    <ol className="flex flex-col gap-8 py-8">
      {posts.map((post) => {
        return <PostSummary post={post} />;
      })}
    </ol>
  );
}

export default function Home({ posts }) {
  return (
    <Layout title="the notebook">
      <Header />
      <div className="max-w-prose w-full mx-auto border p-4">
        <div className="my-4 text-6xl text-left border-r-8 border-red-200 px-3">
          Blog
        </div>
        <Posts posts={posts} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
  };
};
