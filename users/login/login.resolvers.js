import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
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
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
