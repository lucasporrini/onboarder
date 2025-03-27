import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { FaNpm } from "react-icons/fa";

export const Socials = () => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="https://github.com/lucasporrini/onboarder"
        target="_blank"
        className="bg-neutral-800 p-2 rounded-full text-white hover:bg-neutral-900 transition-colors duration-200"
      >
        <GithubIcon className="size-6" />
      </Link>
      <Link
        href="https://www.npmjs.com/package/onboarder"
        target="_blank"
        className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition-colors duration-200"
      >
        <FaNpm className="size-6" />
      </Link>
    </div>
  );
};
