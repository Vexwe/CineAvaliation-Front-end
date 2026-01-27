"use client"
import { useState } from "react";

type Comment = {
  _id: string;
  authorName: string;
  text: string;
  rating: number;
  createdAt: string;
};

export default function CommentsSection({ movieId, comments }: { movieId: string, comments: Comment[] }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const [authorName, setAuthorName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendComment() {
    if (!authorName || !text || rating === null) {
      alert("Preencha nome, comentário e avaliação");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/movie/${movieId}/commentandrate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          authorName,
          text,
          rating
        })
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Erro ao enviar comentário");
        setLoading(false);
        return;
      }

      // reload simples para atualizar lista
      window.location.reload();

    } catch (err) {
      alert("Erro de conexão com o servidor");
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Comentários</h2>

      {/* LISTA DE COMENTÁRIOS */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-zinc-400">Nenhum comentário ainda.</p>
        )}

        {comments.map((c) => (
          <div key={c._id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
            <div className="flex justify-between items-center mb-1">
              <strong className="text-white">{c.authorName}</strong>
              <span className="text-yellow-400 font-semibold">⭐ {c.rating}/5</span>
            </div>

            <p className="text-zinc-300">{c.text}</p>

            <span className="text-xs text-zinc-500 block mt-1">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* FORMULÁRIO */}
      <div className="mt-6 bg-zinc-900 p-4 rounded-lg space-y-3 border border-zinc-800">
        <h3 className="font-semibold text-lg">Adicionar comentário</h3>

        <input
          placeholder="Seu nome"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white outline-none"
        />

        <textarea
          placeholder="Seu comentário"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white outline-none resize-none"
          rows={3}
        />

        <select
          value={rating ?? ""}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 rounded bg-zinc-800 text-white outline-none"
        >
          <option value="">Selecione a avaliação</option>
          <option value="1">⭐ 1</option>
          <option value="2">⭐ 2</option>
          <option value="3">⭐ 3</option>
          <option value="4">⭐ 4</option>
          <option value="5">⭐ 5</option>
        </select>

        <button
          onClick={sendComment}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar comentário"}
        </button>
      </div>
    </div>
  );
}
