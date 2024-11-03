import { useEffect, useState } from "react";
import { Match } from "./useFetchMatches";

export const useFetchDateIdeas = (match: Match, bio: string, open: boolean) => {
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<{ name: string; link: string }[]>([]);

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      const payload = {
        tinderUserInfo: bio,
        tinderMatchInfo: `${match.bio}\n Interests: ${match.interests.join(
          ", "
        )}`,
        tinderUserCity: "Cambridge, United Kingdom",
      };
      const res = await fetch(
        "https://flowingpurplecrane.pythonanywhere.com/dates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      const ideas = data.recommendations.map((r) => ({
        name: r[0],
        link: r[1],
      }));
      console.log(ideas);
      setIdeas(ideas);
      setLoading(false);
    };
    fetchData();
  }, [match, bio, open]);

  return [ideas, loading];
};
