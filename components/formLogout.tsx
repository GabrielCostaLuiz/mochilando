export default function FormLogout() {
  async function handleLogoutGoogle() {
    await fetch("/api/auth/logout")
  }
  return (
    <form onSubmit={handleLogoutGoogle} className="w-full">
      <button
        type="submit"
        className="bg-red-500 text-white w-full p-1 rounded-sm font-bold"
      >
        Sair
      </button>
    </form>
  )
}
