"use client";

import ModalLayout from "@/components/modals/ModalLayout";
import useWarningModal from "@/lib/hooks/useWarningModal";
import WarningIcon from "@/public/icons/error.svg";
import { getActionHandler } from "@/utils/actionHandlers";

const WarningModal = () => {
  const { isOpen, closeWarningModal, content, actionId } = useWarningModal();

  const handleSubmit = () => {
    const func = getActionHandler(actionId || "");

    if (func) {
      func();
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeWarningModal}
      buttons={[
        { text: "Закрыть", click: closeWarningModal },
        { text: "Подтвердить", click: handleSubmit },
      ]}
    >
      <div className="flex flex-col items-center w-full gap-[20px] text-center">
        <WarningIcon className="w-[120px] h-[120px] fill-red" />
        <h2>{content}</h2>
      </div>
    </ModalLayout>
  );
};

export default WarningModal;
