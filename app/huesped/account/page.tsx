export default function AccountPage() {
  return (
    <div className="min-h-screen">
      <div className="p-4 pt-8">
        <h1 className="text-2xl font-semibold">Cuenta</h1>
      </div>
      <div className="px-4 space-y-4">
        <div className="rounded-lg p-4">
          <h3 className="font-semibold mb-2">Información de perfil</h3>
          <p className="text-gray-300 text-sm">Administra los detalles de tu perfil</p>
        </div>
        <div className="rounded-lg p-4">
          <h3 className="font-semibold mb-2">Estatus de la reservación</h3>
          <p className="text-gray-300 text-sm">Ver los detalles</p>
        </div>
        <div className="rounded-lg p-4">
          <h3 className="font-semibold mb-2">Configuración</h3>
          <p className="text-gray-300 text-sm">Configura tu cuenta, medios de pagos, etc.</p>
        </div>
      </div>
    </div>
  );
}
