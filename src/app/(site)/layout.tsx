import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <PreLoader />
        <>
          <Providers>
            <NextTopLoader
              color="#3C50E0"
              crawlSpeed={300}
              showSpinner={false}
              shadow="none"
            />
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </Providers>
          <ScrollToTop />
          <Footer />
        </>
      </body>
    </html>
  );
}
