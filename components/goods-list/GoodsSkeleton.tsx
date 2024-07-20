import Button from "@/components/ui/Button";

const GoodsSkeleton = () => {
  return (
    <div className="p-5 rounded-2xl bg-grey flex flex-col gap-[30px] w-full sm:max-w-[315px] border-2 border-grey hover:border-light-grey transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="rounded-full w-20 h-20 bg-black flex-shrink-0 relative animate-pulse"></div>
        <div className="flex flex-col gap-1 items-start w-full">
          <div className="h-5 w-full rounded-full bg-dark-grey animate-pulse"></div>
          <div className="h-5 w-full rounded-full bg-dark-grey animate-pulse"></div>
          <div className="h-5 w-full rounded-full bg-dark-grey animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <Button click={() => {}} size={"full"} variant={"borderAccent"}>
          Изменить
        </Button>
        <Button click={() => {}} size={"full"} variant={"borderRed"}>
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default GoodsSkeleton;
