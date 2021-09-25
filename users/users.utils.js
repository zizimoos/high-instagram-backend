import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    console.log("getUser", token);
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("id", id);
    const user = await client.user.findUnique({ where: { id } });
    console.log("user", user);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
