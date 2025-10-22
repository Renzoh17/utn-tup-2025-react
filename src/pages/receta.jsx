import { useState } from "react";
import ListaIngredientes from "../components/receta/Lista";
import { RecetaProvider, useProductos } from "../contexts/RecetaContext";
import { Container, Typography, Alert } from "@mui/material";

function RecetaPage() {
    const [productos, setProductos] = useState([]);
    const [hasError, setError] = useState(false);

    return (
        <RecetaProvider>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{ mb: 4 }}
                >
                    Mi Receta
                </Typography>
                
                {hasError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        ¡Ha ocurrido un error al cargar la receta!
                    </Alert>
                )}

                <ListaIngredientes titulo={"ingredientes"} productos={productos}/>
            </Container>
        </RecetaProvider>
    )
}

export default RecetaPage;
