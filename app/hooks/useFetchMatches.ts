import { useEffect, useState } from "react";

export interface Match {
  id: string;
  person_id: string;
  name: string;
  age: number;
  bio: string;
  photo: string;
  liked_content: string[];
  last_activity_date: string;
  interests: string[];
}

export const useFetchMatches = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `/api/tinder/${window.localStorage.getItem("tinderToken")}/matches`
      );
      const data = await resp
        .json()
        .then((data) => data.data)
        .then((data) => data.data);

      // @ts-expect-error - unknown type
      const matches = [];
      for (const match of data.matches) {
        const resp = await fetch(
          `/api/tinder/${window.localStorage.getItem("tinderToken")}/matches/${
            match.person._id
          }`
        );

        const data = await resp
          .json()
          .then((data) => data.data)
          .then((data) => data.results);

        matches.push({
          id: match._id,
          person_id: match.person._id,
          name: match.person.name,
          age:
            new Date().getFullYear() -
            new Date(match.person.birth_date).getFullYear(),
          bio: match.person.bio,
          photo: match.person.photos[0].processedFiles[0].url,
          liked_content: [
            match.liked_content?.by_closer?.photo?.url,
            match.liked_content?.by_opener?.photo?.url,
          ].filter((url) => url),
          last_activity_date: new Date(
            match.last_activity_date
          ).toLocaleDateString(),
          interests: data.user_interests.selected_interests.map(
            (interest) => interest.name
          ),
        });

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      console.log(matches);

      setMatches(matches);
      setLoading(false);
    };
    fetchData();
  }, [setMatches, setLoading]);

  return [matches, loading];
};
