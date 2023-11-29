import { useState, useEffect } from 'react'
import '../App.css'

export function ProductPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [recuperado, setRecuperado] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    descripcion: '',
    precio: 0,
    categoria: {}
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await fetch('http://localhost:8000/api/producto');
        const productosData = await productosResponse.json();
        setProductos(productosData);

        const categoriasResponse = await fetch('http://localhost:8000/api/categoria');
        const categoriasData = await categoriasResponse.json();
        setCategorias(categoriasData);

        setRecuperado(true);
      } catch (error) {
        console.error('Error al recuperar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  const handleCrearProducto = async () => {
    try {
      const categoriaId = nuevoProducto.categoria.id;
  
      const nuevoProductoSinCategoria = {
        descripcion: nuevoProducto.descripcion,
        precio: nuevoProducto.precio,
        categoria: categoriaId,
      };
  
      const response = await fetch('http://localhost:8000/api/producto/crear/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProductoSinCategoria),
      });
  
      if (response.ok) {
        const nuevoProductoCreado = await response.json();
        setProductos([...productos, nuevoProductoCreado]);
        setNuevoProducto({
          descripcion: '',
          precio: 0,
          categoria: {},
        });
      } else {
        console.error('Error al crear el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/producto/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setProductos(productos.filter((prod) => prod.id !== id));
      } else {
        console.error('Error al eliminar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

const handleCancelarEdicion = () => {
  setModoEdicion(false);
  setProductoEditandoId(null);
  setNuevoProducto({
    descripcion: '',
    precio: 0,
    categoria: {},
  });
};



const handleEditarProducto = (id) => {
  setModoEdicion(true);
  setProductoEditandoId(id);
  const productToEdit = productos.find((prod) => prod.id === id);
  if (productToEdit) {
    setNuevoProducto({ ...productToEdit, categoria: { id: productToEdit.categoria } });
  }
};

const handleActualizarForm = () => {
  const updatedProduct = {
    ...nuevoProducto,
    categoria: nuevoProducto.categoria.id, 
  };
  handleActualizarProducto(productoEditandoId, updatedProduct);
};

const handleActualizarProducto = async (id, updatedProduct) => {
  try {
    const response = await fetch(`http://localhost:8000/api/producto/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      const updatedProductData = await response.json();
      setProductos((prevProductos) =>
        prevProductos.map((prod) => (prod.id === id ? updatedProductData : prod))
      );
      handleCancelarEdicion();
    } else {
      console.error('Error al actualizar el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};

  const mostrarTablaProductos = () => (
    <div className="container mt-4">
      <table className="table table-bordered table-primary">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.precio}</td>
              <td>{obtenerNombreCategoria(prod.categoria)}</td>
              <td>
                <button className="btn btn-primary mx-2" onClick={() => handleEditarProducto(prod.id)}>
                  <span className="bi bi-pencil-fill"></span> Editar
                </button>
                <button className="btn btn-danger mx-2" onClick={() => handleEliminarProducto(prod.id)}>
                  <span className="bi bi-trash-fill"></span> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const obtenerNombreCategoria = (idCategoria) => {
    const categoriaEncontrada = categorias.find((categoria) => categoria.id === idCategoria);
    return categoriaEncontrada ? categoriaEncontrada.nombre : 'Sin categoría';
  };

  return (
    <div className="container mt-5">
      <h1 className="mt-3 bg-primary text-white text-center p-3">PRODUCTOS</h1>

      <div className="border p-4">
        <h2 className="mt-3">{modoEdicion ? 'Editar Producto' : 'Crear Producto'}</h2>
        <form className="row g-3">
          <div className="col-md-3">
            <label htmlFor="descripcion" className="form-label my-3">Descripción:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={nuevoProducto.descripcion}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="precio" className="form-label my-3">Precio:</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={nuevoProducto.precio}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="categoria" className="form-label my-3">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              className="form-select"
              value={nuevoProducto.categoria.id || ''}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: { id: e.target.value } })}
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-12 mt-3">
            <button type="button" className="btn btn-primary" onClick={modoEdicion ? handleActualizarForm : handleCrearProducto}>
              {modoEdicion ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
            {modoEdicion && (
              <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelarEdicion}>
                Cancelar Edición
              </button> 
            )}
          </div>
        </form>
      </div>

      {recuperado ? mostrarTablaProductos() : <div>Recuperando datos...</div>}

      
    </div>
  );
}