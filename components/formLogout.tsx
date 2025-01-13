/* eslint-disable @typescript-eslint/no-explicit-any */
// import { revalidatePath } from "next/cache"

export default function FormLogout({ logout }: any) {
  // async function handleLogoutGoogle(e) {
  //   e.preventDefault()

  //   await fetch("/api/auth/logout")

  // }
  return (
    <form onSubmit={(e) => logout(e)} className="w-full">
      <button
        type="submit"
        className="bg-red-500 text-white w-full p-1 rounded-sm font-bold"
      >
        Sair
      </button>
    </form>
  )
}
