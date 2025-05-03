import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = "master";

export default defineConfig({
  branch,

  clientId: "7a1a2a3b-d5d6-466a-9e59-9a2fb84a4a89", // Get this from tina.io
  token: "68d5bb6390569393618ecd63c0193918b0345744", // Get this from tina.io

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
            required: false,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: false, // tambahkan ini
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
            required: false,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: false,
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
