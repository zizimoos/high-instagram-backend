import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const photoUpload = async (_, { file, caption }, { loggedInUser }) => {
  let hashtagObjs = [];
  if (caption) {
    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
    hashtagObjs = hashtags.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    }));
  }
  return client.photo.create({
    data: {
      file,
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(hashtagObjs.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagObjs,
        },
      }),
    },
  });
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(photoUpload),
  },
};
