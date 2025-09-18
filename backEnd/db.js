import pkg from "pg";
// dotenv import
import dotenv from dotenv;
// dotenv config
dotenv.config();

const { Pool } = pkg;
const pool = new Pool ({
    connectionString :process.env.SUPABASE_URI, //supabase key
    max : 100,
});
export default pool;