"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function userprofile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return {loading,data}

}
