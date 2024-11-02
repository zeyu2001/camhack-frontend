import { useEffect, useState } from "react";

export const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("test");
  const [age, setAge] = useState(25);
  const [location, setLocation] = useState("New York, NY");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `/api/tinder/${window.localStorage.getItem("tinderToken")}`
      );
      const data = await resp
        .json()
        .then((data) => data.data)
        .then((data) => data.data);
      console.log(data);

      setName(data.user.name);
      setBio(data.user.bio);

      const birthDate = new Date(data.user.birth_date);
      const now = new Date();
      setAge(now.getFullYear() - birthDate.getFullYear());
      setLocation(data.user.pos_info.country.name);
    };
    fetchData();
  }, []);

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
              {bio}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
