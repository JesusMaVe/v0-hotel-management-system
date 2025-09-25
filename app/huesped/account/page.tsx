export default function AccountPage() {
  return (
    <div className="min-h-screen">
      <div className="p-4 pt-8">
        <h1 className="text-2xl font-semibold">Account</h1>
      </div>
      <div className="px-4 space-y-4">
        <div className="rounded-lg p-4">
          <h3 className="font-semibold mb-2">Profile Information</h3>
          <p className="text-gray-300 text-sm">Manage your account details</p>
        </div>
        <div className="rounded-lg p-4">
          <h3 className="font-semibold mb-2">Membership Status</h3>
          <p className="text-gray-300 text-sm">View your membership benefits</p>
        </div>
        <div className="rounded-lg p-4">
          <h3 className="font-semibold mb-2">Settings</h3>
          <p className="text-gray-300 text-sm">App preferences and privacy</p>
        </div>
      </div>
    </div>
  );
}
