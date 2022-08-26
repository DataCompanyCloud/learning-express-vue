import sql from './db'

const testarSql = async () => {
    const ret = await sql`SELECT * FROM login WHERE login = 'leonardo';`
    console.log(ret)
}

testarSql()
