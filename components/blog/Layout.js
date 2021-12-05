import Head from "next/head";
import Link from "next/link";

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

export default function Layout({ title, children, footer = null }) {
  return (
    <div className="flex flex-col min-h-full">
      <Head>
        <title>{title || "Home"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}

      {!footer && (
        <footer className="flex items-center justify-center w-full h-24 mt-12">
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </footer>
      )}
    </div>
  );
}
