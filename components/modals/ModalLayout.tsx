import { FC, MouseEvent, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import clsx from "clsx";

interface ModalLayoutProps {
  children: any;
  isOpen: boolean;
  onClose: () => void;
  buttons: IButton[];
  error?: string;
}

interface IButton {
  text: string;
  click: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ModalLayout: FC<ModalLayoutProps> = ({
  children,
  isOpen,
  buttons,
  onClose,
  error,
}) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  return (
    <>
      {isOpen && (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center z-[90]">
          <div
            className={clsx(
              "w-full h-full bg-dark absolute top-0 left-0 z-[80]",
              {
                "animate-backgroundClose": closing,
                "animate-background": !closing,
              }
            )}
            onClick={handleClose}
          />
          <div
            className={clsx(
              "relative bg-grey rounded-2xl p-20 z-[90] p-[30px] flex flex-col gap-[30px] items-start w-[calc(100%-40px)] max-w-[500px] max-h-[450px] overflow-auto sm:max-h-none",
              {
                "animate-modal": !closing,
                "animate-modalClose": closing,
              }
            )}
          >
            {children}
            <div className="flex flex-col gap-[15px] w-full">
              {error && <p className="text-red">{error}</p>}
              <div className="flex gap-[10px] items-center w-full">
                {buttons && (
                  <Button
                    click={buttons[0].click}
                    variant={"borderAccent"}
                    size={"full"}
                  >
                    {buttons[0].text}
                  </Button>
                )}
                {buttons && buttons.length > 1 && (
                  <Button click={buttons[1].click} size={"full"}>
                    {buttons[1].text}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLayout;
