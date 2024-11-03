import { NextRequest } from "next/server";

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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string; id: string }> }
) {
  const { token, id } = await params;
  const { matchId, message } = await request.json();

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const res = await fetch(`https://api.gotinder.com/user/matches/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body: JSON.stringify({
      matchId,
      sessionId: null,
      message: `[This is an automated test message for a hackathon project] ${message}`,
    }),
  });
  const data = await res.json();

  return Response.json(data);
}
