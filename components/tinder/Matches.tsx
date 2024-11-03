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
import { useFetchMatches } from "@/app/hooks/useFetchMatches";
import { useFetchRecommendations } from "@/app/hooks/useFetchRecommendations";
import { OpeningLinePopover } from "./OpeningLinePopover";
import { DateIdeaSheet } from "./DateIdeaSheet";
import { useFetchOpenings } from "@/app/hooks/useFetchOpenings";

export const Matches = ({
  bio,
}: Readonly<{
  bio: string;
}>): JSX.Element => {
  const [matches, matchesLoading] = useFetchMatches();
  const [recommendedMatches, recommendedMatchesLoading] =
    useFetchRecommendations(bio, matches);
  const [openings, openingsLoading] = useFetchOpenings(
    matches,
    recommendedMatches,
    bio
  );

  if (matchesLoading) {
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
      {recommendedMatchesLoading && (
        <div className="flex justify-center items-center">
          Finding best matches <ThreeDots color="#ffffff" />
        </div>
      )}
      <ul className="divide-y divide-gray-100">
        {matches
          .toSorted((a, b) => {
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
                <div className="flex gap-2">
                  <OpeningLinePopover
                    match={match}
                    opening={openings.find((o) => o.id === match.id)?.opening}
                    openingsLoading={openingsLoading}
                  />
                  <DateIdeaSheet match={match} />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Match Details</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="p-4">
                        {match.liked_content.length > 0 && (
                          <>
                            <h2 className="font-semibold text-white pb-4">
                              Photos you and {match.name} liked
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
                        <p className="text-sm text-gray-400">
                          You last talked on{" "}
                          <span className="text-white">
                            {match.last_activity_date}
                          </span>
                          . Keep the conversation going!
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
