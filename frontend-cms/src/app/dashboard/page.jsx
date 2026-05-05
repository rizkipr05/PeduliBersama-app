"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/reports/summary").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Donasi: {data.totalDonation}</p>
      <p>Total User: {data.totalUsers}</p>
      <p>Total Bencana: {data.totalDisasters}</p>
    </div>
  );
}