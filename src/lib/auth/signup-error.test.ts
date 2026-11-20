import { describe, expect, it } from "vitest";
import { signupErrorMessage } from "./signup-error";

describe("signupErrorMessage", () => {
  it("uses the localized message for rejected fetches", () => {
    const retryableFetchError = Object.assign(new Error("Failed to fetch"), {
      name: "AuthRetryableFetchError",
    });

    expect(signupErrorMessage(retryableFetchError, "Check your connection")).toBe(
      "Check your connection",
    );
    expect(signupErrorMessage(new TypeError("Failed to fetch"), "Check your connection")).toBe(
      "Check your connection",
    );
  });

  it("preserves ordinary Supabase error messages", () => {
    expect(signupErrorMessage(new Error("User already registered"), "Check your connection")).toBe(
      "User already registered",
    );
  });
});
