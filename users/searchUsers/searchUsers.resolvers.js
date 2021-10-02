import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const countNum = 3;

      if (!page) {
        page = 1;
      }

      const searchedUsers = await client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: countNum,
        skip: (page - 1) * countNum,
      });

      const countSearchedUsers = await client.user.count({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });

      return {
        searchedUsers,
        totalPages: Math.ceil(countSearchedUsers / countNum),
      };
    },
  },
};
