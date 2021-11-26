const db = {
    'producto': [
        {  nombre: 'Carlos', precio: '1111' },
    ],
};

async function list(tabla) {
    console.log('entra dummy list')
    return db[tabla] || [];
}

async function get(tabla, id) {
    console.log('entra precio id dummy')
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}
async function getPrecio(tabla, precio) {
    console.log('entra precio dummy')
    let col = await list(tabla);
    return col.filter(item => item.precio === precio)[0] || null;
}

async function upsert(tabla, data) {
 
    if (!db[tabla]) {
        db[tabla] = [];
    }

    db[tabla].push(data);

}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    getPrecio,
    get,
    upsert,
    remove,
    query,
};
