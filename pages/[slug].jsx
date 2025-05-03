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

const PostPage = ({
  frontMatter: { title, date, description, featured_image, tags, author },
  mdxSource,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
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
            {author},{" "}
            <time>
              {new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </time>{" "}
            &bull; <span className="tag">{tags}</span>
          </div>
          <Link href="#" className="meta-back" onClick={handleBackClick}>
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
      slug: filename.replace(/\.mdx?$/, ""),
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

  for (const ext of supportedExtensions) {
    try {
      markdownWithMeta = fs.readFileSync(
        path.join("content/posts", slug + ext),
        "utf-8"
      );
      break;
    } catch (e) {}
  }

  if (!markdownWithMeta) {
    return {
      notFound: true,
    };
  }

  const { data: frontMatter, content } = matter(markdownWithMeta);

  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: {
        ...frontMatter,
        date: new Date(frontMatter.date).toISOString(), // ubah ke string
      },
      slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;
