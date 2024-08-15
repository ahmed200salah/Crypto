"use client";
import { useDispatch } from "react-redux";
import { useGetCryptosQuery } from "./Services/CryptoApi";
export default function Home() {
  const dispatch = useDispatch();
  const { data } = useGetCryptosQuery();
  console.log(data)
  return (
    <main className="flex min-h-svh flex-col items-center justify-between p-24"></main>
  );
}
