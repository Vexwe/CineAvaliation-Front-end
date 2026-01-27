"use client";

export default function DeleteButton({ movieId }: { movieId: string }) {

  async function handleDelete() {
    const confirmDelete = confirm("Tem certeza que deseja excluir este filme?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:4242/edit/${movieId}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        alert("Erro ao excluir filme");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      alert("Erro de conexão com o servidor");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-semibold"
    >
      🗑 Excluir
    </button>
  );
}
