const config = {
  host: 'localhost',
  username: process.env.PG_USER || 'butter',
  password: process.env.PG_PASSWORD || 'butter',
  database: process.env.PG_DATABASE || 'butterdb',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
}

export default config