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
    request: NextRequest, images: string[], prompt: string
  ) {
  
    const payload = {
      images: images,
      prompt: prompt,
    };
  
    const res = await fetch(
      "pyhtonanywhereapi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Convert the payload to a JSON string
      }
    );
  
    if (!res.ok) {
      return new Response("Error with the request", { status: res.status });
    }
  
    const data = await res.json();
  
    return Response.json({ data });
  }
  