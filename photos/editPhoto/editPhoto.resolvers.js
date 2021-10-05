import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const editPhoto = async (_, { id, caption }, { loggedInUser }) => {
  const oldPhoto = await client.photo.findFirst({
    where: {
      id,
      userId: loggedInUser.id,
    },
    include: {
      hashtags: {
        select: {
          hashtag: true,
        },
      },
    },
  });
  if (!oldPhoto) {
    return {
      ok: false,
      error: "photo not found.",
    };
  } else {
    await client.photo.update({
      where: {
        id,
      },
      data: {
        caption,
        hashtags: {
          disconnect: oldPhoto.hashtags,
          connectOrCreate: processHashtags(caption),
        },
      },
    });
    return {
      ok: true,
      error: null,
    };
  }
};

export default {
  Mutation: {
    editPhoto: protectedResolver(editPhoto),
  },
};
