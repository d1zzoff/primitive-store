import Footer from "../footer/Footers";
import Header from "../header/Header";

const BaseLayout = ({ children }: { children: any }) => {
  return (
    <main>
      <Header />
      <div className="max-w-[1120px] mx-auto w-full min-h-screen mt-[134px] mb-[100px]">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default BaseLayout;
