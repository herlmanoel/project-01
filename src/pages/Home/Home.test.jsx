/*
  -> it === jest
  -> Não vamos testar a Home, pois é melhor testar os comps
  -> describe('descricao', () => { todos os testes });
  -> para rodar o teste:
      npm test
  -> Arquivo Home.test.jsx ou Home.spec.jsx. Teste Unitários 
    vamos utilizar spec e de integração test.
*/
describe('<Home />', () => {
  it('is a dummy test', () => {
    expect(1).toBe(1);
  });
});
