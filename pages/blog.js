import { getDatabase, filterByTags } from "../lib/notion";
import Layout from "../components/blog/Layout";
import { Header } from "../components/blog/Header";
import { PostSummary } from "../components/blog/PostSummary";
import Link from "next/link";

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
          Weird
        </div>
        <div className="my-4 text-lg text-gray-500 text-left border-r-8 border-red-200 px-3">
          I'm glad you're here! Here's the front page for everything going on...
          You'll likely find more nooks and crannies on this site. Archive of all
          the letters on substack (and then some). random thoughts can be found
          at{" "}
          <Link href="/scritches">
            <a className="border-b-2 hover:border-b-4 border-red-300 transition duration-500 text-gray-400 text-sm">
              {"scritches"}
            </a>
          </Link>
        </div>
        <Posts posts={posts} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let database = await getDatabase(databaseId);
  database = filterByTags(database, { any: ["topic-main"] });

  return {
    props: {
      posts: database,
    },
  };
};