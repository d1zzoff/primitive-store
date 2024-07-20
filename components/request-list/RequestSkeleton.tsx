import ClockIcon from "@/public/icons/clock.svg";
import Button from "../ui/Button";

const RequestSkeleton = () => {
  return (
    <div className="w-full p-5 min-h-[105px] items-center bg-grey rounded-2xl flex flex-wrap gap-10 border-2 border-grey hover:border-light-grey transition-all duration-300">
      <div className="flex gap-[15px] items-center">
        <ClockIcon className="w-[25px] h-[25px] fill-light-grey" />
        <li className="flex flex-col gap-[5px] w-[72px]">
          <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
          <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
        </li>
      </div>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Сумма</p>
        <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Telegram</p>
        <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Название товара</p>
        <div className="rounded-full w-full bg-dark-grey animate-pulse h-5" />
      </li>
      <Button className="ml-auto" click={() => {}}>
        Принять
      </Button>
    </div>
  );
};

export default RequestSkeleton;
