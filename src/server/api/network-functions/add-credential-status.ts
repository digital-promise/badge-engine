import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
require("dotenv").config(); // needs to be used this way for jest testing
import logger from "shared/utils/logger/createLogger";

export async function addCredentialStatus(credential: unknown) {
  const url = process.env.STATUS_SERVICE_URL;

  if (!url) {
    logger.error('Invalid/Missing environment variable: "STATUS_SERVICE_URL"');

    throw new Error(
      'Invalid/Missing environment variable: "STATUS_SERVICE_URL"',
    );
  }

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  await axios
    .post(url, credential, options)
    .then(function (response) {
      console.log("Status service response: ", response);
      logger.info("Status service response: ", response);
      return response;
    })
    .catch(function (error) {
      console.log("Error in status service request: ", error);
      logger.error("Error in status service request: ", error);
      throw error;
    });
}
