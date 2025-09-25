import pkg from "pg";
// dotenv import
import dotenv from "dotenv";
// dotenv config
dotenv.config();

const { Pool } = pkg;
const pool = new Pool ({
    connectionString : "postgresql://postgres.dvcafhqgxpvmpzhjitee:ShubhranilSupabase@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
, //supabase key
    max : 100,
});
export default pool;