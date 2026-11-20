export function signupErrorMessage(reason: unknown, networkError: string) {
  if (
    reason instanceof TypeError ||
    (reason instanceof Error && reason.name === "AuthRetryableFetchError")
  ) {
    return networkError;
  }

  return reason instanceof Error ? reason.message : networkError;
}
