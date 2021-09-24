export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        console.log("hi");
      } catch (error) {
        throw new Error("what's going on");
      }
    },
  },
};
