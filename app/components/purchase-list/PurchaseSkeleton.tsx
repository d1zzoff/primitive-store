import ClockIcon from "@/public/icons/clock.svg";

const PurchaseSkeleton = () => {
  return (
    <div className="w-full px-5 h-[105px] items-center bg-grey rounded-2xl flex gap-10">
      <div className="flex gap-[15px] items-center">
        <ClockIcon className="w-[25px] h-[25px] fill-light-grey" />
        <li className="flex flex-col gap-[5px] w-[72px]">
          <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
          <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
        </li>
      </div>
      <li className="flex flex-col gap-1">
        <p className="text-light_grey">Сумма</p>
        <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light_grey">Название товара</p>
        <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
      </li>
      <li className="flex flex-col gap-1 w-[70px]">
        <p className="text-light_grey">Статус</p>
        <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
      </li>
    </div>
  );
};

export default PurchaseSkeleton;
