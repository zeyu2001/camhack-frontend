"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function InstagramAuth() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/instagram/auth/${code}`).then((res) =>
        res.json()
      );
      const token = data.access_token;
      localStorage.setItem("instagramToken", token);
      router.push("/");
    };
    fetchData();
  }, [code]);

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
      <ThreeDots color="#ffffff" />
    </div>
  );
}
