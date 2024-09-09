import { RecintosZoo } from "./recintos-zoo";

describe("Recintos do Zoológico", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new RecintosZoo().analisaRecintos("UNICÓRNIO", 1);
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve rejeitar quantidade inválida", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", -1);
    expect(resultado.erro).toBe("Quantidade inválida");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Não deve encontrar recintos para 10 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 10);
    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve encontrar recinto para 1 crocodilo", () => {
    const resultado = new RecintosZoo().analisaRecintos("CROCODILO", 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 4 (espaço livre: 5 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test("Deve encontrar recinto para 2 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 1 (espaço livre: 5 total: 10)"
    );
  });

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
  test("Deve aceitar quantidade válida de animais", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 3);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis.length).toBeGreaterThan(0);
  });
  test("Deve encontrar recintos para múltiplos animais da mesma espécie", () => {
    const resultado = new RecintosZoo().analisaRecintos("GAZELA", 3);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis.length).toBeGreaterThan(0);
  });

  test("Deve aceitar animais carnívoros da mesma especie", () => {
    const resultado = new RecintosZoo().analisaRecintos("LEAO", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis.length).toBeGreaterThan(0);
  });
});
