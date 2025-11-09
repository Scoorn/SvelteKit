<script>
    export let text = 'Botón';
    export let color = '#41ff41ff'
    export let onClick = () => {}; 
</script>

<button on:click={onClick} style="--btn-bg: {color}">
    {text}
</button>

<style>
    button {
        padding: 10px 20px;
        background-color: var(--btn-bg);
        
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
       opacity: 0.8;
    }
</style>