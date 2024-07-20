import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = ({ children }: { children: any }) => {
  return (
    <main>
      <Header />
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1160px] min-h-screen mt-[134px] mb-[100px]">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default BaseLayout;
