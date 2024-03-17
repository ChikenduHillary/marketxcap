import { FunctionComponent } from "react";
import Image from "next/image";
import fuel from "@/public/icons/cement-icon.svg";

interface CommodityCardProps {
  commodityIcon: string;
  name?: string;
  symbol?: string;
  currentPrice?: string;
  percentChange?: string;
}

const CommodityCard: FunctionComponent<CommodityCardProps> = ({
  name,
  currentPrice,
  symbol,
  percentChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div>
          <Image src={fuel} width={50} height={50} alt="fuel" />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs font-semibold text-slate-500">{symbol}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold">₦{currentPrice}</p>
        <p
          className={`${
            Number(percentChange) < 0 ? "text-red-500" : "text-green"
          }`}
        >
          {Number(percentChange)?.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CommodityCard;
