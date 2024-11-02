import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string; id: string }> }
) {
  const { token, id } = await params;

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const res = await fetch(`https://api.gotinder.com/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
