import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LivroService } from "../Services/LivroService";



export async function LivroController(app: FastifyInstance) {
  app.post("/livro", async (request: FastifyRequest, reply: FastifyReply) => {

    const body = request.body as createLivroType
      await LivroService.create(body);
  } 
  );

  app.get("/livros", async (request: FastifyRequest, reply: FastifyReply) => {
    const livros = await LivroService.getAll();

    return reply.code(200).send(livros);

  }
  );

  app.get("/livros/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { id: string };

    const livro = await LivroService.getById(params.id);

    return reply.code(200).send(livro);

  }
  );
  app.get("/livro/:isbn", async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { isbn: string };

    const livro = await LivroService.getByIsbn(params.isbn);

    return reply.code(200).send(livro);

  }
  );

  app.delete("/livro/:id", async (request: FastifyRequest, reply: FastifyReply) => {
   
      const params = request.params as { id: string };

      await LivroService.deleteById(params.id);

      return reply.code(204).send();
    
  }

  )

  app.patch("/livro/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { id: string };
    const body = request.body as { title: string };

    await LivroService.updateTitle(params.id, body.title);

    return reply.code(200).send();
  })
}