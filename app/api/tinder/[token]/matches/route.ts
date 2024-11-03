import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const res = await fetch(
    "https://api.gotinder.com/v2/matches?locale=en&count=100",
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
