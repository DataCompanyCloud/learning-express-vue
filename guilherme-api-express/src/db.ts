import postgres from 'postgres';

const sql = postgres({ 
    host: 'localhost',
    port: 5432,
    database: 'bruno-teste',
    user: 'doadmin',
    password: 'data@DATA@2019',
})
export default sql