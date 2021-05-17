/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "collaborator",
  title: "Collaborator",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "link",
      title: "Link",
      type: "url",
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
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
