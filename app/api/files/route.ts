import { NextResponse, type NextRequest } from "next/server"
import { pinata } from "@/lib/pinata/config"
import { randomUUID } from "crypto"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()

    if (data.get("groupName")) {
      const groupName = data.get("groupName")?.toString() || randomUUID()

      const group = await pinata.groups.create({
        name: groupName,
        isPublic: true,
      })

      const file: File | null = data.get("file") as unknown as File
      const newName = `${file.name} + ${randomUUID()}`

      const fileFormmated = new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
      })
  
      const uploadData = await pinata.upload
        .file(fileFormmated).group(group.id)

      const url = await pinata.gateways.createSignedURL({
        cid: uploadData.cid,
        expires: 3600,
      })
      return NextResponse.json({ url, groupId: group.id }, { status: 200 })
    }

    if (data.get("groupId")) {
      const groupId = data.get("groupId")?.toString()

      const file: File | null = data.get("file") as unknown as File
      const newName = `${file.name} + ${randomUUID()}`

      const fileFormmated = new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
      })

      const uploadData = await pinata.upload
        .file(fileFormmated)
        .group(groupId!)
        
      const url = await pinata.gateways.createSignedURL({
        cid: uploadData.cid,
        expires: 3600,
      })
      return NextResponse.json({ url, groupId: groupId }, { status: 200 })
    }

    // const file: File | null = data.get("file") as unknown as File;
    // const uploadData = await pinata.upload.file(file)
    // const url = await pinata.gateways.createSignedURL({
    //  	cid: uploadData.cid,
    //  	expires: 3600,
    // });
    // return NextResponse.json(url, { status: 200 });
  } catch (e: unknown) {
    console.log(e)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
