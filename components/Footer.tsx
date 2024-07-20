import Logo from "@/components/ui/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-[120px] bg-grey">
      <div className="w-[calc(100%-40px)] max-w-[1160px] mx-auto w-full h-full flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-[30px]">
          <Link
            href={"https://t.me/d1zztg"}
            target="_blank"
            className="text-light text-sm hidden hover:text-accent hover:underline sm:block"
          >
            Наш Telegram
          </Link>
          <Link
            href={"https://t.me/d1zztg"}
            target="_blank"
            className="text-light text-sm hover:text-accent hover:underline"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
