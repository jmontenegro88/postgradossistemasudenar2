const environment = {
  production: process.env.NODE_ENV === 'production',
  sharedSchema: process.env.DB_SHARED_SCHEMA || 'public',
  evento: process.env.EVENTO || String(new Date().getFullYear()),
}

module.exports = environment
