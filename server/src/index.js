/* eslint-disable no-console */
const {app, server} = require("./app")

app.listen(app.get("PORT"), () => {
  console.log(
    `Server in listening at https://rtmerqrm.manus.space:${app.get("PORT")}`
  )
})

server.listen(8800, () => {
  console.log("Server in socket ")
})
