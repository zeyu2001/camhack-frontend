import { useEffect, useState } from "react";
import { Match } from "./useFetchMatches";

export const useFetchRecommendations = (
  bio: string,
  matches: Match[]
): [number[], boolean] => {
  const [recommendedMatches, setRecommendedMatches] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (matches.length === 0) return;
      if (bio.trim().length === 0) return;

      const payload = {
        userBio: bio,
        tinderMatchesInfo: matches.map(
          (match) => `${match.bio}\n Interests: ${match.interests.join(", ")}`
        ),
      };
      const res = await fetch(
        "https://flowingpurplecrane.pythonanywhere.com/matches",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      console.log(data);
      setRecommendedMatches(
        eval(data["top 3"]).map((idx: number) => matches[idx].id)
      );
      setLoading(false);
    }
    fetchData();
  }, [bio, matches]);

  return [recommendedMatches, loading];
};
