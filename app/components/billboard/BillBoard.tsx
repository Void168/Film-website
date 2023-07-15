import useBillBoard from "@/app/hooks/useBillBoard";
import React from "react";

interface BillBoardProps {}

const BillBoard: React.FC<BillBoardProps> = () => {
  const { data } = useBillBoard();
  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default BillBoard;
