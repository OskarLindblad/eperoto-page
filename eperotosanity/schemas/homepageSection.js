/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "homepageSection",
  title: "HomepageSection",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      // Add to be able to reorder sections
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
    {
      name: "sectionType",
      title: "section type",
      type: "string",
      options: {
        list: [
          { value: "bigBackground", title: "Big Background" },
          { value: "oneBlock", title: "One Block" },
          { value: "separeBlocks", title: "Separe Blocks" },
          { value: "collaborators", title: "Collaborators" },
          { value: "news", title: "News" },
          { value: "whyNotYou", title: "Why Not You" },
          { value: "teamCarousel", title: "Team Carousel" },
        ],
      },
    },
    {
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      options: {
        list: [
          { value: "#914696", title: "Purple" },
          { value: "#2e394b", title: "Dark Blue" },
          { value: "#ffd778", title: "Golden" },
        ],
      },
    },
  ],

  preview: {
    select: {
      title: "caption",
      media: "image",
    },
  },
};
