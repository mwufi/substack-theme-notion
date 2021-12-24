import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

// If a post has any of the tags in `includes`, we include it
export function filterByTags(database, tags) {
  return database.filter((post) => {
    let c = cast(post.properties?.Tags, "multi_select");
    for (let tag of tags.any) {
      if (arrayIncludes(c, tag)) return true;
    }
    return false;
  });
}

// filterByStatus can filter by a "select" field
export function filterByStatus(database, status) {
  return database.filter((post) => {
    let c = cast(post.properties?.Status, "select");
    return arrayIncludes([c], status);
  });
}

function cast(element, type) {
  return element[type];
}

function arrayIncludes(a, b) {
  return a.map((e) => e.name.toLowerCase()).includes(b.toLowerCase());
}

// Retrieve block children for nested blocks (one level deep), for example toggle blocks
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
export const getWithChildren = async (id) => {
  const page = await getPage(id);
  const blocks = await getBlocks(id);

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
    page,
    blocks: blocksWithChildren,
  };
};
