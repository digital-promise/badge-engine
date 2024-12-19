import type { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import type { AppRouter } from "~/server/api/root";

type TRPCErrorOptions = {
  message?: string;
  code: TRPC_ERROR_CODE_KEY;
  cause?: unknown;
};

const throwPrismaErrorAsTRPCError = (e: unknown): never => {
  const opts: TRPCErrorOptions = {
    code: "INTERNAL_SERVER_ERROR",
    cause: e,
    message: "Database error occurred",
  };

  const error = e as PrismaClientKnownRequestError;
  switch (error.code) {
    case "P2023":
      opts.message = "Iconsistent column data";
      break;
    case "P2024":
      opts.message = "Database timeout";
      break;
    case "P2025":
      (opts.code = "NOT_FOUND"), (opts.message = "Record not found");
      break;
  }

  const trpcError = new TRPCError(opts);

  throw trpcError;
};

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export { throwPrismaErrorAsTRPCError };
