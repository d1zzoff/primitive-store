import ClockIcon from "@/public/icons/clock.svg";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { formatNumber } from "@/app/utils/numbers";
import { formatDate, formatTime } from "@/app/utils/date";
import { IOrder } from "@/app/lib/actions/orders";

const RequestItem = ({ item }: { item: IOrder }) => {
  return (
    <div className="w-full px-5 h-[105px] items-center bg-grey rounded-2xl flex gap-10">
      <div className="flex gap-[15px] items-center">
        <ClockIcon className="w-[25px] h-[25px] fill-light-grey" />
        <li className="flex flex-col gap-1">
          <h5 className="text-light_grey">{formatDate(item.created_at)}</h5>
          <h5 className="text-light_grey">{formatTime(item.created_at)}</h5>
        </li>
      </div>
      <li className="flex flex-col gap-1">
        <p className="text-light_grey">Сумма</p>
        <h5>{formatNumber(item.price)} ₴</h5>
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Telegram</p>
        <Link
          href={"https://t.me/d1zztg"}
          target="_blank"
          className="text-accent cursor-pointer font-medium text-sm hover:underline"
        >
          @{item.telegram}
        </Link>
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light_grey">Название товара</p>
        <h5>{item.name}</h5>
      </li>
      <Button className="ml-auto" click={() => {}}>
        Принять
      </Button>
    </div>
  );
};

export default RequestItem;
