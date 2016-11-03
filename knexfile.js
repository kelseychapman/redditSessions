module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/g32RedditSessions',
    pool: {
      min: 1,
      max: 1
    }
  }
}
