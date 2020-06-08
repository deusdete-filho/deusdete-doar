import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    { title: "Roupas", image: "lampadas.svg" },
    { title: "Alimentos", image: "baterias.svg" },
    { title: "Remédios", image: "papeis-papelao.svg" },
    { title: "Alimentos prontos", image: "eletronicos.svg" },
    { title: "Material de higiene", image: "organicos.svg" },
    { title: "Produtos de limpeza", image: "oleo.svg" },
  ]);
}
