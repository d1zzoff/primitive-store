import clsx from "clsx";

export const Status = ({ status }: { status: string }) => {
  const getStatus = () => {
    switch (status) {
      case "pending":
        return "Ожидание";
      case "accepted":
        return "Принято";
      case "rejected":
        return "Отклонено";
    }
  };

  return (
    <h5
      className={clsx({
        "text-yellow": status === "pending",
        "text-red": status === "rejected",
        "text-green": status === "accepted",
      })}
    >
      {getStatus()}
    </h5>
  );
};
