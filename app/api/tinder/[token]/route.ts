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
    "https://api.gotinder.com/v2/profile?locale=en&include=user",
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { bio } = await request.json();

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const res = await fetch("https://api.gotinder.com/v2/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body: JSON.stringify({
      user: { bio: bio },
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
