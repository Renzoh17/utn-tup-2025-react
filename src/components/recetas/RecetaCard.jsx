import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Ejemplo de icono adicional

function RecetaCard({ receta, onVerReceta }) {
  // Función para obtener el color de la dificultad
  const getDificultadColor = (dificultad) => {
    switch (dificultad.toLowerCase()) {
      case 'fácil':
        return 'success'; // Verde
      case 'media':
        return 'warning'; // Naranja
      case 'difícil':
        return 'error'; // Rojo
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      '&:hover': {
        boxShadow: 6, // Efecto hover para la tarjeta
      }
    }}>
      <CardMedia
        component="img"
        height="180"
        // Asegúrate de que las rutas de las imágenes sean correctas
        // Si las imágenes están en 'public/images/', la ruta sería '/images/nombre.jpg'
        // Si están en 'src/assets/', necesitarías importarlas: import img from '../assets/img.jpg';
        image={receta.imagen || 'https://via.placeholder.com/300x180?text=Receta'} 
        alt={receta.titulo}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {receta.titulo}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {receta.tiempoPreparacion}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <RestaurantIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {receta.porciones} porciones
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0, mt: 'auto' }}> 
          
          {/* 3. El Chip de Dificultad va aquí (arriba de los botones) */}
          <Chip 
              label={receta.dificultad} 
              color={getDificultadColor(receta.dificultad)} 
              size="small" 
              sx={{ mb: 1 }} // Margen inferior para separarse del botón
          />

          {/* 4. CardActions contiene los botones y se mantiene debajo del chip */}
          <CardActions 
              sx={{ 
                  p: 0, // Remover padding interno para que se alinee con el Box
                  justifyContent: 'space-between', 
                  alignItems: 'center',
              }}
          >
              <Button 
                  size="small" 
                  variant="contained" 
                  onClick={() => onVerReceta(receta.id)}
                  sx={{ flexGrow: 1, mr: 1 }}
              >
                  Ver Receta
              </Button>

              <Button size="small" variant="outlined" color="secondary">
                  <FavoriteBorderIcon />
              </Button>
          </CardActions>
      </Box>
    </Card>
  );
}

export default RecetaCard;