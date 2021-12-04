import { Fragment } from "react";
import Head from "next/head";
import { getDatabase, getPage, getBlocks } from "../lib/notion";
import { renderBlock, renderProperty } from "../lib/renderer";
import Link from "next/link";
import { databaseId } from "./index.js";

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />;
  }
  console.log("Url", page.url);
  console.log("Page object", page);
  console.log("Cover", page.cover);
  console.log("Properties", page.properties);

  const fullTitle = page.properties.Name.title
    .map((x) => x.plain_text)
    .join("");

  return (
    <div>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-prose mx-auto font-serif px-4">
        <div className="text-4xl my-4 font-bold">
          {renderProperty(page.properties.Name)}
        </div>

        {renderProperty(page.properties["Created at"])}
        {renderProperty(page.properties.Author)}
        {renderProperty(page.properties.Length)}

        <div className="my-8 border-t"></div>

        <div className="flex flex-col gap-2">
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </div>
      </main>
    </div>
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
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
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
