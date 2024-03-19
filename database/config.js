import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true,
});

pool.query('SELECT NOW()' ,(err, res) => {
    res ? console.log(" : DB Connected", res.rows[0].now) : console.log({err});
})

export default pool;