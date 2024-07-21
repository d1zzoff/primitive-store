"use server";

import React from "react";
import PurchaseList from "@/components/purchase-list/PurchaseList";

async function Page() {
  return (
    <section className="flex flex-col items-start gap-[30px] w-full flex-grow">
      <h2>Мои покупки</h2>
      <PurchaseList />
    </section>
  );
}

export default Page;
