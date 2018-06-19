module.exports = {
  host: process.env.RDS_HOST || 'localhost',
  user: process.env.RDS_USERNAME || 'root',
  database: process.env.RDS_DB_NAME || 'Review',
  port: process.env.RDS_PORT || 3007,
  password: process.env.RDS_PASSWORD,
};
