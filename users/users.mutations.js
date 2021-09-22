import client from "../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      const existingUser = await client.user.findFirst({
        where: { OR: [{ userName }, { email }] },
      });
      //   HASH password
      const hashedPassword = await bcrypt.hash(password, 10);
      //   save and return the user
      const user = await client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });
      return user;
    },
  },
};
