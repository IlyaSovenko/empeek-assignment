"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface IData {
  id: number;
  about: string;
  birthday: string;
  address: string;
  email: string;
  city: string;
  zipcode: string;
  state: string;
}

export default function DataPage() {
  const [data, setData] = useState<IData[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios<IData[]>(process.env.NEXT_PUBLIC_API_URL + "user")
      setData(response.data)
    }
    fetchData();
  }, [])
  
  return <main className="flex flex-col gap-8 row-start-2 items-center">
    <div className="card bg-white shadow-xl p-3 text-accent-content pb-5 font-black">
      <table className="table">
        {/* head */}
        <thead>
        <tr>
          <th></th>
          <th>Email</th>
          <th>About</th>
          <th>Birthday</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
        </tr>
        </thead>
        <tbody>
        {data.map((person) => <tr key={person.id}>
          <th>{person.id}</th>
          <th>{person.email}</th>
          <td>{person.about}</td>
          <td>{person.birthday}</td>
          <td>{person.address}</td>
          <td>{person.city}</td>
          <td>{person.state}</td>
          <td>{person.zipcode}</td>
        </tr>)}
        </tbody>
      </table>
    </div>
  </main>
}
