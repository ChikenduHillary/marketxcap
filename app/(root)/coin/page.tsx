"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import fuel from "@/public/icons/fuel-icon.svg";
import Image from "next/image";
import CommodityCard from "@/components/commodity-card";
import { IoIosArrowForward } from "react-icons/io";
import marketCap from "@/public/icons/market-cap.svg";
import volume from "@/public/icons/Volume.svg";
import progress from "@/public/icons/pie-chart.svg";
import popularity from "@/public/icons/popularity.svg";
import { AgChartsReact } from "ag-charts-react";
import { FaX } from "react-icons/fa6";
import { fetchData } from "@/api/authApi";
import { LineWave } from "react-loader-spinner";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [overlay, setOverlay] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    title: {
      text: "Annual Fuel Expenditure",
    },
    data: getData(),
    series: [
      {
        xKey: "quarter",
        yKey: "petrol",
        yName: "Petrol",
        strokeWidth: 1,
        marker: {
          enabled: false,
        },
      },
    ],
  });

  function getData() {
    return [
      {
        quarter: "04:16",
        petrol: 200,
      },
      {
        quarter: "05:16",
        petrol: 50,
      },
      {
        quarter: "06:16",
        petrol: 350,
      },
      {
        quarter: "07:16",
        petrol: 300,
      },
      {
        quarter: "08:16",
        petrol: 500,
      },
      {
        quarter: "09:16",
        petrol: 100,
      },
      {
        quarter: "10:16",
        petrol: 300,
      },
      {
        quarter: "11:16",
        petrol: 50,
      },
      {
        quarter: "12:16",
        petrol: 10,
      },
    ];
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("fetching");
        setLoading(true);
        const datas = await fetchData(
          "https://marketxcap.vercel.app/tracker/default/"
        );
        console.log(datas);
        setData(datas);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);
  return (
    <>
      <div
        className={`${
          loading ? "flex" : "hidden"
        } flex items-center justify-center h-[100vh]`}
      >
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
      <section className={` ${!loading ? "flex" : "hidden"} p-10`}>
        <div
          className={` ${
            overlay ? "fixed" : "hidden"
          } h-[100vh] backdrop-blur-sm p-10 z-40 w-[100vw] flex flex-col items-end top-0 left-0`}
        >
          <FaX
            className="text-black relative top-[3em] right-3"
            onClick={() => setOverlay(false)}
          />
          <div className="w-full h-full bg-white rounded-xl flex items-center text-black justify-center font-semibold text-2xl">
            <p>Comming Soon...</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IoIosArrowBack className="text-2xl" />
            <div className="flex items-center ml-3">
              <Image src={fuel} alt="image" width={30} height={30} />
              <p className="font-semibold text-lg ml-2">
                Fuel{" "}
                <span className="text-slate-500 font-normal text-xs">
                  (PMS)
                </span>
              </p>
            </div>
          </div>
          <div
            className="flex items-center bg-blue bg-opacity-10 p-2 rounded-full text-blue space-x-1 font-semibold cursor-pointer"
            onClick={() => setOverlay(true)}
          >
            <div className=" flex items-center justify-center w-7 h-7 rounded-full bg-blue text-white">
              <CgArrowsExchangeAlt />
            </div>
            <p>TRADE</p>
          </div>
        </div>
        <div className="flex items-center text-xl mt-5">
          <p className="font-semibold mr-2">N98,509.75</p>
          <p className="text-green text-sm">+1700.254(9.77%)</p>
        </div>

        <div className="mb-10">
          <div className="w-full h-[20em] rounded-lg mt-4 mb-4">
            <AgChartsReact options={options} />
          </div>
          <div className="flex items-center gap-2">
            <p className="bg-[#F8F9FA] w-10 text-center text-sm font-medium p-1 text-slate-500 rounded-full">
              1H
            </p>
            <p className="bg-[#F8F9FA] w-10 text-center text-sm font-medium p-1 text-slate-500 rounded-full">
              24H
            </p>
            <p className="bg-[#F8F9FA] w-10 text-center text-sm font-medium p-1 text-slate-500 rounded-full">
              1W
            </p>
            <p className="bg-[#F8F9FA] w-10 text-center text-sm font-medium p-1 text-slate-500 rounded-full">
              6M
            </p>
            <p className="bg-[#F8F9FA] w-10 text-center text-sm font-medium p-1 text-slate-500 rounded-full">
              1Y
            </p>
            <p className="bg-[#F8F9FA] w-10 text-center text-sm font-medium p-1 text-slate-500 rounded-full">
              ALL
            </p>
          </div>
        </div>

        <CommodityCard commodityIcon={fuel} />
        <div className="flex items-center justify-between p-3 shadow-lg mt-3 rounded-lg">
          <p>Transactions</p>
          <IoIosArrowForward />
        </div>

        <div className="mt-10">
          <p className="font-bold text-lg mb-5">Market Stats</p>
          <div className="space-y-3">
            <div className="flex items-start justify-between text-slate-500">
              <div className="flex items-center">
                <Image src={marketCap} width={20} height={20} alt="market" />
                <p className="text-sm ml-3">Market Cap</p>
              </div>
              <p className="font-semibold">N19.8 trillion</p>
            </div>
            <div className="flex items-start justify-between text-slate-500">
              <div className="flex items-center">
                <Image src={volume} width={20} height={20} alt="market" />
                <p className="text-sm ml-3">Volume</p>
              </div>
              <p className="font-semibold">N19.8 trillion</p>
            </div>
            <div className="flex items-start justify-between text-slate-500">
              <div className="flex items-center">
                <Image src={progress} width={20} height={20} alt="market" />
                <p className="text-sm ml-3">Circulating Supply</p>
              </div>
              <p className="font-semibold">N19.8 trillion</p>
            </div>
            <div className="flex items-start justify-between text-slate-500">
              <div className="flex items-center">
                <Image src={popularity} width={20} height={20} alt="market" />
                <p className="text-sm ml-3">Popularity</p>
              </div>
              <p className="font-semibold">N19.8 trillion</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mt-5 mb-1">About</h2>
          <p className="text-sm text-slate-500">
            Fuel, the lifeblood of modern industry and traansportation, powers
            our world with efficiency and reliability. As a commodity, it
            encompasses a diverse array of products including gasoline, diesel,
            jet fuel and more. It’s value is influenced by factors such as
            geopolitical events, weather patterns, regulatory changes and supply
            and demand dynamics.{" "}
          </p>

          <p className="font-bold text-lg mt-5">Top Stories</p>
          <div>
            <div>
              <p className="text-sm font-semibold">
                Global Fuel Prices Surge Amidst Ongoing Supply Chain
                Disruptions.
              </p>
              <p className="font-semibold text-xs text-slate-500">
                OilPrice . 12 hrs ago
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
