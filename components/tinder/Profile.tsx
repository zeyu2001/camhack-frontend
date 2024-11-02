import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { GenerateBioButton } from "./GenerateBioButton";
import { UserPromptDialog } from "./UserPromptDialog";

export const Profile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState(20);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatedBio, setGeneratedBio] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `/api/tinder/${window.localStorage.getItem("tinderToken")}`
      );
      const data = await resp
        .json()
        .then((data) => data.data)
        .then((data) => data.data);

      setName(data.user.name);
      setBio(data.user.bio);

      const birthDate = new Date(data.user.birth_date);
      const now = new Date();
      setAge(now.getFullYear() - birthDate.getFullYear());
      setLocation(data.user.pos_info.country.name);
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
      <h1 className="text-2xl font-bold text-white">Welcome back, {name}!</h1>

      <div className="mt-6 border-t border-white/10">
        <dl className="divide-y divide-white/10">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">About you</dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {name}, {age}, in {location}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">Profile Bio</dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {bio
                .trim()
                .split("\n")
                .map((line, idx) => (
                  <>
                    <span key={`bio-${idx}`} className="text-sm">
                      {line}
                    </span>
                    <br />
                  </>
                ))}
              <br />
              {generatedBio && (
                <h2 className="text-sm/6 font-medium text-white">
                  Generated Bio
                </h2>
              )}
              {generatedBio
                ?.trim()
                .split("\n")
                .map((line, idx) => (
                  <>
                    <span
                      key={`generated-bio-${idx}`}
                      className="text-sm text-green-500"
                    >
                      {line}
                    </span>
                    <br />
                  </>
                ))}
            </dd>
          </div>
        </dl>
        <div className="flex justify-end px-4 py-6 sm:px-0">
          <GenerateBioButton
            setGeneratedBio={setGeneratedBio}
            userPrompt={userPrompt}
          />
          <UserPromptDialog
            setUserPrompt={setUserPrompt}
            userPrompt={userPrompt}
          />
        </div>
      </div>
    </div>
  );
};
