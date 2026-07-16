import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const disciplinas = [
  { nome: "Matemática", descricao: "Álgebra, geometria, aritmética e raciocínio lógico." },
  { nome: "Física", descricao: "Mecânica, termodinâmica, óptica e eletromagnetismo." },
  { nome: "Química", descricao: "Estrutura da matéria, reações e química orgânica." },
  { nome: "Ciências", descricao: "Biologia, meio ambiente e método científico." },
  { nome: "História", descricao: "História geral e do Brasil, sociedade e cidadania." },
  { nome: "Redação", descricao: "Produção textual, gêneros e argumentação." },
];

async function main(): Promise<void> {
  for (const disciplina of disciplinas) {
    await prisma.disciplina.upsert({
      where: { nome: disciplina.nome },
      update: {},
      create: disciplina,
    });
  }

  console.log(`Seed concluído: ${String(disciplinas.length)} disciplinas garantidas.`);
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
