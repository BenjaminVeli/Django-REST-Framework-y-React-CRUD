import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { CategoryPage } from './pages/CategoryPage'
import { ProductPage } from './pages/ProductPage'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/productos" />} />
          <Route path='/productos' element={<ProductPage/>} />
          <Route path='/categorias' element={<CategoryPage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App