/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { UploadButton } from "@/utils/uploadthing"
import Image from "next/image"

export default function UploadFile({
  changeUrl,
  urlPhoto,
}: {
  changeUrl: any
  urlPhoto: any
}) {

  return (
    <div className="w-full border rounded-lg p-5 m-auto flex flex-col justify-center items-center">
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
            src={urlPhoto}
            alt="Image from Pinata"
            crossOrigin="anonymous"
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

      {/* <input type="file" onChange={handleChange} className="" /> */}

      <div>
        {/* <button
          type="button"
          disabled={uploading}
          onClick={uploadFile}
          className={`bg-green-500 p-2 text-white rounded-lg mt-5 disabled:bg-gray-300 disabled:cursor-not-allowed ${
            uploading && "bg-orange-500"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button> */}
        <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  changeUrl(res[0].appUrl)
    
        
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
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
    </div>
  )
}
