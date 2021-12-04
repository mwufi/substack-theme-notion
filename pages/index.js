import Head from "next/head";
import Link from "next/link";

import { getDatabase } from "../lib/notion";
import { renderProperty } from "../lib/renderer";
import { MyImage } from "../components/Image";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <ol>
          {posts.map((post) => {
            console.log("post", post);

            return (
              <li key={post.id} className="p-4">
                <MyImage image={post.cover} />
                <h3 className="text-2xl">
                  <Link href={`/${post.id}`}>
                    <a className="hover:text-red-300 text-red-400">
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
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat!
        </a>
      </footer>
    </div>
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
