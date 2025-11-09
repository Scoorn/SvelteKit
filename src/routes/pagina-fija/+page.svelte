<script>
   import Nav from '$lib/components/Nav.svelte';
    import Card from '$lib/components/Card.svelte';
</script>

<Nav />


<div class="page-container">

    <h1>Comprendiendo los Géneros de Videojuegos (Página Fija)</h1>
    
    
    <div class="panel-grid">
        <Card 
            title="La Esencia del PVP y FPS 💥" 
            content="Juegos como Call of Duty se centran en la habilidad pura del jugador contra jugador (PVP). Exigen reflejos rápidos, conocimiento del mapa y trabajo en equipo para dominar la tabla de posiciones." 
        />
        <Card 
            title="Inmersión en Mundos Abiertos y RPG 🗺️" 
            content="Los RPG como The Witcher 3 o Elden Ring ofrecen libertad total. Su valor está en las narrativas profundas, las decisiones con impacto y la capacidad de personalizar tu propia aventura en un mundo vasto." 
        />
    </div>

    <p class="footer-note">¡Explora estos géneros y descubre tu próxima gran aventura!</p>
</div>

<style>
    .page-container {
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
        text-align: center;
    }
    .panel-grid {
        display: flex;

        flex-wrap: wrap; 
        gap: 30px;
        justify-content: center;
        margin-top: 20px;
    }
    .footer-note {
        margin-top: 40px;
        color: #777;
        font-style: italic;
    }
    
    @media (max-width: 768px) {
        .panel-grid {
            flex-direction: column;
            align-items: center;
        }
    }
</style>