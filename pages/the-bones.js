import { getDatabase, filterByTags } from "../lib/notion";
import Layout from "../components/blog/Layout";
import PostList from "../components/blog/PostList";
import { Header } from "../components/blog/Header";
import Title from "../components/blog/Title";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <Layout title="the notebook">
      <Header />
      <div className="max-w-prose w-full mx-auto border p-4">
        <div className="border-red-200 border-4 p-4 mb-4">
          <Title>Bones</Title>
          <div className="my-4 text-lg text-gray-500 text-left border-red-200">
            v. To reach the place where this blog is made! Careful there... are
            you sure you want to know?
          </div>
          <div className="my-4 text-lg text-gray-500 text-left border-red-200">
            If you want to clone this blog (or make your own), this is a good
            place to start!
          </div>
        </div>
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let database = await getDatabase(databaseId);
  database = filterByTags(database, { any: ["topic-meta"] });

  return {
    props: {
      posts: database,
    },
  };
};
