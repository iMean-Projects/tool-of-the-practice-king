import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["client", "api", "shared", "root", "ci", "docs"]],
    "subject-max-length": [2, "always", 72],
  },
};

export default config;
