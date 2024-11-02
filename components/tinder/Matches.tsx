import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `/api/tinder/${window.localStorage.getItem("tinderToken")}/matches`
      );
      const data = await resp
        .json()
        .then((data) => data.data)
        .then((data) => data.data);

      const matches = data.matches.map((match) => ({
        name: match.person.name,
        age:
          new Date().getFullYear() -
          new Date(match.person.birth_date).getFullYear(),
        bio: match.person.bio,
        photo: match.person.photos[0].url,
      }));

      setMatches(matches);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-96">
        <ThreeDots color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white">Matches</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {matches.map((match) => (
          <li key={match.name} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="w-12 h-12 rounded-full"
                src={match.photo}
                alt={match.name}
              />
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
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
