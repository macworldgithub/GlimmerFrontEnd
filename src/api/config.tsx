export const development = "http://localhost:3000";
export const production = "https://www.api.glimmer.com.pk";

// Assign a value to `curr_env`, not a type
const curr_env: "Prod" | "DEV" = "DEV";

export const BACKEND_URL =
  //@ts-ignore
curr_env === "DEV" ? development : production;
// export const BACKEND_URL = "http://localhost:3000";
