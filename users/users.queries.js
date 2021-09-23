import client from "../client";

export default {
  Query: {
    seeProfile: (_, { userName }) => {
      return client.user.findUnique({
        where: { userName },
      });
    },
  },
};
