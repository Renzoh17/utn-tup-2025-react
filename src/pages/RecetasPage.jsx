
import { Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import RecetaCard from '../components/recetas/RecetaCard';
import { RecetasProvider, useRecetas } from '../contexts/RecetasContext';
import { useNavigate } from 'react-router-dom'; 

function RecetasContent() {
    const { recetas, loading, error } = useRecetas(); 
    const navigate = useNavigate();


    const handleVerReceta = (id) => {
      navigate(`/recetas/${id}`);
    };

    // Lógica de visualización (Loading, Error, Lista)
    if (loading) {
      return (
        <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Cargando recetas...</Typography>
        </Container>
      );
    }

    if (error) {
      return (
        <Container sx={{ py: 4 }}>
          <Alert severity="error">Error: {error}</Alert>
        </Container>
      );
    }
    
    if (recetas.length === 0) {
        return (
          <Container sx={{ py: 4 }}>
              <Alert severity="info">No se encontraron recetas disponibles.</Alert>
          </Container>
        );
    }

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Nuestras Recetas
        </Typography>
        
        <Grid container spacing={4}>
          {recetas.map((receta) => (
            <Grid key={receta.id} size={{xs: 12, sm:6, md:4, lg:3}}>
              <RecetaCard 
                receta={receta} 
                onVerReceta={handleVerReceta} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
}

// 2. Componente principal que EXPORTA y ENVUELVE al contenido
function RecetasPage() {
    // RecetasPage ahora solo se encarga de proporcionar el contexto
    return (
        <RecetasProvider>
            {/* RecetasContent (que usa useRecetas) es el hijo del Provider */}
            <RecetasContent /> 
        </RecetasProvider>
    );
}

export default RecetasPage;