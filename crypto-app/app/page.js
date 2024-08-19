"use client";
import { useDispatch, useSelector } from "react-redux";
import { useGetCryptosQuery } from "./Services/CryptoApi";
import { MagicCard } from "./components/animata/Magic-Card/magic-card";
import { useTheme } from "next-themes";
import HyperText from "./components/animata/text/hyper-text";
import millify from "millify";
import Link from "next/link";
import CryptoList from "../app/components/CyptoList";
import { Show } from "./Services/ShowSlice";
import SparklesText from "./components/animata/text/sparkles-text";
export default function Home({ simplified }) {
  const show = useSelector((state) => state.show.value);

  const { theme } = useTheme();
  const { data, isFetching } = useGetCryptosQuery(show);
  const globalState = data?.data?.stats;
  console.log(data);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(Show());
  };

  if (isFetching) return "Loading...";
  return (
    <main className="flex min-h-svh p-12 flex-col gap-12">
      <SparklesText text="Global Crypto Stats" className=" text-center" />

      <div
        className={
          "grid md:grid-cols-3  h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
        }
      >
        <MagicCard className="cursor-pointer items-center justify-center shadow-2xl whitespace-nowrap text-4xl  hover:translate-x-1 transition-all active:scale-95">
          <div className=" flex flex-row gap-3 items-center justify-center">
            <h1 className="text-4xl tracking-tight font-bold text-[#8979ff] ">
              Total:
            </h1>
            <HyperText text={`${millify(globalState.total)}`} />
            Coins
          </div>
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl hover:translate-x-1 transition-all active:scale-95 "
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className=" flex flex-row gap-3 items-center justify-center">
            <h1 className="text-3xl tracking-tight font-bold text-[#8979ff] ">
              Total 24h Volume:
            </h1>
            <HyperText text={`${millify(globalState.total24hVolume)}`} />
          </div>
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl hover:translate-x-1 transition-all active:scale-95"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className=" flex flex-row gap-3 items-center justify-center">
            <h1 className="text-3xl tracking-tight font-bold text-[#8979ff] ">
              Total Exchanges:
            </h1>
            <HyperText text={`${globalState.totalExchanges}`} />
          </div>
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl hover:translate-x-1 transition-all active:scale-95"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className=" flex flex-row gap-3 items-center justify-center">
            <h1 className="text-3xl tracking-tight font-bold text-[#8979ff] ">
              Total MarketCap:
            </h1>
            <HyperText text={`${millify(globalState.totalMarketCap)}`} />
          </div>
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl hover:translate-x-1 transition-all active:scale-95"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className=" flex flex-row gap-3 items-center justify-center">
            <h1 className="text-3xl tracking-tight font-bold text-[#8979ff] ">
              Total Markets:
            </h1>
            <HyperText text={`${millify(globalState.totalMarkets)}`} />
          </div>
        </MagicCard>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center ">
          <h1 className="text-4xl tracking-tight font-bold text-[#8979ff] mx-auto ">
            Top 10 Cryptocurrencies in the world
          </h1>
          <Link
            href={"/"}
            className="font-extrabold flex tracking-tight group gap-2 text-[#A28B55]"
            onClick={() => handleClick()}
          >
            See more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 group-hover:translate-x-2 transition-all"
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      <CryptoList />
    </main>
  );
}
