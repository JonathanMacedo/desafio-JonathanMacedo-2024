class RecintosZoo {
  constructor() {
      this.recintos = [
          { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3, carnivoro: false }] },
          { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: [] },
          { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1, carnivoro: false }] },
          { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: [] },
          { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1, carnivoro: true }] },
      ];

      this.animaisPermitidos = {
          LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
          LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
          CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
          MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
          GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
          HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
  }

  analisaRecintos(animal, quantidade) {
      if (!this.animaisPermitidos[animal]) {
          return { erro: "Animal inválido" };
      }

      if (quantidade <= 0) {
          return { erro: "Quantidade inválida" };
      }

      const animalInfo = this.animaisPermitidos[animal];
      const tamanhoNecessario = quantidade * animalInfo.tamanho;
      let recintosViaveis = [];

      for (let recinto of this.recintos) {
          if (!recinto.bioma.some(b => animalInfo.biomas.includes(b))) {
              continue;
          }

          const carnivorosNoRecinto = recinto.animaisExistentes.filter(a => a.carnivoro);
          if (animalInfo.carnivoro && carnivorosNoRecinto.length > 0 && carnivorosNoRecinto[0].especie !== animal) {
              continue;
          }

          if (!animalInfo.carnivoro && carnivorosNoRecinto.length > 0) {
              continue;
          }

          if (animal === 'CROCODILO' && !(recinto.bioma.length === 1 && recinto.bioma.includes('rio'))) {
              continue;
          }

          let espacoOcupadoAtual = recinto.animaisExistentes.reduce((total, a) => total + a.quantidade * this.animaisPermitidos[a.especie].tamanho, 0);
          const espacoDisponivel = recinto.tamanhoTotal - espacoOcupadoAtual;
          
          // Depuração
          console.log(`Recinto ${recinto.numero}: Tamanho Total: ${recinto.tamanhoTotal}, Espaço Ocupado Atual: ${espacoOcupadoAtual}, Espaço Disponível: ${espacoDisponivel}`);
          
          // Correção: Verificação do espaço disponível antes de adicionar à lista de recintos viáveis
          if (espacoDisponivel >= tamanhoNecessario) {
              const espacoLivreAposAdicao = espacoDisponivel - tamanhoNecessario;
              recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivreAposAdicao} total: ${recinto.tamanhoTotal})`);
          }
      }

      if (recintosViaveis.length === 0) {
          return { erro: "Não há recinto viável" };
      }

      return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
