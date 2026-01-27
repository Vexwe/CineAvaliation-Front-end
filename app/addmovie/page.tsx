"use client";

import { useState } from "react";
import Header from "../components/Header";



export default function AddMovie() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imageFile) {
      alert("Selecione uma imagem");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("image", imageFile); // nome do campo do backend

    const res = await fetch(`${API_URL}/addmovie`, {
      method: "POST",
      body: data, // NÃO definir Content-Type manualmente
    });

    if (!res.ok) {
      alert("Erro ao cadastrar filme");
      return;
    }

    alert("Filme cadastrado com sucesso!");
    setForm({ name: "", description: "" });
    setImageFile(null);
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-6 rounded-lg w-full max-w-md flex flex-col gap-4"
        >
          <h1 className="text-white text-xl font-semibold">Adicionar Filme</h1>

          <input
            name="name"
            placeholder="Nome do filme"
            value={form.name}
            onChange={handleChange}
            className="p-2 rounded bg-zinc-800 text-white"
            required
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            className="p-2 rounded bg-zinc-800 text-white"
            required
          />

          {/* Upload de imagem */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 rounded bg-zinc-800 text-white"
            required
          />
          
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Salvar
          </button>
        </form>
      </div>
    </>
  );
}
