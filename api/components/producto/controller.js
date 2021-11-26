// const {nanoid} = require('nanoid');
// const auth = require('../auth');

const producto = require('.');

const TABLA = 'producto';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        console.log('listado get')
        return store.list(TABLA);
        
    }

    function get(id) {
        console.log('get por ids')
        return store.get(TABLA, id);

    }

    function getRemove(id) {
        console.log('delete por ids')
        return store.remove(TABLA, id);

    }

    function getPrecio(precio) {
        console.log('get por precio-controller')
        return store.searchPrecio(TABLA, precio);

    }

    function getCategoria(categoria) {
        console.log('get por categoria-controller')
        return store.searchCategoria(TABLA, categoria);
    }
    
    async function upsert(body) {
        console.log('entra-upsert-controller')
        const producto = {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            cantidad: body.cantidad,
            categoria: body.categoria
        }
         console.log(body.nombre+ ' body')
        return store.upsert(TABLA, producto);
    }

  async function upDateProducto(body) {
        const producto = {
            id: body.id,
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            cantidad: body.cantidad,
            categoria: body.categoria
        }
        console.log('id-'+producto.id)
        return store.update(TABLA, producto, producto.id);
    }

    function follow(from, to) {
        console.log('2')
        return store.upsert(TABLA + '_follow', {
            producto_from: from,
            producto_to: to,
        });
    }

    async function following(producto) {
        console.log('1')
        const join = {}
        join[TABLA] = 'producto_to'; // { producto: 'producto_to' }
        const query = { producto_from: producto };
		
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,
        getRemove,
        upsert,
        upDateProducto,
        getPrecio,
        getCategoria,
        follow,
        following,
    };
}