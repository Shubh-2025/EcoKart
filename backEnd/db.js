import pkg from "pg";
// dotenv import
// dotenv config

const { Pool } = pkg;
const pool = new Pool ({
    connectionString :"postgresql://postgres.jhwyjifvojriwvdoyinp:ShubhranilSupabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres", //supabase key
    max : 100,
});
export default pool;