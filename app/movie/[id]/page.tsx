import Header from "@/app/components/Header";
import CommentsSection from "./CommentsSection";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const { id } = await params;

  const res = await fetch(`${API_URL}/movie/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    return (
      <>
        <Header />
        <div className="p-6 text-red-500 text-center">
          Filme não encontrado.
        </div>
      </>
    );
  }

  const movie = await res.json();

  return (
    <>
      <Header />

      <div className="p-6 max-w-6xl mx-auto">

        {/* TÍTULO + AÇÕES */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{movie.name}</h1>

          <div className="flex gap-3">
            <Link
              href={`/edit/${movie._id}`}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition font-semibold"
            >
              Editar
            </Link>

            <DeleteButton movieId={movie._id} />
          </div>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-8 items-start">

          {/* IMAGEM */}
          {movie.image && (
            <div className="w-full aspect-[2.8/3] bg-zinc-900 flex items-center justify-center rounded-lg">
              <img
                src={`${API_URL}${movie.image}`}
                alt={movie.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}

          {/* INFO */}
          <div className="space-y-4">

            {/* DESCRIÇÃO */}
            <p className="text-zinc-300 leading-relaxed">
              {movie.description}
            </p>

            {/* MÉDIA */}
            <div className="text-yellow-400 font-semibold text-lg">
              ⭐ Média: {movie.averageratings?.toFixed(1) || 0}/5
            </div>

          </div>

        </div>

        {/* COMENTÁRIOS */}
        <div className="mt-8">
          <CommentsSection 
            movieId={id} 
            comments={Array.isArray(movie.comments) ? movie.comments : []} 
          />
        </div>

      </div>
    </>
  );
}
