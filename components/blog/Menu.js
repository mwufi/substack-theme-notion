import Link from "next/link";
import cx from "classnames";

export default function Menu() {
  const links = [
    { href: "/", text: "What is The Other Adventure?" },
    { href: "/blog", text: "Archive" },
    { href: "/authors", text: "Authors" },
    { href: "/scritches", text: "Daily shouts!" },
    { href: "/the-bones", text: "The Bones" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 p-4 border-t max-w-prose mx-auto">
        {links.map(({ href, text }) => (
          <Link href={href}>
            <a class="text-gray-500 hover:text-red-400">{text}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}
