"use server";

import GoodsItem from "./GoodsItem";
import { getProducts } from "@/lib/actions/goods";

async function GoodsList() {
  const data = await getProducts();

  return (
    <div className="flex gap-5 flex-wrap w-full">
      {data?.data &&
        data.data.map((el, i) => <GoodsItem product={el} key={i} />)}
    </div>
  );
}

export default GoodsList;
