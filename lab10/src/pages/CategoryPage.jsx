import { useState, useEffect } from 'react'
import '../App.css'

export function CategoryPage() {

    const [categorias, setCategorias] = useState([]);
    const [recuperado, setRecuperado] = useState(false);
    const [nuevaCategoria, setNuevaCategoria] = useState({
      nombre: '',
    });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [categoriaEditandoId, setCategoriaEditandoId] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/categoria');
          const data = await response.json();
          setCategorias(data);
          setRecuperado(true);
        } catch (error) {
          console.error('Error al recuperar datos:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleInputChange = (e) => {
        setNuevaCategoria({
        ...nuevaCategoria,
        [e.target.name]: e.target.value
      });
    };
  
    const handleCrearProducto = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categoria/crear/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevaCategoria)
        });
  
        if (response.ok) {
          const nuevoProductoCreado = await response.json();
          setCategorias([...categorias, nuevoProductoCreado]);
          setNuevaCategoria({
            nombre: ''
          });
        } else {
          console.error('Error al crear el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    };
  
    const handleEliminarCategoria= async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/api/categoria/${id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
            setCategorias(categorias.filter((prod) => prod.id !== id));
        } else {
          console.error('Error al eliminar el producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    };
  
    const handleEditarCategoria = (id) => {
      setModoEdicion(true);
      setCategoriaEditandoId(id);
      const productToEdit = categorias.find((prod) => prod.id === id);
      if (productToEdit) {
        setNuevaCategoria({ ...productToEdit });
      }
    };
  
    const handleCancelarEdicion = () => {
      setModoEdicion(false);
      setCategoriaEditandoId(null);
      setNuevaCategoria({
        nombre: ''
      });
    };
  
    const handleActualizarDesdeFormulario = () => {
      handleActualizarCategoria(categoriaEditandoId, nuevaCategoria);
      handleCancelarEdicion();
    };
  
    const handleActualizarCategoria = async (id, updatedProduct) => {
      try {
        const response = await fetch(`http://localhost:8000/api/categoria/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        });
  
        if (response.ok) {
          const updatedProductData = await response.json();
          setCategorias(categorias.map((prod) => (prod.id === id ? updatedProductData : prod)));
        } else {
          console.error('Error al actualizar la categoría:', response.statusText);
        }
      } catch (error) {
        console.error('Error al actualizar la categoría:', error);
      }
    };
  
    const mostrarTablaCategoria = () => (
      <div className="container mt-3 text-center">
        <table className="table table-bordered table-primary">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>
                <button className="btn btn-primary mx-2" onClick={() => handleEditarCategoria(prod.id)}>
                  <span className="bi bi-pencil-fill"></span> Editar
                </button>
                <button className="btn btn-danger mx-2" onClick={() => handleEliminarCategoria(prod.id)}>
                  <span className="bi bi-trash-fill"></span> Eliminar
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
      </div>
    );
  

    return (
      <div className="container mt-5">
  
          <h1 className="mt-3 bg-primary text-white text-center p-3">CATEGORÍAS</h1>
    
          <div className="border p-4">
            <h2 className="mt-1">{modoEdicion ? 'Editar Categoria' : 'Crear Categoria'}</h2>
            <form className="row g-3 ">

              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nuevaCategoria.nombre}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
                <div className="col-18 mt-3">
                  <button type="button" className={`btn ${modoEdicion ? 'btn-warning' : 'btn-primary'}`} onClick={modoEdicion ? handleActualizarDesdeFormulario : handleCrearProducto}>
                    {modoEdicion ? 'Actualizar Categoria' : 'Crear Categoria'}
                  </button>
                  {modoEdicion && (
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelarEdicion}>
                      Cancelar Edición
                    </button>
                  )}
                </div>
            </form>
          </div>
          {recuperado ? mostrarTablaCategoria() : <div>Recuperando datos...</div>}
        </div>

    );
    
    
}