import { useInstagramMedia } from "@/app/hooks/useInstagramMedia";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function GenerateBioButton({
  userPrompt,
  quizResponses,
  userInterests,
  setGeneratedBio,
}: Readonly<{
  userPrompt: string;
  setGeneratedBio: (bio: string) => void;
  quizResponses: string[];
  userInterests: string[];
}>): JSX.Element {
  const [instagramItems, loading] = useInstagramMedia();
  const [generatingBio, setGeneratingBio] = useState(false);

  return (
    <Button
      variant="outline"
      disabled={generatingBio}
      onClick={async () => {
        if (loading) return;

        setGeneratingBio(true);

        const base64Images = [];
        for (const item of instagramItems) {
          const response = await fetch(item.url);
          const blob = await response.blob();
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(blob);
          });
          base64Images.push(base64.split(",")[1]);
        }

        const tinderUserInfo = `Interests: ${userInterests.join(
          ", "
        )}\nQuiz Responses: ${quizResponses.join("\n")}`;

        console.log(tinderUserInfo);

        const payload = {
          instaImages: base64Images,
          instaCaptions: instagramItems.map((item) => item.caption),
          userPrompt: userPrompt,
          tinderUserInfo: tinderUserInfo,
          tinderQuestions: [],
        };

        const res = await fetch("https://developer314159.pythonanywhere.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Convert the payload to a JSON string
        });

        const data = await res.text();
        setGeneratedBio(data);
        setGeneratingBio(false);
      }}
    >
      {generatingBio ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        "Generate Bio"
      )}
    </Button>
  );
}
