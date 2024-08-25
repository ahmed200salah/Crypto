"use client";
import millify from "millify";
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../Services/CryptoApi";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export default function CyptoList() {
  const [search, setSearch] = useState("");
  const show = useSelector((state) => state.show.value);
  const { data, isFetching } = useGetCryptosQuery(show);
  const [cryptos, setCryptos] = useState(data?.data?.coins);

  useEffect(() => {
    setCryptos(data?.data?.coins);

    const filteredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    setCryptos(filteredData);
  }, [data, search]);


  if (isFetching) return <p>Loading...</p>;
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Search Cryptocurrency"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-1/3 p-2 rounded-lg bg-slate-200 text-black max-lg:w-1/2 max-md:w-full"
        />
      </div>
      <div className="grid grid-cols-3 gap-6 text-black max-lg:grid-cols-2 max-md:grid-cols-1">
        {cryptos?.map((coin) => (
          <Link href={`/cryptodetails/${coin.uuid}`} key={coin}>
            <div
              key={coin.uuid}
              className="flex flex-col gap-2 p-4 rounded-xl cursor-pointer bg-slate-200 h-[110px] active:scale-95 transition-all hover:translate-x-2 group hover:bg-slate-950 hover:text-white"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                  <Image
                    src={coin.iconUrl}
                    alt={coin.name}
                    width={40}
                    height={40}
                    className="w-8 h-8 group-hover:scale-125 transition-all"
                  />
                  <h1 className="text-2xl font-bold">
                    {coin.name.slice(0, 20)}
                  </h1>
                </div>
                <p
                  className={`text-2xl font-bold  ${
                    coin.change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {millify(coin.price)}$
                </p>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                  <p
                    className={`text-sm font-bold ${
                      coin.change > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {coin.change > 0 ? "+" : ""}
                    {coin.change}%
                  </p>
                </div>

                <p className="text-2xl font-bold">{millify(coin.marketCap)}$</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
