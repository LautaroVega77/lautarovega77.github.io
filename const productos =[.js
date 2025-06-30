const productos =[
    {id: 1, nombre: "Remera",precio: 3000,      categoria: "ropa", imagen:"remera.jpg"},
    {id: 2, nombre: "Gorra", precio: 1500,      categoria: "accesorios" , imagen: "gorra.jpg"},
    {id: 3, nombre: "Mochila", precio: 8000,    categoria: " accesorios" , imagen: "mochila.jpg"},
    {id: 4, nombre: "Zapatillas", precio: 6000, categoria: "calzado" , imagen:"zapatillas.jpg"},
    {id: 5, nombre: "Campera", precio: 3500,    categoria:    "ropa" , imagen:"campera.jpg"},
    {id: 6, nombre: "buzo", precio: 6000,    categoria:    "ropa" , imagen:"buzomoron.jpg"},
]

const container = document.getElementById('articulo');

productos.forEach(productos => {
    const div = document.createElement("div");
    
    div.className = 'card p-4 col-md-4 my-2';

    div.innerHTML =
    `<div class="card h-100"> 
                        <img src="${productos.imagen}"class="img-fluid d-block mx-auto "  style="width:50%; margin 0 auto; height:250px;">
                        <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title>${productos.nombre}</h5>
                        <h5 class="card-text>$${productos.precio}</p>
                        <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${productos.id})">
                        <i class="bi bi-gift-fill"></i>
                            Agregar al carrito
                            </button>
                        
                            </div>
                        </div>`


    container.appendChild(div);

  });

  let contadorCarrito= 0;
  let carrito= [];
  function agregarAlCarrito(idProducto){
    const producto = productos.find(p => p.id === idProducto);
    if(producto){ 
        contadorCarrito++;
        document.getElementById('contador').textContent = contadorCarrito;
        const productoEnCarrito = carrito.find(p=> p.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;

        } else {
            carrito.push({...producto, cantidad: 1});

        }
   alert(`¡${producto.nombre} agregado al carrito!`)     
    }
  }

  document.getElementById('verCarrito').addEventListener('click', function()
  {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.classList.toggle('d-none');
    actulizarCarrito();
  })

  const listaCarrito = document.getElementById("lista-carrito");
  const totalspan = document.getElementById("total");
  const contador = document.getElementById("contador");
  function actulizarCarrito()
  {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach(productos =>
    {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between lead";
        item.textContent = `${productos.nombre} x ${productos.cantidad}`;
        const precio = document.createElement("span");
        precio.textContent = `$${productos.precio * productos.cantidad}`;
        item.appendChild(precio);
        listaCarrito.appendChild(item);
        total += productos.precio * productos.cantidad;
    }
    );
    totalspan.textContent = total;
    contador.textContent = carrito.reduce ((sum, productos)=> sum + productos.cantidad,0);

  }
 
  function finalizarCompra()
  {
    if (carrito.length === 0)
    {
        alert("El carrito está vacio");
        return;
    }
    const total = carrito.reduce ((sum, productos) => sum + (productos.precio * productos.cantidad), 0);
    
    let mensaje  = "¡Hola! Quiero realizar la siguiente compra:%0A%0A";
    carrito.forEach(productos => 
    {
        mensaje += `-${productos.nombre} x ${productos.cantidad}: ${productos.precio * productos.cantidad}%0A`;
    });
    mensaje += `%0ATotal: $${total}%0A%0A Y proceder con el pago y coordinar envio`;

    const telefono = "5491123353605";
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
    carrito = [];
    actualizarCarrito();
    document.getElementById('carrito').classList.add('d-none')
  }
