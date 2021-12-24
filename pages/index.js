import { getDatabase, getWithChildren } from "../lib/notion";
import { readWithMetadata } from "../lib/metadata";
import Layout from "../components/blog/Layout";
import { Header } from "../components/blog/Header";
import { renderBlock } from "../lib/renderer";
import { Fragment } from "react";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts, page }) {
  console.log(page);
  let { metadata, blocks } = readWithMetadata(page);

  return (
    <Layout>
      <Header />
      <div className="max-w-prose w-full mx-auto p-4 md:border">
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  const page = await getWithChildren("49207519260f498e8d53c9758810936c");

  return {
    props: {
      page: page,
      posts: database,
    },
  };
};
