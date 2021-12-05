import Head from "next/head";
import Link from "next/link";

import { getDatabase } from "../lib/notion";
import { renderProperty } from "../lib/renderer";
import { MyImage } from "../components/Image";
import Layout from "../components/blog/Layout";

export const databaseId = process.env.NOTION_DATABASE_ID;

function Posts({ posts }) {
  return (
    <ol className="flex flex-col gap-4">
      {posts.map((post) => {
        console.log("post", post);

        return (
          <li key={post.id} className="p-4">
            {/* <MyImage image={post.cover} /> */}
            <h3 className="text-xl">
              <Link href={`/posts/${post.id}`}>
                <a className="hover:text-red-400 text-red-200">
                  {renderProperty(post.properties.Name)}
                </a>
              </Link>
            </h3>
            <div className="text-gray-400 text-sm font-light font-serif">
              {renderProperty(post.properties["Created at"])}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Home({ posts }) {
  return (
    <Layout title="Create Next App">
      <main
        className="w-4/5 mx-auto flex-grow grid gap-1"
        style={{
          gridTemplateColumns: "1fr 300px",
          gridTemplateRows: "50px 1fr",
        }}
      >
        <header className="col-span-2">i live here</header>
        <div className=" p-2 rounded-lg">
          <Posts posts={posts} />
        </div>
        <div className=" p-2 rounded-lg">
          Hi, I'm zen. i write on this blog someetimes. email: ztang230
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
