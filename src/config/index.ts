import dotenv from "dotenv";
dotenv.config();

export const config = {
  TODOIST_API_TOKEN: process.env.TODOIST_API_TOKEN!,
  PORT: +(process.env.PORT || "3000"),
  VERSION: process.env.VERSION!,
};
