import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, CircularProgress, Alert, Card, CardMedia, CardContent, Box, List, ListItem, ListItemText, Divider, Button, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// Importamos ambos, el Provider y el hook, desde el Contexto
import { RecetasProvider, useRecetas } from '../contexts/RecetasContext'; 

// --- 1. Componente que CONSUME el Contexto (Contenido real de la página) ---
function RecetaDetailContent() {
    
    // Obtener el ID de la URL
    const { id } = useParams();

    // Obtener los datos y estados del contexto (REQUIERE ESTAR DENTRO DEL PROVIDER)
    const { recetas, loading, error } = useRecetas(); 
    const navigate = useNavigate();

    // 1. Lógica para encontrar la receta específica
    const receta = recetas.find(r => r.id == id);

    // --- Módulos de Estado y Error del Contexto ---
    if (loading) {
        return (
            <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>Cargando detalles de la receta...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">Error al cargar la receta: {error}</Alert>
            </Container>
        );
    }
    
    // Si no se encuentra la receta después de la carga
    if (!receta) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="warning">Receta no encontrada (ID: {id}).</Alert>
                <Box sx={{ mt: 2 }}>
                    <Button 
                        variant="outlined" 
                        startIcon={<ChevronLeftIcon />} 
                        onClick={() => navigate('/recetas')}
                    >
                        Volver al Listado
                    </Button>
                </Box>
            </Container>
        );
    }

    // --- Funciones auxiliares ---
    const getDificultadColor = (dificultad) => {
        switch (dificultad.toLowerCase()) {
            case 'fácil': return 'success';
            case 'media': return 'warning';
            case 'difícil': return 'error';
            default: return 'default';
        }
    };
    
    // --- Renderizado del Contenido ---
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button 
                variant="outlined" 
                startIcon={<ChevronLeftIcon />} 
                onClick={() => navigate('/recetas')}
                sx={{ mb: 3 }}
            >
                Volver al Listado
            </Button>
            
            <Grid container spacing={4}>
                {/* Columna de Imagen y Título */}
                <Grid size={{xs: 12, md:6 }}>
                    <Card raised>
                        <CardMedia
                            component="img"
                            image={receta.imagen || 'https://via.placeholder.com/600x400?text=Imagen+No+Disponible'}
                            alt={receta.titulo}
                            sx={{ maxHeight: 450 }}
                        />
                        <CardContent>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {receta.titulo}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" paragraph>
                                {receta.descripcion || "Una deliciosa receta fácil de preparar y perfecta para cualquier ocasión."}
                            </Typography>
                            
                            <Divider sx={{ my: 2 }} />

                            {/* Información General */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                                <Chip 
                                    icon={<AccessTimeIcon />} 
                                    label={`Tiempo: ${receta.tiempoPreparacion}`} 
                                    variant="outlined" 
                                />
                                <Chip 
                                    icon={<FitnessCenterIcon />} 
                                    label={`Dificultad: ${receta.dificultad}`} 
                                    color={getDificultadColor(receta.dificultad)} 
                                    variant="filled"
                                />
                                <Chip 
                                    icon={<RestaurantIcon />} 
                                    label={`${receta.porciones} Porciones`} 
                                    variant="outlined"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Columna de Ingredientes y Proceso */}
                <Grid size={{xs: 12, md:6 }}>
                    <Box mb={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Lista de Ingredientes
                        </Typography>
                        <List dense component="ul" sx={{ listStyleType: 'disc', pl: 4 }}>
                            {(receta.ingredientes || []).map((ing, index) => (
                                <ListItem key={index} disablePadding sx={{ display: 'list-item' }}>
                                    <ListItemText 
                                        primary={`${ing.cantidad} ${ing.nombre}`}
                                        secondary={ing.unidadMedida || ""}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Box>

                    <Box>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Proceso de Preparación
                        </Typography>
                        <List>
                            {(receta.pasos || []).map((paso, index) => (
                                <ListItem key={index} disableGutters>
                                    <ListItemText 
                                        primary={`Paso ${index + 1}`}
                                        secondary={paso} 
                                        slotProps={{ primary: { sx: { fontWeight: 'bold' } } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}


// --- 2. Componente principal que EXPORTA y PROVEE el Contexto ---
function RecetaDetailPage() {
    // La página solo se encarga de envolver su contenido en el Provider
    return (
        <RecetasProvider>
            {/* 💡 El componente de Contenido es el hijo del Provider */}
            <RecetaDetailContent /> 
        </RecetasProvider>
    );
}

export default RecetaDetailPage;