import Head from "next/head";
import Link from "next/link";
import { Footer } from "./Footer";

function NewPageLink({ url }) {
  return (
    <a
      className="flex items-center justify-center bg-white p-4 rounded-lg"
      href="/"
      rel="noopener noreferrer"
    >
      Back to Home
    </a>
  );
}

export default function Layout({ title, children, footer = false }) {
  return (
    <div className="flex flex-col min-h-full md:gap-8">
      <Head>
        <title>{title || "Home"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      <Footer />
    </div>
  );
}
