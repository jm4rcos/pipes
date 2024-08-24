# PipesAnimation

Um componente React que cria uma animação de linhas em movimento em um canvas HTML5 com opções de customização.

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue para o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Uso

Importe e utilize o componente no seu app React:

```jsx
import PipesAnimation from "./PipesAnimation";

function App() {
  return (
    <div style={{ height: "100vh", margin: 0 }}>
      <PipesAnimation
        numLines={5}
        lineSpeed={5}
        turnProbability={0.1}
        smoothTrails={true}
        trailLength={300}
        clearAfter={1000} // Tempo em milissegundos para apagar o rastro
      />
    </div>
  );
}

export default App;
```

## Propriedades

- **`numLines`** (`number`): Número de linhas. (padrão: `2`)
- **`lineSpeed`** (`number`): Velocidade das linhas. (padrão: `3`)
- **`turnProbability`** (`number`): Probabilidade de mudança de direção (0 a 1). (padrão: `0.02`)
- **`smoothTrails`** (`boolean`): Se `true`, rastro das linhas será suavizado. (padrão: `false`)
- **`trailLength`** (`number`): Comprimento máximo do rastro. (padrão: `200`)
- **`clearAfter`** (`number` | `null`): Tempo para limpar o canvas após o rastro se apagar. Se `null`, o canvas não será limpo. (padrão: `null`)

## Dependências

- **`react`**
- **`prop-types`**

## Licença

MIT License

## Contribuição

Abra um pull request ou issue para contribuir.

## Contato

Crie uma issue no repositório para dúvidas e sugestões.

```

Este README inclui instruções para clonar e configurar o projeto usando Vite, além de informações sobre como usar e contribuir para o projeto. Ajuste conforme necessário para seu repositório específico.
```
