
<script>
    
    import Nav from '$lib/components/Nav.svelte';
    import Card from '$lib/components/Card.svelte';
    

    import { page } from '$app/stores'; 


    const slug = $page.params.slug;

    const postTitle = `Detalle del Ítem: ${slug.toUpperCase()}`;
    const postContent = `Este contenido es 100% dinámico. Demuestra que SvelteKit capturó el valor '${slug}' de la URL y lo usó para generar esta Card única. ¡Requisito cumplido!`;
</script>

<Nav />

<div class="page-container">
    <h1>Contenido Dinámico Generado por URL</h1>

  
    <div class="detail-card-wrapper">
        <Card title={postTitle} content={postContent} color="#007bff" />
    </div>

    <p class="slug-info">El contenido de esta página cambia solo por lo que escribas después de la barra.</p>
</div>

<style>
    .page-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
    .detail-card-wrapper {
        margin: 40px auto;
        max-width: 600px;
    }
    .slug-info {
        color: #555;
        margin-top: 20px;
    }
</style>