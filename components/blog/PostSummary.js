import Link from "next/link";
import { Fragment } from "react";
import { renderProperty } from "../../lib/renderer";
import { MyImage } from "../Image";

export function PostHeader({ post }) {
  return (
    <Fragment>
      <div className="text-4xl my-4 font-bold">
        {renderProperty(post.properties.Name)}
      </div>

      {renderProperty(post.properties["Created at"])}

      <div className="my-8 border-t rounded overflow-hidden">
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
          width: "230px",
          height: "130px",
          backgroundImage: `url(${
            post.cover?.external?.url ||
            "https://source.unsplash.com/random/230x130"
          })`,
        }}
        className="overflow-hidden bg-cover rounded-2xl"
      ></div>
      <Link href={`/posts/${post.id}`}>
        <a className="flex flex-col gap-2">
          <h3 className="text-xl font-medium">
            {renderProperty(post.properties.Name)}
          </h3>
          <p className="text-gray-500 font-light">
            A new weekly missive featuring the best articles and essays on
            wildland fire and ecology
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
