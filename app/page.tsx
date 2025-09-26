import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 pt-12 px-6">
      <div className="w-[90%] rounded-md shadow-md p-4">
        Explorar vista de huesped/interesado
        <br />
        <br />
        <Link href={"/huesped"} className="underline text-blue-500">clic aquí</Link>
      </div>
      <div className="w-[90%] rounded-md shadow-md p-4">
        Explorar vista del administrador/stakeholder
        <br />
        <br />
        <Link href={"/admin/dashboard"} className="underline text-blue-500">clic aquí</Link>
      </div>
    </div>
  );
}
