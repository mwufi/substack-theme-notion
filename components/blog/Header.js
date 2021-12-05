import Link from "next/link";
import cx from "classnames";

export const Header = ({ center = true }) => {
  let img =
    "https://cdn.substack.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F69397e9c-4a94-4d28-a0de-54cefcb57957_256x256.png";

  const Logo = ({ size }) => (
    <div className="rounded overflow-hidden">
      <img src={img} alt="logo" width={size} height={size} />
    </div>
  );

  let regular = {
    header: "border-b",
    buttons: "text-white font-light bg-red-400 text-sm",
  };
  let hotPink = {
    header: "bg-gradient-to-r from-red-400 to-red-400 via-yellow-400",
    text: "text-white",
    buttons: "border",
  };

  let bg = regular;

  return (
    <nav
      className={cx(
        "flex items-center justify-center flex-wrap p-4",
        bg.header
      )}
    >
      <div className="flex items-center gap-3 max-w-prose w-full">
        <Logo size={"50px"} />
        <Link href="/">
          <a className={cx("font-light tracking-wide", bg.text)}>
            the notebook
          </a>
        </Link>
        <div className="mr-auto"></div>
        <button
          className={cx("rounded hover:underline p-2", bg.text, bg.buttons)}
        >
          Subscribe
        </button>
      </div>
    </nav>
  );
};
