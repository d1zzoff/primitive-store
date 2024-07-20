import { IOrder } from "@/lib/actions/orders";
import { formatDate, formatTime } from "@/utils/date";
import { formatNumber } from "@/utils/numbers";
import { Status } from "@/utils/Status";
import ClockIcon from "@/public/icons/clock.svg";

const PurchaseItem = ({ item }: { item: IOrder }) => {
  return (
    <div className="w-full p-5 min-h-[105px] items-center bg-grey rounded-2xl flex flex-wrap gap-10 border-2 border-grey hover:border-light-grey transition-all duration-300">
      <div className="flex gap-[15px] items-center">
        <ClockIcon className="w-[25px] h-[25px] fill-light-grey flex-shrink-0" />
        <li className="flex flex-col gap-1">
          <h5 className="text-light-grey">{formatDate(item.created_at)}</h5>
          <h5 className="text-light-grey">{formatTime(item.created_at)}</h5>
        </li>
      </div>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Сумма</p>
        <h5>{formatNumber(item.price)} ₴</h5>
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Название товара</p>
        <h5>{item.name}</h5>
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Статус</p>
        <Status status={item.status} />
      </li>
    </div>
  );
};

export default PurchaseItem;
