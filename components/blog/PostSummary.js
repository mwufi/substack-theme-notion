import Link from "next/link";
import { Fragment } from "react";
import { renderProperty } from "../../lib/renderer";
import { MyImage } from "../Image";

export function PostHeader({ post }) {
  return (
    <Fragment>
      <div className="text-4xl my-2 font-bold">
        {renderProperty(post.properties.Name)}
      </div>
      <div className="my-2 font-realsans text-gray-500 font-light">
        {renderProperty(post.properties["Description"])}
      </div>

      {renderProperty(post.properties["Created at"])}

      <div
        className="my-8 border-t rounded overflow-hidden"
        style={{ maxHeight: "300px" }}
      >
        <MyImage image={post.cover} />
      </div>
    </Fragment>
  );
}

export function PostSummary({ post }) {
  return (
    <li
      key={post.id}
      className="flex gap-4 items-start hover:bg-red-50 p-4 rounded-xl"
    >
      <div
        style={{
          width: "4300px",
          maxWidth: "40%",
          height: "130px",
          backgroundImage: `url(${
            post.cover?.external?.url ||
            "https://source.unsplash.com/random/230x130"
          })`,
        }}
        className="overflow-hidden bg-cover rounded-2xl flex-grow"
      ></div>
      <Link href={`/posts/${post.id}`}>
        <a className="flex flex-col gap-2">
          <h3 className="text-xl font-medium">
            {renderProperty(post.properties.Name)}
          </h3>
          <p className="text-gray-500 font-light">
            {renderProperty(post.properties["Description"])}
          </p>
          <p className="text-gray-500 font-light">Zen Tang</p>

          <div className="text-gray-400 text-sm font-light font-serif">
            {renderProperty(post.properties["Created at"])}
          </div>
        </a>
      </Link>
    </li>
  );
}
