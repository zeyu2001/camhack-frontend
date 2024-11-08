import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const bodyParams = {
    client_id: "1103578951260569",
    client_secret: "d7a24c7cf6fc8fa20c3d1335df272706",
    grant_type: "authorization_code",
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? "https://345e-131-111-5-201.ngrok-free.app/instagram-auth"
        : "https://catfish-camhack.vercel.app/instagram-auth",
    code,
  };
  const body = new URLSearchParams(bodyParams);

  const res = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  const data = await res.json();

  return Response.json(data);
}
