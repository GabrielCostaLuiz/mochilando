import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          width: "500px",
          height: "500px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "url(https://mochilando.vercel.app/placeholder.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    ),
    {
      width: 500,
      height: 500,
    }
  )
}
