import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
      <div className="w-[90%] rounded-md shadow-md p-4">
        Explorar vista de huesped/interesado
        <br />
        <Link href={"/guest"}>clic aquí</Link>
      </div>
      <div className="w-[90%] rounded-md shadow-md p-4">
        Explorar vista del administrador/stakeholder
        <br />
        <Link href={"/admin"}>clic aquí</Link>
      </div>
    </div>
  );
}
