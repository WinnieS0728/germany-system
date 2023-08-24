import axios from "axios";
import { useEffect, useState } from "react";

export function AA() {
  const [data, setData] = useState<resType[]>([]);
  useEffect(() => {
    (async function () {
      const res = await axios<resType[]>({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/posts`,
      });
      setData(res.data);
    })();
  }, []);

  return (
    <>
      <table className='mx-auto my-8 w-1/2'>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((data, i) => <th key={i}>{data}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            Object.values(data).map((data) => (
              <tr key={data.id}>
                <td style={{ whiteSpace: "nowrap" }}>user - {data.userId}</td>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.body}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

type resType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
