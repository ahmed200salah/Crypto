import Link from "next/link";

export default function CustomLink({children}) {
  return (
    <Link href={"/"} className=" font-bold tracking-tight hover:translate-x-1 transition-all hover:text-[#A28B55]">
      {children}
    </Link>
  );
}
