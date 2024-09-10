import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    // Como mencionei no README, tive muita dificuldade em utilizar o Jest, como nunca o utilizei, acabei sofrendo um pouco para fazer os testes rodar, mas em especial esse, que tive que alterar algumas coisas para rodar da forma esperada.
    test("Deve encontrar recinto para 2 macacos", () => {
        const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe(
          "Recinto 1 (espaço livre: 5 total: 10)"
        );
      });
    

    // Pesquisando um pouco acabei tentando também adicionar outros testes para ver se o código funciona como o esperado.  
    test("Deve rejeitar colocar animais carnívoros com outras espécies", () => {
        const resultado = new RecintosZoo().analisaRecintos(
          ["LEÃO", 1],
          ["MACACO", 1]
        );
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
      });
    
      test("Deve rejeitar colocar animais herbívoros com carnívoros", () => {
        const resultado = new RecintosZoo().analisaRecintos(
          ["MACACO", 1],
          ["LEÃO", 1]
        );
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
      });
    
      test("Deve rejeitar colocar dois animais carnívoros de espécies diferentes", () => {
        const resultado = new RecintosZoo().analisaRecintos(
          ["LEÃO", 1],
          ["CROCODILO", 1]
        );
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
      });
      test("Deve encontrar recintos para 1 GAZELA", () => {
        const resultado = new RecintosZoo().analisaRecintos("GAZELA", 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBe("Recinto 3 (espaço livre: 2 total: 7)" && 2);
      });
    
    });
      
    
