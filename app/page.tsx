import Header from "./components/Header";
import Link from "next/link";

export default async function Home() {
  const res = await fetch("http://localhost:4242/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar filmes");
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("Resposta inválida da API:", data);
    throw new Error("Resposta inválida da API");
  }

  return (
    <>
      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data.map((movie: any) => (
          <Link
            key={movie._id}
            href={`/movie/${movie._id}`}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200"
          >
            {/* IMAGEM */}
            {movie.image && (
              <img
                src={`http://localhost:4242${movie.image}`}
                alt={movie.name}
                className="w-full h-[360px] object-contain bg-zinc-900"
              />
            )}


            {/* CONTEÚDO */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">{movie.name}</h2>

              <p className="text-sm text-zinc-400 line-clamp-3">
                {movie.description}
              </p>

              {/* MÉDIA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-yellow-400 font-semibold">
                  ⭐ {movie.averageratings?.toFixed(1) || "0.0"} / 5
                </span>

                <span className="text-xs text-zinc-500">
                  {movie.comments?.length || 0} comentários
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
