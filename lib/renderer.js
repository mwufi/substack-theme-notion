import { Text } from "../components/Text";

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

export function renderBlock(block) {
  const { type } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.text} />
        </p>
      );
    default:
      return <Default block={block} />;
  }
}
