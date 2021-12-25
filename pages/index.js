import Layout from "../components/blog/Layout";
import { Header } from "../components/blog/Header";
import { Render } from "../lib/renderer";
import { getPageWithPosts } from "../lib/core-helpers";
import PostList from "../components/blog/PostList";
import Link from "next/link";

const blogPage = "49207519260f498e8d53c9758810936c";

export default function Home({ posts, blocks }) {
  return (
    <Layout>
      <Header />
      <div className="max-w-prose w-full mx-auto p-4 md:border bg-white z-0 sticky top-0">
        <div className="mb-4">
          <Render blocks={blocks} />
        </div>
        <PostList posts={posts} />
        <p className="hover:bg-red-400 hover:text-white p-2">
          See more in the{" "}
          <Link href="/blog">
            <a className="underline">Archive</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export const getStaticProps = getPageWithPosts(blogPage);
