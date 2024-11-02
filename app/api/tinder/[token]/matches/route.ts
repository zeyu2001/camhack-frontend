import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const res = await fetch(
    "https://api.gotinder.com/v2/matches?locale=en&count=60&message=1",
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
