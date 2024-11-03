import { useEffect, useState } from "react";
import { Match } from "./useFetchMatches";

export const useFetchOpenings = (
  matches: Match[],
  recommended: string[],
  bio: string
) => {
  const [loading, setLoading] = useState(true);
  const [openings, setOpenings] = useState<{ id: string; opening: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (matches.length === 0) return;
      if (bio.trim().length === 0) return;
      if (recommended.length === 0) return;

      const filteredMatches = matches.filter((match: Match) =>
        recommended.includes(match.id)
      );
      const images = [];
      for (const match of filteredMatches) {
        const b64Image = await fetch(`https://corsproxy.io/?${match.photo}`)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
              })
          );
        images.push(b64Image.split(",")[1]);
      }

      const payload = {
        tinderUserInfo: bio,
        tinderMatchesInfo: filteredMatches.map(
          (match) => `${match.bio}\n Interests: ${match.interests.join(", ")}`
        ),
        tinderMatchesImages: images,
      };
      console.log(payload);

      const resp = await fetch(
        "https://flowingpurplecrane.pythonanywhere.com/opening",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await resp.json();
      console.log(data);

      const openings = filteredMatches.map((match, idx) => ({
        id: match.id,
        opening: data.openings[idx],
      }));

      setOpenings(openings);
      setLoading(false);
    };
    fetchData();
  }, [matches, bio, recommended]);

  return [openings, loading];
};
