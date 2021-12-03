import { Text } from "./components/Text";

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
