import { FC, MouseEvent } from "react";
import Button from "../ui/Button";

interface ModalLayoutProps {
  children: any;
  isOpen: boolean;
  onClose: () => void;
  buttons: IButton[];
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
}) => {
  return (
    <>
      {isOpen && (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center z-50">
          <div
            className="w-full h-full bg-black absolute top-0 left-0 z-40 animate-background"
            onClick={onClose}
          />
          <div className="relative bg-grey rounded-2xl p-20 z-50 p-[30px] flex flex-col gap-[30px] items-start w-[500px] animate-modal">
            {children}
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
      )}
    </>
  );
};

export default ModalLayout;
