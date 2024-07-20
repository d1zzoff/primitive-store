"use client";

import React, { useState } from "react";
import PurchaseList from "@/components/purchase-list/PurchaseList";

const Page = () => {
  return (
    <section className="flex flex-col items-start gap-[30px] w-full flex-grow">
      <h2>Мои покупки</h2>
      <PurchaseList />
    </section>
  );
};

export default Page;
