// The role of this library is to allow you to put things like
// buttons and configuration in Notion

// readMetadata allows you to put metadata in your notion pages
// so you can just write text, and it'll understand what you mean
// metadata ends when you hit a divider
export function readWithMetadata({ blocks }) {
  console.log("=== BEGIN META ==");
  let metas = [];

  let i = 0;
  let dividerFound = false;
  for (const block of blocks) {
    i += 1;
    if (block.type !== "divider") {
      metas.push(parseMeta(block));
    } else {
      dividerFound = true;
      break;
    }
  }

  if (!dividerFound || metas.length === 0) {
    return { blocks };
  }

  // combine all the metas into one dictionary
  let c = metas.reduce((a, obj) => Object.assign(obj, a));
  console.log("final meta:", c);

  console.log("=== END META ===");
  return { metadata: c, blocks: blocks.slice(i) };
}

// parseMeta parses 1 line of metadata
// Metadata is separated by a colon:
// Header: blue -> { "header": "blue" }
function parseMeta(block) {
  let text = extractSimple(block);
  text = text.split(":");

  let meta = {};
  if (text.length >= 2 && text[0].length < 30) {
    let key = prettifyKey(text[0]);
    let value = text.slice(1).join(":").trim();
    meta[key] = value;
  }

  console.log(meta);
  return meta;
}

// prettifyKey transforms things into underscored keys
// "Main Color" -> "main_color"
function prettifyKey(s) {
  try {
    return s.replace(/\ /g, "_").toLowerCase();
  } catch {
    console.log("Replace is not implemented in Node");
    return s;
  }
}

// extractSimple converts paragraphs to strings
// inside each paragraph is an array of Texts
// inside each Text is either a link or not - we just use the text
function extractSimple(block) {
  if (!block) return null;
  const { type } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return value.text.map((value) => extractSimple(value)).join(" ");
    case "text":
      return value.content.trim();
    default:
      console.log("unsupported", value);
      return "unsupported";
  }
}
