"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

export default function EditForm({ id }: { id: string }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      const res = await fetch(`http://localhost:4242/movie/${id}`);
      const data = await res.json();

      setName(data.name || "");
      setDescription(data.description || "");
      if (data.image) {
        setPreview(`http://localhost:4242${data.image}`);
      }
    }

    if (id) loadMovie();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch(`http://localhost:4242/edit/${id}`, {
      method: "PUT",
      body: formData
    });

    if (!res.ok) {
      alert("Erro ao atualizar filme");
      setLoading(false);
      return;
    }

    router.push(`/movie/${id}`);
  }

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Editar Filme</h1>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              className="w-full p-3 rounded bg-zinc-800"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
              className="w-full p-3 rounded bg-zinc-800 h-32"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full p-2 bg-zinc-800 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 px-6 py-3 rounded hover:bg-green-700 transition"
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>

          </form>

          {/* PREVIEW NA LATERAL DIREITA */}
          <div className="flex justify-center">
            {preview && (
              <div className="w-full max-w-sm aspect-[2/3] bg-zinc-900 flex items-center justify-center rounded">
                <img
                  src={preview}
                  alt="Preview do filme"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
