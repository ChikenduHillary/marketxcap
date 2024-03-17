"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import CommodityCard from "@/components/commodity-card";
import { commodityIcons } from "@/constants";
import Link from "next/link";
import { LineWave } from "react-loader-spinner";
import { fetchData } from "@/api/authApi";

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
        } items-center justify-center h-[100vh]`}
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
      {data?.length > 0 && (
        <section className={`${!loading ? "block" : "hidden"} p-5 md:p-10`}>
          <div>
            <h1 className="font-semibold text-xl">
              Market is Up <span className="text-green">+11.7%</span>
            </h1>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm text-gray">
                in the past 24hrs
              </p>
              <IoSearchOutline className="text-slate-500 font-bold" />
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-lg">Commodities</p>
              <p className="flex items-center text-sm text-slate-500">
                Market-NGN <FaCaretDown />
              </p>
            </div>
            <div className="flex items-center gap-4 mt-5 font-semibold">
              <p className="border-b-[2px] border-blue text-blue">All</p>
              <p className="text-slate-500 ">Favourites</p>
            </div>

            <div className="mt-4 space-y-5">
              {data.map(
                ({
                  one_hour_percentage_change,
                  current_price,
                  name: { name, symbol, logo },
                }) => (
                  <div key={symbol}>
                    <Link href={`/coin/${name}`} className="">
                      <CommodityCard
                        commodityIcon={logo}
                        name={name}
                        currentPrice={current_price}
                        percentChange={one_hour_percentage_change}
                        symbol={symbol}
                      />
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Page;
