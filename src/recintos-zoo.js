class RecintosZoo {
// Utilizei o constructor para criação de coleção de objetos por alguns fatores: armazenar valores iniciais, a reutilização do código fica muito mais fácil.
  constructor() {
    this.recintos = [
      {
        numero: 1,
        biomas: "savana",
        tamanho: 10,
        animais: [{ especie: "MACACO", quantidade: 3 }],
      },
      { numero: 2, biomas: "floresta", tamanho: 5, animais: [] },
      {
        numero: 3,
        biomas: ["savana", "rio"],
        tamanho: 7,
        animais: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { numero: 4, biomas: "rio", tamanho: 8, animais: [] },
      {
        numero: 5,
        biomas: "savana",
        tamanho: 9,
        animais: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
    };
  }


// Assim como pedido, o método para consultar os resultados estão dentro de analisaRecintos.
  analisaRecintos(especie_animal, quantidade) {
// Aqui está validando se a espécie está entre a coleção de objetos.
    if (!this.animais[especie_animal]) {
      return { erro: "Animal inválido" };
    }
// Validando a quantidade de animais a serem inseridos.
    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const animal = this.animais[especie_animal];
    const recintosViaveis = [];

    for (const recinto of this.recintos) {
      const espacoOcupado = recinto.animais.reduce(
        (acc, a) => acc + a.quantidade * this.animais[a.especie].tamanho,
        0
      );
      const espacoLivre = recinto.tamanho - espacoOcupado;

      const biomasRecinto = Array.isArray(recinto.biomas)
        ? recinto.biomas
        : [recinto.biomas];

      // Adicionei um check para garantir que o recinto não tenha espaço suficiente
      if (espacoLivre < quantidade * animal.tamanho) {
        continue;
      }

      // Adicionei um check para garantir que o bioma seja compatível
      if (!biomasRecinto.some((bioma) => animal.biomas.includes(bioma))) {
        continue;
      }

      // Verifica se o recinto é confortável para o novo animal
      if (this.verificaConforto(recinto, especie_animal, quantidade)) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            espacoLivre - quantidade * animal.tamanho
          } total: ${recinto.tamanho})`
        );
      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }

  verificaConforto(recinto, especie, quantidade) {
    const animal = this.animais[especie];

    // Verifica conflito entre carnívoros e herbívoros
    for (const a of recinto.animais) {
      const outroAnimal = this.animais[a.especie];

      if (animal.carnivoro && !outroAnimal.carnivoro) {
        return false; // Carnívoro e herbívoro não podem coexistir
      }

      if (!animal.carnivoro && outroAnimal.carnivoro) {
        return false; // Herbívoro não pode coexistir com carnívoro
      }

      if (animal.carnivoro && outroAnimal.carnivoro && a.especie !== especie) {
        return false; // Dois carnívoros diferentes não podem coexistir
      }
    }

    // Verifica se há espaço suficiente
    const espacoOcupado = recinto.animais.reduce(
      (acc, a) => acc + a.quantidade * this.animais[a.especie].tamanho,
      0
    );
    const espacoLivre = recinto.tamanho - espacoOcupado;

    if (espacoLivre < quantidade * animal.tamanho) {
      return false; // Não há espaço suficiente
    }

    // Verifica se o bioma é compatível
    const biomasRecinto = Array.isArray(recinto.biomas)
      ? recinto.biomas
      : [recinto.biomas];
    if (!biomasRecinto.some((bioma) => animal.biomas.includes(bioma))) {
      return false; // Bioma incompatível
    }

    return true;
  }
}

export { RecintosZoo };
