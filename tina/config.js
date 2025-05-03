import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = "master";

export default defineConfig({
  branch,

  clientId: "c3b5e798-69d9-42c1-b6b5-104fb1ab4e31", // Get this from tina.io
  token: "11c822578b53ad2aa8a40e2cba517f6177c77b63", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "static", // Changed from "public" to "static" for Hugo
  },
  media: {
    tina: {
      mediaRoot: "images", // Added a specific media folder
      publicFolder: "static", // Changed from "public" to "static" for Hugo
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true, // tambahkan ini
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: false,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            required: false,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title
                ?.toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^a-z0-9-]/g, "")}`;
            },
          },
        },
      },
    ],
  },
});
