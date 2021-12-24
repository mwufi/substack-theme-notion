import Head from "next/head";
import { Footer } from "./Footer";
import Menu from "./Menu";

export default function Layout({
  title,
  children,
  footer = true,
  menu = true,
}) {
  return (
    <div className="flex flex-col min-h-full md:gap-8">
      <Head>
        <title>{title || "The Other Adventure"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col md:gap-8">{children}</div>
      {menu && <Menu />}
      {footer && <Footer />}
    </div>
  );
}
