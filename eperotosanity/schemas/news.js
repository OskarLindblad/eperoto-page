/* eslint-disable import/no-anonymous-default-export */
export default {
  name: "news",
  title: "News",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "teamMember",
      title: "TeamMember",
      type: "reference",
      to: { type: "teamMember" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],

  preview: {
    select: {
      title: "title",
      teamMember: "teamMember.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { teamMember } = selection;
      return Object.assign({}, selection, {
        subtitle: teamMember && `by ${teamMember}`,
      });
    },
  },
};
