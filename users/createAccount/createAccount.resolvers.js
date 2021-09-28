import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });
        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          error: "Can't create account",
        };
      }
    },
  },
};
