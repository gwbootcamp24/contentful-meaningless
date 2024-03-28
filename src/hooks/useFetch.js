import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

   useEffect(() => {
    fetchData(url);
    async function fetchData(url) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        console.log("datares", data);
        setData(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
   }, [url]);
  // console.log(data);

  return [error, data];
}
