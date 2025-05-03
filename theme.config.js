// theme.config.js
export const metadata = {
  title: "Fajar A",
  favicon: "./static/images/favicon.ico",
  description:
    "Temukan Tulisan / baca blog dev, kamu juga bisa mendengarkan Podcast",
  image: "https://i.ibb.co/DCwqZCM/typewriter.jpg", // URL gambar untuk digunakan ketika dibagikan di media sosial
  url: "https://fajarr.space",
  twitter_site: "@fajaragngn",
};

export const content = {
  title: "halo 👋",
  intro: `Saya Fajar Agung. Suka ngoding yang gak jelas, Sedikit bicara banyak
    mikir (bukan aksi).`,
};

export const components = [
  {
    type: "navbar",
    title: "About",
    url: "/",
  },
  {
    type: "navbar",
    title: "Photos",
    url: "/photos",
  },
  {
    type: "navbar",
    title: "Posts",
    url: "/posts",
  },
  {
    type: "footer",
    name: "© stuff-blog",
    year: new Date().getFullYear(),
  },
  {
    type: "footer",
    social: "GitHub",
    url: "https://github.com/fajarspace",
  },
  {
    type: "footer",
    social: "Instagram",
    url: "https://instagram.com/fajar.agngn",
  },
  // anda dapat menambah media sosial lainnya
];
