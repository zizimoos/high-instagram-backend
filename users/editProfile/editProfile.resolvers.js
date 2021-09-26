import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, userName, email, password: newPassword },
  { loggedInUser }
) => {
  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      userName,
      email,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });
  if (updatedUser.id) {
    return { ok: true };
  } else {
    return { ok: false, error: "could not update profile" };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
