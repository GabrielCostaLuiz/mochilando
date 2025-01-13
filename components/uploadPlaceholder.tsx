/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import { useState } from "react"

export default function UploadPlaceholder({
  changeUrl,
  urlPlaceholder,
  groupName,
}: {
  changeUrl: any
  urlPlaceholder: any
  groupName: any
}) {
  const [file, setFile] = useState<File>()
  const [uploading, setUploading] = useState(false)

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected")
        return
      }

      setUploading(true)
      const data = new FormData()
      data.append("file", file)

      if (groupName) {
        data.append("groupName", groupName.name)
      }

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      })
      const signedUrl = await uploadRequest.json()
      changeUrl(signedUrl)
      setUploading(false)
    } catch (e) {
      console.log(e)
      setUploading(false)
      alert("Trouble uploading file")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0])
  }

  return (
    <main className="w-full border rounded-lg p-5 m-auto flex flex-col justify-center items-center">
      {urlPlaceholder && (
        <div className="w-full h-96 relative mb-5">
          <Image
            src={urlPlaceholder.url}
            alt="Image from Pinata"
            crossOrigin="anonymous"
            fill
            className="object-fill"
          />
        </div>
      )}

      <input type="file" onChange={handleChange} className="" />
      {!urlPlaceholder.url && (
        <button
          type="button"
          disabled={uploading || !groupName.on}
          onClick={uploadFile}
          className={`bg-green-500 p-2 text-white rounded-lg mt-5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
            uploading && "bg-orange-500"
          }`}
        >
          {uploading
            ? "Uploading..."
            : !groupName?.on
            ? "Preencha a Origem e Destino"
            : "Upload"}
        </button>
      )}
    </main>
  )
}
