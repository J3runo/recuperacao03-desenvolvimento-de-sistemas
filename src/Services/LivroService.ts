import { randomUUID } from "crypto";
import { prisma } from "../prisma/client";


class Livroservice {
    public async create(liv: createLivroType) {
        const livro = {
            id: randomUUID(),
            isbn: liv.isbn,
            title:liv.title,
            authors:liv.authors,
            created_at: new Date(),
            updated_at: new Date()
        } 

        await prisma.livros.create({ data: livro });
    }
    

    public async getAll() {
        return await prisma.livros.findMany()
    }

    public async getById(id: string) {
        return await prisma.livros.findUnique({
            where: { id: id }
        })
    }
    public async getByIsbn(isbn: string) {
        return await prisma.livros.findUnique({
            where: { isbn: isbn }
        })
    }

    public async deleteById(id: string) {
        const livroExist = await prisma.livros.findUnique({ where: { id: id } })
        if (!livroExist) {
            throw new Error("Não existe um Livro com esse ID");
        }
        await prisma.livros.delete({
            where: { id: id },
        })
    }
    
    public async updateTitle(id: string, title: string) {
       
            await prisma.livros.update({
                where: { id: id },
                data: {
                    title: title,
                    updated_at: new Date()
                }
            })
        }
    }
 

export const LivroService = new Livroservice();