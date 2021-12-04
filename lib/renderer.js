import { Text, SpacerParagraph } from "../components/Text";
import { MyImage } from "../components/Image";
import { Fragment } from "react";
import cx from "classnames";

function Default({ block }) {
  const { type } = block;
  const value = block[type];

  console.log(`${type} not implemented yet!...`, value);

  return (
    <div className="text-sm text-gray-500 border p-3 rounded">
      ${type} is not implemented yet!
    </div>
  );
}

/*
Pages have properties like the following

{
    "Author": {
        "id": "MvG%7B",
        "type": "rich_text",
        "rich_text": [
            {
                "type": "text",
                "text": {
                    "content": "Zen",
                    "link": null
                },
                "annotations": {
                    "bold": false,
                    "italic": false,
                    "strikethrough": false,
                    "underline": false,
                    "code": false,
                    "color": "default"
                },
                "plain_text": "Zen",
                "href": null
            }
        ]
    },
    "Tags": {
        "id": "xI%3Fh",
        "type": "multi_select",
        "multi_select": []
    },
    "Created at": {
        "id": "yi%5DU",
        "type": "created_time",
        "created_time": "2021-10-18T01:18:00.000Z"
    },
    "Name": {
        "id": "title",
        "type": "title",
        "title": [
            {
                "type": "text",
                "text": {
                    "content": "Dusting off the shelf",
                    "link": null
                },
                "annotations": {
                    "bold": false,
                    "italic": false,
                    "strikethrough": false,
                    "underline": false,
                    "code": false,
                    "color": "default"
                },
                "plain_text": "Dusting off the shelf",
                "href": null
            }
        ]
    }
}
*/
export function renderProperty(block) {
  const { type } = block;
  const value = block[type];

  switch (type) {
    case "title":
      return <Text text={value} />;
    case "created_time":
      const date = new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      return date;
    case "number":
      return value;
    case "tags":
      return <div>tags</div>;
    case "rich_text":
      return <Text text={value} />;
    default:
      return <Default block={block} />;
  }
}

export function renderBlock(block, withPadding = true) {
  const { type } = block;
  const value = block[type];

  // console.log(type, value);

  switch (type) {
    case "image":
      return <MyImage image={value} />;
    case "paragraph":
      // spacer paragraphs
      if (!value.text || value.text.length === 0) {
        return <SpacerParagraph />;
      }
      return (
        <p>
          <Text text={value.text} />
        </p>
      );
    case "heading_1":
      return (
        <h1
          className={cx(
            "text-3xl font-semibold text-gray-700",
            withPadding && "mt-8"
          )}
        >
          <Text text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2
          className={cx(
            "text-2xl font-semibold text-gray-700",
            withPadding && "mt-6"
          )}
        >
          <Text text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3
          className={cx(
            "text-2xl font-semibold text-gray-700",
            withPadding && "mt-4"
          )}
        >
          <Text text={value.text} />
        </h3>
      );
    case "divider":
      return <div className="border-t"></div>;
    case "callout":
      return (
        <div className="border rounded p-3 flex gap-2 text-blue-500">
          {value.icon?.emoji}
          <Text text={value.text} />
        </div>
      );

    case "toggle":
      return (
        <details>
          <summary className="hover:bg-gray-100 p-2 rounded">
            <Text text={value.text} />
          </summary>

          <div className="flex flex-col gap-2 mt-2 pl-6">
            {value.children?.map((block) => (
              <Fragment key={block.id}>
                {renderBlock(block, (withPadding = false))}
              </Fragment>
            ))}
          </div>
        </details>
      );
    case "bulleted_list_item":
      // got the bullet from here: https://www.compart.com/en/unicode/U+2022
      // Bullets also have children!
      return (
        <div className="flex gap-2 pl-2 items-baseline">
          <span className="bullet select-none text-lg">{"•"}</span>
          <div className="flex flex-col gap-2">
            <p>
              <Text text={value.text} />
            </p>
            {value.children?.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </div>
        </div>
      );
    default:
      return <Default block={block} />;
  }
}
