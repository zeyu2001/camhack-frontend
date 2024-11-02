import { useEffect, useState } from "react";

interface Item {
  id: string;
  url: string;
  username: string;
  caption: string;
}

export const useInstagramMedia = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("instagramToken")) {
      return;
    }

    const fetchData = async () => {
      const res = await fetch(
        `/api/instagram/media/${localStorage.getItem("instagramToken")}`
      );
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return [items, loading] as const;
};
