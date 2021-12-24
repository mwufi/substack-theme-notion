import { getDatabase, filterByTags } from "../lib/notion";
import Layout from "../components/blog/Layout";
import PostList from "../components/blog/PostList";
import Title from "../components/blog/Title";
import { Header } from "../components/blog/Header";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <Layout>
      <Header />
      <div className="max-w-prose w-full mx-auto p-4">
        <Title>daily shouts</Title>

        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let database = await getDatabase(databaseId);
  database = filterByTags(database, { any: ["Dailies"] });

  return {
    props: {
      posts: database,
    },
  };
};
