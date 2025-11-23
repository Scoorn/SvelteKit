<script>
    import { enhance } from "$app/forms";
    
    export let data;
    

    let posts = data.posts; 
    
    export let form; 

    let successMessage = null; 
    let editingId = null; 
    
    function setEditingId(id) {
        editingId = id;
    }

    function cancelarEdit(){
        editingId = null;
    }

    
    const handlersSuccess = () =>{
        return async ({ result, update }) => {
            
            if (result.type === 'success' && result.data.success) {
                
                successMessage = result.data.message; 
                update({ reset: true }); 
                
                if (result.data.newPost) { 
                    posts = [...posts, result.data.newPost];
                } else if (result.data.updatedPost) { 
               
                    const updatedPost = result.data.updatedPost;
                    const updatedPostId = parseInt(updatedPost.id); 
                    
                    posts = posts.map(p => 
                        p.id === updatedPostId ? { ...p, title: updatedPost.title, body: updatedPost.body } : p
                    );
                } else if (result.data.deletedId) { 
                    
                  
                    const idToDelete = result.data.deletedId;
                    
                   
                    posts = posts.filter(p => p.id !== idToDelete);
                }

                editingId = null;
                setTimeout(() => {
                    successMessage = null;
                }, 3000); 

            } else {
                successMessage = null; 
            }
        };
    };
</script>

<h1> CRUD de Publicaciones </h1>

<hr>

<h2>➕ Crear Nueva Publicación</h2>
<form method="POST" action="?/crear" use:enhance={handlersSuccess} class="form-container">
    
    {#if form?.success === false && !form.id}
        <p class="error-message"> Error: {form.message}</p>
    {:else if successMessage && !form.id}
        <p class="success-message"> {successMessage}</p>
    {/if}
    
    <label for="title">Título:</label>
    <input type="text" name="title" id="title" required value="{form?.title ?? ''}">
    
    <label for="body" >Cuerpo:</label>
    <textarea name="body" id="body" required>{form?.body ?? ''}</textarea>

    <button type="submit" class="green">Crear</button>
</form>

<hr>

<h2>Lista ({posts.length} elementos)</h2>
<div class="posts-list">
    {#each posts as post (post.id)}
        <div class="post-item">
            
            {#if editingId === post.id}
                
                <form method="POST" action="?/actualizar" use:enhance={handlersSuccess} class="edit-form">
                    
                    {#if form?.success === false && form?.id == post.id}
                        <p class="error-message"> Error: {form.message}</p>
                    {/if}
                    
                    <input type="hidden" name="id" value={post.id}>

                    <label for="title-edit">Título:</label>
                    <input type="text" name="title" id="title-edit" value={form?.title ?? post.title}> 
                    
                    <label for="body-edit">Cuerpo:</label>
                    <textarea name="body" id="body-edit">{form?.body ?? post.body}</textarea>

                    <button type="submit">Guardar Cambios</button>
                    <button type="button" on:click={cancelarEdit} class="cancel-btn">Cancelar</button>
                </form>

            {:else}
                <h2>{post.title}</h2>
                <p>ID: {post.id}</p>
                <p>{post.body}</p>
                
                <div class="actions">
                    <button on:click={() => setEditingId(post.id)} class="edit-btn">Editar</button>

                    <form method="POST" action="?/eliminar" use:enhance={handlersSuccess} style="display: inline-block;">
                        <input type="hidden" name="id" value={post.id}>
                        <button type="submit" class="delete-btn">Eliminar</button>
                    </form>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .form-container, .edit-form {
        max-width: 500px;
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    input[type="text"], textarea {
        width: 100%;
        padding: 8px;
        margin: 5px 0 15px 0;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .posts-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }
    .post-item {
        border: 1px solid #0056b3;
        padding: 15px;
        border-radius: 8px;
        background-color: #f8faff;
    }
    .actions button {
        margin-right: 10px;
    }
    .error-message {
        color: white;
        background-color: #d9534f;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
    }
    .success-message {
        color: white;
        background-color: #5cb85c;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
    }
    .edit-btn { background-color: #007bff; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;}
    .delete-btn { background-color: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;}
    .green {background-color: #5cb85c; color:#ffffff;}
</style>