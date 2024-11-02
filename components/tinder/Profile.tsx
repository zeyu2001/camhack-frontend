import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { GenerateBioButton } from "./GenerateBioButton";
import { UserPromptDialog } from "./UserPromptDialog";
import { SyncButton } from "./SyncButton";
import { Badge } from "@/components/ui/badge";

export const Profile = ({
  bio,
  setBio,
}: Readonly<{
  bio: string;
  setBio: (bio: string) => void;
}>): JSX.Element => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(20);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatedBio, setGeneratedBio] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [quizResponses, setQuizResponses] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [generatedResponses, setGeneratedResponses] = useState<string[]>([]);

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
      setLocation(
        `${data.user.city.name}, ${data.user.city.region}, ${data.user.pos_info.country.name}`
      );

      const interests = data.user.user_interests.selected_interests.map(
        (interest) => interest.name
      );

      const quizzes = data.user.sparks_quizzes;
      const responses = quizzes.map((quiz) =>
        quiz.quizzes
          .map((q) =>
            q.answer_details
              .map((answer) => `${answer.prompt_text}: ${answer.answer_text}`)
              .join(", ")
          )
          .join(", ")
      );

      const prompts = data.user.user_prompts.prompts.map((prompt) => ({
        prompt: prompt.question_text,
        response: prompt.answer_text,
      }));

      setPrompts(prompts);
      setUserInterests(interests);
      setQuizResponses(responses);
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
              <span className="text-white">{name}</span>,{" "}
              <span className="text-white">{age}</span> years old, living in{" "}
              <span className="text-white">{location}</span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">Interests</dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 flex gap-2">
              {userInterests.map((interest, idx) => (
                <Badge variant="secondary" key={idx}>
                  {interest}
                </Badge>
              ))}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">Prompts</dt>
            <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {prompts.map((prompt, idx) => (
                <div key={idx} className="my-4">
                  <p className="font-medium text-white">{prompt.prompt}</p>
                  <p className="text-gray-400">{prompt.response}</p>
                  {generatedResponses[idx] && (
                    <p className="text-green-500">{generatedResponses[idx]}</p>
                  )}
                </div>
              ))}
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
        <div className="flex justify-end px-4 py-6 sm:px-0 sm:gap-2">
          {generatedBio && (
            <SyncButton
              bio={generatedBio}
              setGeneratedBio={setGeneratedBio}
              setBio={setBio}
              responses={generatedResponses}
              setGeneratedResponses={setGeneratedResponses}
              setPrompts={setPrompts}
            />
          )}
          <GenerateBioButton
            setGeneratedBio={setGeneratedBio}
            userPrompt={userPrompt}
            userInterests={userInterests}
            quizResponses={quizResponses}
            tinderQuestions={prompts.map((prompt) => prompt.prompt)}
            setGeneratedResponses={setGeneratedResponses}
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
