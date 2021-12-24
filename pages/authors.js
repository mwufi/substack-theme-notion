import { getDatabase, filterByTags } from "../lib/notion";
import Layout from "../components/blog/Layout";
import PostList from "../components/blog/PostList";
import { Header } from "../components/blog/Header";
import Title from "../components/blog/Title";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <Layout>
      <Header />
      <div className="max-w-prose w-full mx-auto p-4">
        <Title>Authors</Title>
        <div className="my-4 text-lg text-gray-500 text-left border-red-200">
          n. A place for introductions. Potentially open to contributions
        </div>
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let database = await getDatabase(databaseId);
  database = filterByTags(database, { any: ["authors"] });

  return {
    props: {
      posts: database,
    },
  };
};
