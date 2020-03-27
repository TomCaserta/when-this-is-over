module.exports = {

  "app": {
    "name": process.env.APP_NAME || "when-this-is-over",
  },

  "server": {
    "host": process.env.SERVER_HOST || "localhost",
    "port": process.env.SERVER_PORT || 3001,
  },

  "db": {
    "mongo": {
      "url": process.env.DB_MONGO_URL || "mongodb://localhost:27017/wtio",
      "user": process.env.DB_MONGO_USER || "root",
      "pass": process.env.DB_MONGO_PASS || "",
    }
  },

  "auth": {
    "secret": process.env.AUTH_SECRET || "secret",
    "expire": process.env.AUTH_EXPIRE || "1h",
  },

  "hash": {
    "rounds": process.env.HASH_ROUNDS || 10,
  }

};
