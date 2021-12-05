import Link from "next/link";
import cx from "classnames";

export const Footer = () => {
  let twitterUrl = "#bottom";

  return (
    <footer className="w-full bg-gray-50 p-8 lg:p-20">
      <div className="flex flex-col gap-1 items-center justify-center text-gray-500 text-sm">
        <div className="text-center">© 2021 Zen</div>
        <div className="mt-4 text-center">
          <span>That was long, wasn't it? Leave me your</span>
        </div>
        <div className="text-center">
          <span>thoughts on </span>
          <a className="underline" id="bottom" href={twitterUrl}>
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};
