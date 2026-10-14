const API_URL = "https://fakestoreapi.com";

const [,, method, resource, ...rest] = process.argv;


// FUNCIÓN PARA LISTAR LOS PRODUCTOS
async function listarProductos(){
    
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    console.log(data);

}

// FUNCIÓN PARA OBTENER DATA DE PRODUCTO
async function obtenerProductoPorId(id){
    
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    console.log(data);

}

// FUNCIÓN PARA CARGAR PRODUCTO
async function crearProducto(title, price, category){

    const res = await fetch(`${API_URL}/products`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({title, price: parseFloat(price), category }),
    });
    const data = await res.json();

    console.log("Producto agregado:")
    console.log(data);

}

// FUNCIÓN PARA DELETEAR PRODUCTO
async function eliminarProducto(id){

    const res = await fetch(`${API_URL}/products/${id}`, {method: "DELETE"});
    const data = await res.json();
    console.log("Producto borrado:")
    console.log(data);

}

async function main() {
  
  const [recurso, id] = (resource ?? '').split('/');

  if (method === 'GET' && recurso === 'products' && !id) {
    await listarProductos();
  } else if (method === 'GET' && recurso === 'products' && id) {
    await obtenerProductoPorId(id);
  } else if (method === 'POST' && recurso === 'products') {
    const [title, price, category] = rest;
    await crearProducto(title, price, category);
  } else if (method === 'DELETE' && recurso === 'products' && id) {
    await eliminarProducto(id);
  } else {
    console.log("Comando no reconocido.");
  }
}


main().catch(console.error);