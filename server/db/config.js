const assert = require('assert')

assert(
  process.env.DB_LOCAL_SCHEMA,
  'Application local schema not specified (DB_LOCAL_SCHEMA)'
)

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  params: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
      underscored: true,
      timestamps: false,
      schema: process.env.DB_LOCAL_SCHEMA,
    },
  },
}
