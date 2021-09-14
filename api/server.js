const start = async () => {
  const app = await require('./src/app')({
    logger: true
  })
  try {
    await app.listen(app.config.PORT, '0.0.0.0')
    console.log(`server running in port ${app.config.PORT}`)
  } catch (err) {
    console.log(err)
    // app.log.error(err)
    process.exit(1)
  }
}

start()
