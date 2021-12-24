import { getDatabase, filterByTags } from "../lib/notion";
import Layout from "../components/blog/Layout";
import PostList from "../components/blog/PostList";
import { Header } from "../components/blog/Header";
import Link from "next/link";
import Title from "../components/blog/Title";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <Layout title="the notebook">
      <Header />
      <div className="max-w-prose w-full mx-auto p-4">
        <div className="border-red-200 border-4 p-4 mb-4">
          <Title>Archive</Title>

          <div className="my-4 text-lg text-gray-500 text-left border-red-200">
            I'm glad you're here! Here's the front page for everything going
            on... You'll likely find more nooks and crannies on this site.
            Archive of all the letters on substack (and then some). random
            thoughts can be found at{" "}
            <Link href="/scritches">
              <a className="border-b-2 hover:border-b-4 border-red-300 transition duration-500 text-gray-400 text-sm">
                {"scritches"}
              </a>
            </Link>
          </div>
        </div>
        <PostList posts={posts} />
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
