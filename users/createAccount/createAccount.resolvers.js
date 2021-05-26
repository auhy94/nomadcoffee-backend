import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      {
        username,
        email,
        name,
        password,
        location = null,
        avatarURL = null,
        githubUsername = null,
      }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("❌ This username/email is already taken");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
          data: {
            username,
            email,
            name,
            password: uglyPassword,
            location,
            avatarURL,
            githubUsername,
          },
        });
        if (user.id) {
          ok: true;
        } else throw new Error("error");
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};
