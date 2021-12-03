/*
This component renders an array of "text"

{
    "text": [
        {
            "type": "text",
            "text": {
                "content": "Compare this page to the ",
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
            "plain_text": "Compare this page to the ",
            "href": null
        },
        {
            "type": "text",
            "text": {
                "content": "original Notion page",
                "link": {
                    "url": "https://www.notion.so/react-notion-example-2e22de6b770e4166be301490f6ffd420"
                }
            },
            "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
            },
            "plain_text": "original Notion page",
            "href": "https://www.notion.so/react-notion-example-2e22de6b770e4166be301490f6ffd420"
        }
    ]
}
*/

import cx from "classnames";

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={cx(
          bold ? "font-bold" : "",
          code ? "font-mono" : "",
          italic ? "italic" : "",
          strikethrough ? "strikethrough" : "",
          underline ? "underline" : "",
          color != "default" && color
        )}
      >
        {text.link ? (
          <a
            className="border-b-2 hover:border-b-4 border-red-300 transition duration-500"
            href={text.link.url}
          >
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};
