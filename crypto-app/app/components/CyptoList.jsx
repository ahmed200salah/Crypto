"use client";
import millify from "millify";
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../Services/CryptoApi";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function CyptoList() {
  const show = useSelector((state) => state.show.value);

  const { data, isFetching } = useGetCryptosQuery(show);
  const [cryptos, setCryptos] = useState(data?.data?.coins);
  const [search, setSearch] = useState("");
  if (isFetching) return <p>Loading...</p>;
  useEffect(() => {
    setCryptos(data?.data?.coins);

    const filteredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    setCryptos(filteredData);
  }, [data, search]);

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Search Cryptocurrency"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-1/3 p-2 rounded-lg bg-slate-200 text-black"
        />
      </div>
      <div className="grid grid-cols-3 gap-6 text-black">
        {cryptos?.map((coin) => (
          <Link href={`/cryptodetails/${coin.uuid}`}>
            <div
              key={coin.uuid}
              className="flex flex-col gap-2 p-4 rounded-xl cursor-pointer bg-slate-200 h-[110px]"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                  <img src={coin.iconUrl} alt={coin.name} className="w-8 h-8" />
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
