/* eslint-disable no-console */
const {app, server} = require("./app")

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`🚀 Server (w/ socket.io) running at http://localhost:${PORT}`)
})
