import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import RecetaPage from './pages/receta'
import ObjectsPage from './pages/objects'
import RecetasPage from './pages/RecetasPage'
import RecetasDetailPage from './pages/RecetaDetailPage'

function App() {
  return (
    <Router>
      <div>
        <nav style={{ 
          padding: '20px', 
          borderBottom: '1px solid #ccc',
          marginBottom: '20px',
          backgroundColor: '#f5f5f5'
        }}>
          <Link 
            to="/objects" 
            style={{ 
              marginRight: '20px', 
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '4px'
            }}
          >
            Objects
          </Link>
          <Link 
            to="/receta"
            style={{ 
              marginRight: '20px',
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              borderRadius: '4px'
            }}
          >
            Receta
          </Link>
          <Link 
            to="/recetas"
            style={{ 
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '4px'
            }}
          >
          Recetas  
          </Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ObjectsPage />} />
          <Route path="/objects" element={<ObjectsPage />} />
          <Route path="/receta" element={<RecetaPage />} />
          <Route path="/recetas" element={<RecetasPage/>}/>
          <Route path="/recetas/:id" element={<RecetasDetailPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
