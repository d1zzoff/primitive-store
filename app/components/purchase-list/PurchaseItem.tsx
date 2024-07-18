import { IOrder } from "@/app/lib/actions/orders";
import { formatDate, formatTime } from "@/app/utils/date";
import { formatNumber } from "@/app/utils/numbers";
import { Status } from "@/app/utils/Status";
import ClockIcon from "@/public/icons/clock.svg";

const PurchaseItem = ({ item }: { item: IOrder }) => {
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
        <p className="text-light_grey">Название товара</p>
        <h5>{item.name}</h5>
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light_grey">Статус</p>
        <Status status={item.status} />
      </li>
    </div>
  );
};

export default PurchaseItem;
