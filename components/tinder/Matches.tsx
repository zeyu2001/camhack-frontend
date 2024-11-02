import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import clsx from "clsx";

interface Match {
  id: string;
  name: string;
  age: number;
  bio: string;
  photo: string;
  liked_content: string[];
  last_activity_date: string;
  interests: string[];
}

export const Matches = ({
  bio,
}: Readonly<{
  bio: string;
}>): JSX.Element => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendedMatches, setRecommendedMatches] = useState<number[]>([]);

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
        const id = match.person._id.slice(-24);

        const resp = await fetch(
          `/api/tinder/${window.localStorage.getItem(
            "tinderToken"
          )}/matches/${id}`
        );

        const data = await resp
          .json()
          .then((data) => data.data)
          .then((data) => data.results);

        matches.push({
          id,
          name: match.person.name,
          age:
            new Date().getFullYear() -
            new Date(match.person.birth_date).getFullYear(),
          bio: match.person.bio,
          photo: match.person.photos[0].url,
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
  }, []);

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
    }
    fetchData();
  }, [bio, matches]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <ThreeDots color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Matches</h1>
        <Button variant="outline">Generate Opening Lines</Button>
      </div>
      <ul className="divide-y divide-gray-100">
        {matches
          .sort((a, b) => {
            if (recommendedMatches.includes(a.id)) return -1;
            if (recommendedMatches.includes(b.id)) return 1;
            return 0;
          })
          .map((match: Match) => (
            <li key={match.name} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <span className="relative flex-shrink-0">
                  {recommendedMatches.includes(match.id) ? (
                    <HoverCard>
                      <HoverCardTrigger>
                        <span className="animate-ping absolute inline-flex rounded-full bg-green-700 h-12 w-12"></span>
                        <img
                          className={clsx(
                            "w-12 h-12 rounded-full relative ring-2 ring-green-500"
                          )}
                          src={match.photo}
                          alt={match.name}
                        />
                      </HoverCardTrigger>
                      <HoverCardContent className="text-sm">
                        This match is recommended for you based on both of your
                        profiles, interests, and activities.
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <img
                      className={clsx("w-12 h-12 rounded-full relative")}
                      src={match.photo}
                      alt={match.name}
                    />
                  )}
                </span>
                <div className="ml-4">
                  <p className="text-sm font-medium">{match.name}</p>
                  <p className="text-sm text-gray-500">{match.age}</p>
                  <p className="text-sm text-gray-500">
                    {match.bio
                      ?.trim()
                      .split("\n")
                      .map((line, idx) => (
                        <>
                          <span key={idx} className="text-sm">
                            {line}
                          </span>
                          <br />
                        </>
                      ))}
                  </p>
                  {
                    <div className="flex gap-2 mt-2">
                      {match.interests.map((interest, idx) => (
                        <Badge variant="secondary" key={idx}>
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  }
                </div>
              </div>
              <div className="flex flex-col items-end justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Match Details</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="p-4">
                      {match.liked_content.length > 0 && (
                        <>
                          <h2 className="font-semibold text-white pb-4">
                            Liked Content
                          </h2>
                          {match.liked_content.map((url) => (
                            <img
                              key={url}
                              className="w-full h-48 object-cover rounded-md mb-4"
                              src={url}
                              alt="Liked content"
                            />
                          ))}
                        </>
                      )}
                      <p>Last activity at {match.last_activity_date}</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
