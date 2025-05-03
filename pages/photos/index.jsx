import fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import RootLayout from "../layout";
import { metadata } from "@/theme.config";
import styles from "./page.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

// Number of photos to display per page
const photosPerPage = 5;

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("content/photos"));

  const photos = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("content/photos", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    const slug = filename.split(".")[0];
    return {
      frontmatter,
      slug,
      href: `/${slug}`,
    };
  });

  return {
    props: {
      photos,
    },
  };
};

const Photos = ({ photos }) => {
  const pageTitle = `${metadata.title} - Photos`;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(photos.length / photosPerPage);

  // Function to get a slice of the photos for the current page
  const getCurrentPagePhotos = () => {
    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    return photos.slice(startIndex, endIndex);
  };

  return (
    <>
      <RootLayout>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <h1>Photos</h1>
        {getCurrentPagePhotos().map((photo, index) => (
          <div key={index}>
            <img
              className={styles.photo}
              alt={photo.frontmatter.title}
              aria-hidden="true"
              src={photo.frontmatter.photo}
            />
            <p>{photo.frontmatter.description}</p>
            <p>
              <a target="_blank" rel="noopener" href={photo.frontmatter.photo}>
                Full screen &#8599;
              </a>
            </p>
          </div>
        ))}

        {/* Pagination buttons */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageButton} ${
                i + 1 === currentPage ? styles.activePage : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <hr />
      </RootLayout>
    </>
  );
};

export default Photos;
