import { Client, ClientConfig } from "pg";
import { DB_CONFIG } from "../../config/server.config";

const client = new Client({
  user: DB_CONFIG.USER,
  host: DB_CONFIG.HOST as string,
  database: DB_CONFIG.DB_NAME,
  password: DB_CONFIG.PASSWORD,
  port: DB_CONFIG.PORT as unknown as number,
} as ClientConfig);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}
connect();
export default client;
