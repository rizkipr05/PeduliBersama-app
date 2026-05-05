"use client";
import { useEffect, useState } from "react";
import { getDonations, verifyDonation } from "@/services/donationService";

export default function DonationsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDonations().then(res => setData(res.data));
  }, []);

  const handleVerify = async (id) => {
    await verifyDonation(id);
    alert("Donasi diverifikasi");
  };

  return (
    <div>
      <h1>Donasi</h1>
      {data.map(d => (
        <div key={d.id}>
          <p>{d.user}</p>
          <p>{d.amount}</p>
          <p>{d.status}</p>
          <button onClick={()=>handleVerify(d.id)}>Verifikasi</button>
        </div>
      ))}
    </div>
  );
}