"use client";
import HTMLReactParser from "html-react-parser";

import { useParams } from "next/navigation";
import {
  useGetCryptDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../Services/CryptoApi";
import React, { useEffect, useState } from "react";
import millify from "millify";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import LineChart from "../../components/LineChart";

const CryptoDetails = () => {
  const coinId = useParams();
  const [timePeriod, setTimePeriod] = useState("3h");
  const { data: coin, isFetching } = useGetCryptDetailsQuery(
    coinId.CryptoDetails
  );
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: coinId.CryptoDetails,
    timePeriod,
  });

  const cryptoDetails = coin?.data?.coin;
  if (isFetching) return "Loading...";

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="min-h-svh mt-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </h1>
        <p>{cryptoDetails?.name} live price in US dollars.</p>
      </div>
      {
        // image
      }
      <div className="flex flex-col justify-center items-center m-5">
        <Image
          width={150}
          height={150}
          src={cryptoDetails?.iconUrl}
          alt={cryptoDetails?.name}
        />
      </div>

      <div className=" items-center justify-center flex m-4">
        <select
          className="w-1/3 p-2 rounded-lg bg-slate-200 text-black"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          {time.map((date) => (
            <option
              key={date}
              value={date}
              className="
            w-1/3 p-2 rounded-lg bg-slate-200 text-black"
            >
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center">
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
          coinChange={millify(cryptoDetails?.change)}
        />
      </div>

      <div className="flex flex-row max-md:flex-col gap-7 max-md:gap-12 items-center justify-center max-md:ml-5 ">
        <div >
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-2">Stats</h1>
            <p>An overview showing the statistics of {cryptoDetails?.name}</p>
          </div>

          <div className="flex flex-col m-4 items-center justify-center">
            {stats.map(({ icon, title, value }) => (
              <>
                <div className="flex mx-auto w-96" key={value}>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    {icon}
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p>{value}</p>
                  </div>
                </div>
                <hr
                  className="
          w-96
          border
          border-gray-500
          my-3
          mx-auto
          "
                />
              </>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-2 max-md:text-4xl">Other Stats Info</h1>
            <p>An overview showing the statistics of {cryptoDetails?.name}</p>
          </div>

          <div className="flex flex-col m-4 items-center justify-center">
            {genericStats.map(({ icon, title, value }) => (
              <>
                <div className="flex mx-auto w-96" key={value}>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    {icon}
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p>{value}</p>
                  </div>
                </div>
                <hr
                  className="
          w-96
          border
          border-gray-500
          my-3
          mx-auto
          "
                />
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mx-auto">
        <h1 className="text-5xl font-bold mb-2 text-center max-md:text-3xl">
          What is {cryptoDetails?.name}
        </h1>
        {<p className=" items-center mx-auto text-left ml-4 font-bold">{HTMLReactParser(cryptoDetails?.description || "")}</p>}
        <br />
      </div>

      <div className="flex flex-col mb-7 ">
        <h1 className="text-5xl font-bold text-center mb-7">
          {cryptoDetails?.name} Links
        </h1>
        {cryptoDetails.links.map((link) => (
          <>
            <div className="mx-auto w-96 justify-between">
              <div className="flex gap-20 items-center justify-between ">
                <div className="font-bold ">{link.type}</div>

                <h1 className="text-xl font-bold">
                  <Link
                    className="text-[#CD5C08]"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.name}
                  </Link>
                </h1>
              </div>
            </div>

            <hr
              className="
          w-96
          border
          border-gray-500
          my-3
          mx-auto
          "
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default CryptoDetails;
