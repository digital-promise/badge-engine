// STATUS: IN PROG

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const options = {
  method: "POST",
  url: "https://auth.emsicloud.com/connect/token",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  form: {
    // client_id: env.LIGHTCAST_CLIENT_ID,
    // client_secret: env.LIGHTCAST_SECRET,
    grant_type: "client_credentials",
    scope: "emsi_open",
  },
};

// // [x] Import env secrets for lightskills
// // [] Make successfully request for skills when this route is visited

// // [] Make it so that access token is secured on server start (instrumentation script)

// // [] If is visited and access token invalid, reauthenticate
//     // [] send user an array of skills to be rendered on front-end

const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export const skillsRouter = createTRPCRouter({
  index: publicProcedure.input(filterQuery).query(() => {
    const authUrl = "https://auth.emsicloud.com/connect/token";
    fetch(authUrl, options)
      .then((response) => response.blob())
      .catch((err) => console.error(err));
  }),
});
