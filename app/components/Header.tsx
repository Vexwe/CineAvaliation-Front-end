import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16 flex items-center bg-zinc-900 shadow-md px-4 sm:px-6 relative">
      
      {/* Logo */}
      <Link
        href="/"
        style={{ fontFamily: "var(--font-gravitas)" }}
        className="text-white text-lg sm:text-xl font-semibold tracking-wide 
                   absolute left-1/2 -translate-x-1/2"
      >
        Cineavaliation
      </Link>

      {/* Botão */}
      <Link
        href="/addmovie"
        className="
          ml-auto
          bg-red-600 hover:bg-red-700 text-white font-medium
          px-3 py-1.5 sm:px-4 sm:py-2
          rounded-md transition-colors duration-200
          text-sm sm:text-base
        "
      >
        <span className="hidden sm:inline">Adicione um filme!</span>
        <span className="sm:hidden">+ Filme</span>
      </Link>
    </header>
  );
}
