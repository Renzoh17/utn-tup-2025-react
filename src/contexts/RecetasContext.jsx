import { createContext, useContext, useEffect, useState } from "react";

// 1. Crear el Contexto
// El valor inicial es un objeto que refleja la estructura del valor que vamos a proveer
const RecetasContext = createContext({
    recetas: [],
    loading: true,
    error: null,
    // (Opcional) Si quieres añadir funciones para actualizar las recetas:
    // setRecetas: () => {} 
});

// 2. Crear el Componente Provider
export const RecetasProvider = ({ children }) => {
    const [recetas, setRecetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecetas = async () => {
            // Reiniciar estados antes de la carga (aunque useEffect solo corre una vez al inicio)
            setLoading(true);
            setError(null);

            try {
                // 💡 NOTA IMPORTANTE sobre la ruta: 
                // Asume que tu archivo 'recetas.json' está en la carpeta 'public'
                // para que el navegador pueda acceder a él. Si está en 'src/data',
                // es mejor importar el JSON directamente (ver comentario alternativo abajo).
                const response = await fetch('/TrabajoPractico/EJEMPLO-recetas.json'); 
                
                if (!response.ok) {
                    throw new Error(`Error al cargar las recetas: ${response.status}`);
                }
                
                const data = await response.json();
                setRecetas(data);
            } catch (err) {
                console.error("Error en la carga de recetas:", err);
                setError(err.message || "Ha ocurrido un error desconocido al cargar las recetas.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecetas();
    }, []); // El array vacío asegura que se ejecute solo al montar el componente.

    // 3. Objeto de valor a pasar al Contexto
    const contextValue = {
        recetas,
        loading,
        error,
        // Opcional: si quieres exponer el setter
        // setRecetas 
    };

    return (
        <RecetasContext.Provider value={contextValue}>
            {children}
        </RecetasContext.Provider>
    );
};

// 4. Crear el Hook personalizado para consumir el Contexto
export const useRecetas = () => {
    const context = useContext(RecetasContext);
    
    // Opcional: una comprobación para asegurar que el hook se usa dentro del Provider
    if (context === undefined || context === null) {
        throw new Error('useRecetas debe ser usado dentro de un RecetasProvider');
    }
    
    return context;
};

/*
// --- Comentario Alternativo para datos estáticos en 'src' ---
// Si tu archivo 'recetas.json' está en 'src/data/recetas.json' (y lo quieres cargar sin fetch):
import recetasData from '../data/recetas.json'; 

useEffect(() => {
    setRecetas(recetasData);
    setLoading(false);
}, []);

*/