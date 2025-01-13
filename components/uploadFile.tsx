/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import { useState } from "react"

export default function UploadFile({
  changeUrl,
  urlPhoto,
  groupId,

}: {
  changeUrl: any
  urlPhoto: any
  groupId: string

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

      if (groupId) {
        data.append("groupId", groupId)
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
      {/* {type === "placeholder" && (
        <div>
          {urlPlaceholder && (
            <div className="w-full h-96 relative mb-5">
              <Image
                src={urlPlaceholder.url}
                alt="Image from Pinata"
                fill
                className="object-fill"
              />
            </div>
          )}
        </div>
      )} */}

      {urlPhoto && (
        <div className="w-full h-96 relative mb-5">
          <Image
            src={urlPhoto.url}
            alt="Image from Pinata"
            fill
            className="object-fill"
          />
        </div>
      )}

      {/* {urlPlaceholder ? (
        <div className="w-full h-96 relative mb-5">
          <Image
            src={urlPlaceholder.url}
            alt="Image from Pinata"
            fill
            className="object-fill"
          />
        </div>
      ) : urlPhoto ? (
        <div className="w-full h-96 relative mb-5">
          <Image
            src={urlPhoto}
            alt="Image from Pinata"
            fill
            className="object-fill"
          />
        </div>
      ) : (
        <div className="w-full h-96 bg-gray-100 flex justify-center items-center mb-5">
          <p className="text-gray-500">No image selected</p>
        </div>
      )} */}

      <input type="file" onChange={handleChange} className="" />

      <div>
        <button
          type="button"
          disabled={uploading}
          onClick={uploadFile}
          className={`bg-green-500 p-2 text-white rounded-lg mt-5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
            uploading && "bg-orange-500"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* {type === "placeholder" ? (
        <div>
          {!urlPlaceholder.url ? (
          <button
            type="button"
            disabled={uploading || !groupName.on}
            onClick={uploadFile}
            className={`bg-green-500 p-2 text-white rounded-lg mt-5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
              uploading && "bg-orange-500"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          )
        </div>
      ) : (
        <div>
          <button
            type="button"
            disabled={uploading}
            onClick={uploadFile}
            className={`bg-green-500 p-2 text-white rounded-lg mt-5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
              uploading && "bg-orange-500"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )} */}
    </main>
  )
}
