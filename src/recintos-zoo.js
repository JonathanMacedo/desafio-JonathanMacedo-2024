class RecintosZoo {
  // Utilizei o constructor para criação de coleção de objetos por alguns fatores, que são: armazenar valores iniciais e a reutilização do código fica muito mais fácil.
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

    // Criei duas constantes, sendo animal, para facilitar e diminuir toda vez que fosse utilizar this.animais[especie_animal] e recintosViaveis, que está vazia no momento, mas recebera informações ao decorrer da execução.
    const animal = this.animais[especie_animal];
    const recintosViaveis = [];

    // Um loop que verifica se tem espaço disponivel de acordo com alguns pontos, se já existe animal no recinto, qual a quantidade de animais no recinto, qual é o espaço que o animal a ser colocado irá ocupar.
    for (const recinto of this.recintos) {
      const espacoOcupado = recinto.animais.reduce(
        (acc, a) => acc + a.quantidade * this.animais[a.especie].tamanho,
        0
      );

      // Faz o calculo se o espaço é o suficiente.
      const espacoLivre = recinto.tamanho - espacoOcupado;

      // Aqui utilizei o método Array.isArray pois o recinto de numero 3, os biomas estão divididos em um array, e criando uma constante para facilitar a chamada dessa condição, que é um operador ternário, que verifica o tipo de dado contido.
      const biomasRecinto = Array.isArray(recinto.biomas)
        ? recinto.biomas
        : [recinto.biomas];

      // Este if checa se o recinto realmente tem espaço.
      if (espacoLivre < quantidade * animal.tamanho) {
        continue;
      }

      // Verifica se o bioma é compatível.
      if (!biomasRecinto.some((bioma) => animal.biomas.includes(bioma))) {
        continue;
      }

      // Verifica se o recinto é confortável para o novo animal.
      if (this.verificaConforto(recinto, especie_animal, quantidade)) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            espacoLivre - quantidade * animal.tamanho
          } total: ${recinto.tamanho})`
        );
      }
    }

    // Caso não haja recito disponível.
    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }

  // Aqui é verificado o conforto dos animais, e se são respeitados.
  verificaConforto(recinto, especie, quantidade) {
    const animal = this.animais[especie];

    // Nesse for é verificado se estão tentando colocar 1 animal carnívoro e 1 herbívoro.
    for (const a of recinto.animais) {
      const outroAnimal = this.animais[a.especie];

      // Carnívoro e herbívoro não podem ficar juntos.
      if (animal.carnivoro && !outroAnimal.carnivoro) {
        return false;
      }

      // Herbívoro não pode ficar junto com carnívoro.
      if (!animal.carnivoro && outroAnimal.carnivoro) {
        return false;
      }

      // Dois carnívoros diferentes não podem ficar juntos.
      if (animal.carnivoro && outroAnimal.carnivoro && a.especie !== especie) {
        return false;
      }
    }

    // Verifica se há espaço suficiente no recinto para os animais.
    const espacoOcupado = recinto.animais.reduce(
      (acc, a) => acc + a.quantidade * this.animais[a.especie].tamanho,
      0
    );

    // Realiza o calculo do espaço disponível.
    const espacoLivre = recinto.tamanho - espacoOcupado;

    // Verifica se há espaço disponível no recinto.
    if (espacoLivre < quantidade * animal.tamanho) {
      return false;
    }

    // Verifica se o bioma é compatível com a espécie.
    const biomasRecinto = Array.isArray(recinto.biomas)
      ? recinto.biomas
      : [recinto.biomas];

    // Caso o bioma seja incompatível.
    if (!biomasRecinto.some((bioma) => animal.biomas.includes(bioma))) {
      return false;
    }

    return true;
  }
}

export { RecintosZoo };
