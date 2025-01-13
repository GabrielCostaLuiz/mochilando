"use client"

import HandleComment from "@/actions/handleComment"
import { useState } from "react"

export default function InputComment({ idRoute }: { idRoute: string }) {
  const [comment, setComment] = useState("")

  async function handleComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

     await HandleComment(comment, idRoute)


    setComment("")
  }

  return (
    <div className="mt-6 pt-6 border-t">
      <h3 className="font-medium mb-4">Deixe seu comentário</h3>
      <form onSubmit={handleComment}>
        <div className="flex gap-4">
          <textarea
            className="flex-grow p-3 border rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Compartilhe sua experiência..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Comentar
          </button>
        </div>
      </form>
    </div>
  )
}
