const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    console.log('list mysql')
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    console.log('entra mysql id')
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function remove(table, id) {
    console.log("Entrando a remove " + id)
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

async function insert(table, data) {
    console.log(table + 'insert')
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}
async function searchPrecio(table, precio) {
    console.log(table + 'insert SEARCH')
    console.log(precio + "precio")
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE precio=${precio}`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

async function searchCategoria(table, categoria) {
    console.log(table + 'insert SEARCHCATEGORIA')
    console.log(categoria + "categoria")
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE categoria='${categoria}'`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

async function update(table, data, id) {
    console.log('entra up mysql')
    console.log('entra up mysql' + id)
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], (err, result) => {
            if (err) return reject(err);
            console.log(err + 'error' + result)
            resolve(result);
        })
    })
}

function upsert(table, data) {
    if (data && data.id) {
        console.log(data + " " + data.id)
        console.log("entra1----")
        return u(table, data);
    } else {
        console.log(table + "tabla" + data.nombre + "----------nombre")
        return insert(table, data);
    }
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    searchPrecio,
    searchCategoria,
    remove,
    update,
    get,
    upsert,
    query
};