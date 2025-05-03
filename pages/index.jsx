import React from "react";
import RootLayout from "./layout";
import { content, metadata } from "@/theme.config";
import Head from "next/head";
import bukuCss from "../public/yaha.jpg";
import Image from "next/image";

const index = () => {
  return (
    <RootLayout>
      <Head>
        <meta property="og:image" content={metadata.image} />
      </Head>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      <p>
        <a
          target="_blank"
          rel="noopener"
          href="https://vercel.com/new/git/external?repository-url=https://github.com/vercel-solutions/nextjs-portfolio-starter&amp;project-name=portfolio&amp;repository-name=portfolio"
        ></a>
      </p>
      <hr />
      <Image src={bukuCss} width={300} height={300} alt="Buku css" />
      <p>
        Buku terbaru saya,{" "}
        <a
          href="https://api.whatsapp.com/send?phone=6289637524919&text=Hai%2C%20saya%20mau%20pesan%20buku%20Mudah%20membuat%20framework%20dari%20Nol"
          target="_blank"
        >
          Pesan disini
        </a>
      </p>
    </RootLayout>
  );
};

export default index;
