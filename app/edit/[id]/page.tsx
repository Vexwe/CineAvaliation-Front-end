import EditForm from "./EditForm";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);   // unwrap correto
  return <EditForm id={id} />;
}
