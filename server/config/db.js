module.exports = {
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/wtio',
    username: process.env.MONGO_USER || 'root',
    password: process.env.MONGO_PASS || '',
  }
};
