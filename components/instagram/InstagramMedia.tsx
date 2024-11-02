import { Card, CardContent, CardDescription } from "@/components/ui/card";

export function InstagramMedia({
  url,
  caption,
}: Readonly<{
  url: string;
  caption: string;
}>): JSX.Element {
  return (
    <Card>
      <img
        src={url}
        alt={caption}
        className="w-full object-cover rounded-lg rounded-b-none"
      />
      <CardContent>
        <CardDescription className="mt-4">{caption}</CardDescription>
      </CardContent>
    </Card>
  );
}
