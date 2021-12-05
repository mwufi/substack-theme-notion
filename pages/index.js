import { getDatabase } from "../lib/notion";
import Layout from "../components/blog/Layout";
import { Header } from "../components/blog/Header";
import { PostSummary } from "../components/blog/PostSummary";
import { Footer } from "../components/blog/Footer";

export const databaseId = process.env.NOTION_DATABASE_ID;

function Posts({ posts }) {
  return (
    <ol className="flex flex-col gap-2">
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
      <div className="max-w-prose w-full mx-auto">
        <div className="mt-6"></div>
        <div className="px-4">
          <div className="mx-auto text-gray-800 p-12 border rounded-xl flex flex-col items-end gap-2">
            <div className="text-4xl">stuff, by Zen</div>
          </div>
        </div>
        <div className="mt-4"></div>
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
