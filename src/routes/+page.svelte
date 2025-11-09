<script>
    import Nav from '$lib/components/Nav.svelte';
    import Card from '$lib/components/Card.svelte';
    import Button from '$lib/components/Button.svelte';
    
</script>

<Nav />

<h1>Página de Inicio </h1>

<div class="card-container">
    <Card title="Juego PVP" content=" Call of duty" />
    <Card title="Juego Mundo Abierto " content=" Elden Ring      " />
    <Card title="Juego de Rol" content=" The Witcher 3: Wild Hunt   " />
    
   
</div>


<Button  
    text="Agregar" 
    onClick={() => alert('Agregado con exito')} 
    color="#3e964aff"
/>

<Button  
    text="Editar" 
    onClick={() => alert('¡Editado con exito')} 
    color="#d0d333ff"
/>

<Button  
    text="Borrar" 
    onClick={() => alert('Eliminado con exito')} 
    color="#ff1e00ff"
/>

<style>
    .card-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
</style>