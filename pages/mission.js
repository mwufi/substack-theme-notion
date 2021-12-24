import { getDatabase, getWithChildren } from "../lib/notion";
import { readWithMetadata } from "../lib/metadata";
import Layout from "../components/blog/Layout";
import { Header } from "../components/blog/Header";
import { PostSummary } from "../components/blog/PostSummary";
import { Footer } from "../components/blog/Footer";
import { renderBlock, renderProperty } from "../lib/renderer";
import { Fragment } from "react";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts, page }) {
  console.log(page);
  let { metadata, blocks } = readWithMetadata(page);

  return (
    <Layout title="the notebook">
      <Header />
      <div className="max-w-prose w-full mx-auto p-4 border">
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  const page = await getWithChildren("ef96624b790543aba67b6a8f7d17e683");

  return {
    props: {
      page: page,
      posts: database,
    },
  };
};
