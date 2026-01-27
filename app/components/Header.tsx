import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16 flex items-center bg-zinc-900 shadow-md px-6 relative">
      <Link href="/" style={{ fontFamily: "var(--font-gravitas)" }} className=" text-white text-xl font-semibold tracking-wide absolute left-1/2 -translate-x-1/2">
        Cineavaliation
      </Link>
      <Link href="/addmovie"
      className="ml-auto bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
      >Adicione um filme!</Link>
    </header>
  );
}
