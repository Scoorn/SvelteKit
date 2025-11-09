<script>
 
    export let title = 'Título por Defecto';
    export let content = 'Contenido de ejemplo para la card.';
</script>

<div class="card">
    <h2>{title}</h2>
    <p>{content}</p>
    </div>

<style>
    
    .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        margin: 15px;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: white;
    }
    h2 {
        color: #333;
        margin-top: 0;
    }
    p {
        color: #666;
    }
</style>