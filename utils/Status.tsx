import clsx from "clsx";

export const Status = ({ status }: { status: string }) => {
  function getStatus() {
    switch (status) {
      case "pending":
        return "Ожидание";
      case "accepted":
        return "Принято";
      case "rejected":
        return "Отклонено";
    }
  }

  return (
    <h5
      className={clsx({
        "text-yellow": status === "pending",
        "text-green": status === "accepted",
        "text-red": status === "rejected",
      })}
    >
      {getStatus()}
    </h5>
  );
};
