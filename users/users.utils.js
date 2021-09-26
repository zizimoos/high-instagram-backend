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

// export const protectedResolver =
//   (ourResolver) => (root, args, context, info) => {
//     if (!context.loggedInUser) {
//       return {
//         ok: false,
//         error: "Please log in to perform this action.",
//       };
//     }
//     return ourResolver(root, args, context, info);
//   };

export const protectedResolver = (ourResolver) => {
  return (root, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "Please log in to perform this action." };
    }
    return ourResolver(root, args, context, info);
  };
};
