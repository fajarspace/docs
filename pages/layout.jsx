import Head from "next/head";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { metadata } from "@/theme.config";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <>
      <ThemeProvider>
        <div className={inter.className}>
          <article className="container prose md:prose">
            <Navbar />
            {children}
            <Footer />
          </article>
        </div>
      </ThemeProvider>
    </>
  );
}
