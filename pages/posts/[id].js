import { Fragment } from "react";
import { getDatabase, getPage, getBlocks } from "../../lib/notion";
import { renderBlock } from "../../lib/renderer";
import Head from "next/head";
import Layout from "../../components/blog/Layout";
import { Header } from "../../components/blog/Header";
import { PostHeader } from "../../components/blog/PostSummary";

const databaseId = process.env.NOTION_DATABASE_ID;

function BackgroundImage({ url }) {
  return (
    <div
      className="fixed bg-cover bg-fixed h-full w-full"
      style={{
        zIndex: "-1",
        backgroundImage: `url(${url})`,
      }}
    ></div>
  );
}

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />;
  }
  console.log("Url", page.url);
  console.log("Page object", page);
  console.log("Cover", page.cover);
  console.log("Properties", page.properties);

  const coverUrl = page.cover?.external?.url;

  const fullTitle = page.properties.Name.title
    .map((x) => x.plain_text)
    .join("");

  const description = page.properties.Description.rich_text
    .map((x) => x.plain_text)
    .join("");

  return (
    <Layout title={fullTitle}>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@flickr" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={coverUrl} />
      </Head>
      <Header />
      <main className="h-full w-full max-w-prose p-4 md:mx-auto bg-white md:mt-8">
        <PostHeader post={page} />

        <div className="flex flex-col mt-8 font-serif">
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks

  const getChildBlocks = async (block) => {
    return {
      id: block.id,
      children: await getBlocks(block.id),
    };
  };

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children && !block[block.type].children)
      .map(getChildBlocks)
  );

  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
