function Default({ block }) {
  const { type } = block;
  const value = block[type];

  console.log(`Image ${type} not implemented yet!...`, value);

  return (
    <div className="text-sm text-gray-500 border p-3 rounded">
      Image - ${type} is not implemented yet!
    </div>
  );
}

export const MyImage = ({ image }) => {
  if (!image) return null;

  const { type } = image;
  const value = image[type];

  switch (type) {
    case "file":
      return (
        <div>
          <img src={value.url} alt="" width="100%" />
        </div>
      );

    case "external":
      return (
        <div>
          <img src={value.url} alt="" width="100%" />
        </div>
      );

    default:
      return <Default block={image} />;
  }

  return <div></div>;
};
