// src/routes/+page.server.js
import { fail } from '@sveltejs/kit';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function load({ fetch }) {
    const response = await fetch(API_URL);

    if (response.ok) {
        const posts = await response.json();
        return {
            posts: posts
        };
    }
    throw new Error('No se pudo obtener la lista de publicaciones.');
}


export const actions = {
    crear: async ({ request, fetch }) => {
        const formData = await request.formData();
        const title = formData.get('title')?.toString().trim();
        const body = formData.get('body')?.toString().trim();

        if (!title || title.length < 3) {
            return fail(400, {
                success: false,
                message: "El título es obligatorio y debe ser mayor de 3 letras.",
                title: title,
                body: body
            });
        }
        if (!body || body.length < 10) {
            return fail(400, {
                success: false,
                message: "El cuerpo es obligatorio y debe tener al menos 10 caracteres.",
                title: title,
                body: body
            });
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1, 
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const newPost = await response.json();
            return { success: true, newPost: newPost, message: "¡Publicación creada con éxito!" };
        } else {
            return fail(response.status, {
                success: false,
                message: `Error ${response.status}: Falló la creación en la API.`,
                title,
                body
            });
        }
    },

    actualizar: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id')?.toString();
        const title = formData.get('title')?.toString().trim();
        const body = formData.get('body')?.toString().trim();

        if (!id || isNaN(parseInt(id))) {
            return fail(400, { success: false, message: "ID del post es inválido." });
        }
        if (!title || title.length < 3) {
            return fail(400, { success: false, message: "El título es obligatorio.", title, body, id });
        }
        if (!body || body.length < 10) {
            return fail(400, { success: false, message: "El cuerpo es obligatorio.", title, body, id });
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: parseInt(id),
                title: title,
                body: body,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const updatedPost = await response.json();
            return { success: true, message: `Post ${id} Actualizado exitosamente.`, updatedPost: updatedPost };
        } else {
            return fail(response.status, {
                success: false,
                message: `Error ${response.status}: No se pudo completar la actualización.`,
                title,
                body,
                id
            });
        }
    },

    eliminar: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id')?.toString();

        if (!id || isNaN(parseInt(id))) {
            return fail(400, { success: false, message: "El ID del post a eliminar es inválido." });
        }

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
           
            return { 
                success: true, 
                message: `Post ${id} eliminado simuladamente.`,
                deletedId: parseInt(id) 
            }; 
        } else {
            return fail(response.status, {
                success: false,
                message: `Error ${response.status}: No se pudo completar la eliminación.`,
            });
        }
    }
};