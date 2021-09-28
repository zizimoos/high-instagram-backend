import bcrypt from "bcrypt";
import client from "../../client";
import { createWriteStream } from "fs";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, userName, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar[0];
    const saveFilename = `${loggedInUser.id}-${Date.now()}-${filename}}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + saveFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${saveFilename}`;
  }
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
      bio,
      ...(avatarUrl && { avatar: avatarUrl }),
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
