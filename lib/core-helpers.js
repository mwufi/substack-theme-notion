import { getWithChildren, getDatabase, filterByTags } from "./notion";
import { readWithMetadata } from "./metadata";

const databaseId = process.env.NOTION_DATABASE_ID;

// getPage gets a Notion page and a database
export const getPageWithPosts = (pageId, dbId = databaseId) => {
  const s = async () => {
    console.log(`Retrieving page ${pageId} and posts ${dbId}`);
    const page = await getWithChildren(pageId);

    let { metadata, blocks } = readWithMetadata(page);
    const include_tags = metadata.include_tags?.split(",") || [];
    console.log("INCLUDE:", metadata.include_tags, include_tags);

    let posts = await getDatabase(dbId);
    posts = filterByTags(posts, { any: include_tags });

    return {
      props: {
        metadata,
        blocks,
        posts,
      },
    };
  };

  return s;
};
