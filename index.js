
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const pool = require('db/db')

const app = new Koa()
app.use(bodyParser())
app.use(cors())

app.use(async ctx => {
  const data = await ctx.request.body
  const item = await createLog(data.name, data.body, data.signature)
  ctx.body = `new Log created`
})

async function createLog(name,body,signature) {
  try {
    const itemData = await pool.query(`
      INSERT INTO logs(name,body,signature) 
      VALUES ("${name}", "${body}", "${signature}");
    `)
    return itemData
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()