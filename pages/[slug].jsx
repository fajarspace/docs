import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import RootLayout from "./layout";
import Link from "next/link";
import Head from "next/head";
import { metadata } from "@/theme.config";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";

const PostPage = ({
  frontMatter: { title, date, description, featured_image, tags, author },
  mdxSource,
}) => {
  const router = useRouter();

  // Function to handle the "Back" link click
  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
  };

  const pageTitle = `${metadata.title} - ${title}`;
  return (
    <>
      <RootLayout>
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:image" content={featured_image} />
          <meta name="twitter:card" content={featured_image} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={featured_image} />
          <title>{pageTitle}</title>
        </Head>
        <h1>{title}</h1>
        <div className="meta-line">
          <div className="meta">
            {author}, <time>{date}</time> &bull;
            <span className="tag">{tags}</span>
          </div>
          <Link href={"#"} className="meta-back" onClick={handleBackClick}>
            Back
          </Link>
        </div>
        <MDXRemote {...mdxSource} />
        <hr />
      </RootLayout>
    </>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("content/posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const supportedExtensions = [".md", ".mdx"];
  let markdownWithMeta = null;

  for (const extension of supportedExtensions) {
    try {
      markdownWithMeta = fs.readFileSync(
        path.join("content/posts", slug + extension),
        "utf-8"
      );
      break; // If we successfully read a file, exit the loop
    } catch (err) {
      // File not found, try the next extension
    }
  }

  if (!markdownWithMeta) {
    // Handle the case when neither .md nor .mdx files are found
    return {
      notFound: true,
    };
  }

  const { data: frontMatter, content } = matter(markdownWithMeta);

  // Menggunakan date-fns untuk memformat tanggal menjadi string dalam format tertentu
  const formattedDate = format(new Date(frontMatter.date), "dd MMM yyyy");

  // Use next-mdx-remote/serialize to convert Markdown/MDX content to mdxSource
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: {
        ...frontMatter,
        date: formattedDate, // Mengirimkan tanggal sebagai string yang sudah diformat
      },
      slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;
