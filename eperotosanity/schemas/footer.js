/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "mail",
      title: "Mail",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "array",
      description: "Will convert the link into a logo",
      of: [
        {
          type: "string",
          options: {
            layout: "tags",
          },
        },
      ],
    },
  ],
  preview: {
    // Didn't work...
    select: {
      title: "name",
    },
  },
};
