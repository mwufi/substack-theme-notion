import Layout from "../components/blog/Layout";
import PostList from "../components/blog/PostList";
import { Header } from "../components/blog/Header";
import { Render } from "../lib/renderer";
import { getPageWithPosts } from "../lib/core-helpers";

let blogPage = "7b45b7d15dc540c1b46974af6780d972";

// Perfect for a box fit
function CoverImage1({ src }) {
  return (
    <div className="-m-4 mb-4">
      <img src={src} className="w-full h-48 object-cover" />
    </div>
  );
}

export default function Home({ posts, blocks }) {
  return (
    <Layout>
      <Header />
      <div className="max-w-prose w-full mx-auto p-4 md:border bg-white z-0 sticky top-0">
        <div className="mb-4">
          <Render blocks={blocks} />
        </div>
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export const getStaticProps = getPageWithPosts(blogPage);
