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
    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,caption&access_token=${token}`
  );
  const data = await res.json();

  const firstFiveImages = data.data
    .filter(
      // @ts-expect-error - unknown type
      (item) =>
        item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM"
    )
    .slice(0, 5);

  // @ts-expect-error - unknown type
  const result = firstFiveImages.map((item) => {
    return {
      id: item.id,
      url: item.media_url,
      username: item.username,
      caption: item.caption,
    };
  });

  return Response.json(result);
}
