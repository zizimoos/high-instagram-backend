import client from "../client";
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
        return user;
      } catch (error) {
        return error;
      }
    },
    login: async (_, { userName, password }) => {
      try {
        const user = await client.user.findFirst({
          where: { userName },
        });
        if (!user) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "password incorrect !",
          };
        } else {
          return {
            ok: true,
          };
        }
      } catch {}
    },
  },
};
