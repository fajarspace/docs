import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch: branch,
  clientId: "c3b5e798-69d9-42c1-b6b5-104fb1ab4e31", // Get this from tina.io
  token: "11c822578b53ad2aa8a40e2cba517f6177c77b63", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "boolean", // Tambahkan field boolean untuk draft
            name: "draft",
            label: "Draft",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date", // Date field
            label: "Date",
          },
          {
            type: "string",
            name: "description", // Description field
            label: "Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "image", // Featured Image field
            name: "featured_image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "author", // Author field
            label: "Author",
          },
        ],
        ui: {
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
  search: {
    tina: {
      indexerToken: "ff0a5292ae527c9c9f69bbbc5e26c26a3c0b025b",
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
