# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Children Props

No React, **children props** são usadas para acessar elementos ou componentes que são passados entre a abertura e o fechamento de uma tag de componente. Ou seja, quando você coloca algo dentro do componente, esse conteúdo pode ser capturado e renderizado dentro do próprio componente.

Existem duas formas comuns de acessar esses elementos:

1. **props.children**  
   Acessa diretamente o conteúdo passado dentro do componente via o objeto `props`.

   ```jsx
   function Container(props) {
     return <div>{props.children}</div>;
   }
   ```

2. **Desestruturação de { children }**  
   Extraindo `children` diretamente das props na declaração da função.

   ```jsx
   function Container({ children }) {
     return <div>{children}</div>;
   }
   ```

## Exemplo de uso:

```jsx
function App() {
  return (
    <Container>
      <h1>Olá, mundo!</h1>
      <p>Este é um exemplo de children props.</p>
    </Container>
  );
}
```

Nesse exemplo, o componente `Container` recebe os elementos `<h1>` e `<p>` como seus filhos (children) e os renderiza dentro da `div` com a classe "container".

# Componentes no React

## UI Building Blocks

Uma aplicação React é composta por uma **combinação de componentes**.

> Aplicações complexas são divididas em partes menores e reutilizáveis.  
Isso facilita a **manutenção** e a **escalabilidade** do código.

Por serem **reutilizáveis**, os componentes tornam mais fácil realizar alterações sem afetar toda a aplicação.

---

## JSX (JavaScript eXtension)

O JSX permite escrever **HTML dentro do JavaScript**.

```jsx
const MeuComponente = () => {
  return <h1>Olá, mundo!</h1>;
}
```
---

# Diferença entre `index.jsx`, `App.jsx` e `index.html`

## `index.html`

- É o único arquivo **HTML** da aplicação React.
- Contém a `div` com `id="root"`, que serve como **ponto de entrada** para a aplicação React.
- **Não entende JSX** diretamente — por isso, o JavaScript precisa ser processado por um *bundler*.

---

## `index.jsx`

- É o **ponto de entrada JavaScript** da aplicação React.
- Responsável por inicializar o React e renderizar o primeiro componente da aplicação.
- Usa `ReactDOM.createRoot` para **selecionar o elemento HTML** (`#root`) e injetar nele o componente raiz (`App`).

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
```
## `App.jsx`

- É o **componente raiz (Root Component)** da aplicação.
- Serve como ponto inicial da **estrutura de componentes**, podendo conter outros componentes como `Header`, `Main`, `Footer` etc.
- A partir dele, é construída a **árvore de componentes** (*Component Tree*).

### Exemplo de estrutura:

```jsx
<App>
  <Header />
  <Main />
  <Footer />
</App>
```
---

## Observações Importantes

- **JSX não é compreendido diretamente pelos navegadores.**  

- **Componentes React devem começar com letra maiúscula:**
  - Evita conflitos de nomes.
  - Permite que o React identifique o elemento como um **componente personalizado** em vez de uma tag HTML comum.



# Outputting Dynamic Content in JSX

Para inserir valores dinâmicos no JSX, usamos chaves `{}`.

```jsx
const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const description = reactDescriptions[genRandomInt(2)];
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}
```

---

## Uso de imagens dinâmicas no JSX

- Podemos usar chaves `{}` para inserir valores dinâmicos também no atributo `src` de imagens.
- Usar `src` com caminho direto da imagem pode funcionar localmente, mas não é recomendado:
  - No deploy, essas imagens podem ser ignoradas.
  - Também dificulta o reaproveitamento das imagens.
  
**Melhor prática:** importar a imagem no arquivo e usar a variável importada no `src`.

Exemplo:

```jsx
import reactImg from "./assets/react-core-concepts.png";

function Header() {
  return <img src={reactImg} alt="Stylized atom" />;
}
```

---

Dessa forma, o bundler (ex: Webpack, Vite) garante que a imagem seja incluída corretamente no build final e facilita o reaproveitamento.

# Eventos em React

## Elementos Built-in

Em React, podemos adicionar **eventos** aos elementos built-in (como `<button>`, `<input>`, etc.) utilizando a sintaxe:

```jsx
on<Evento>
```

### Exemplo:
```jsx
<button onClick={handleClick}>Clique aqui</button>
```

## Como funciona

- O evento deve **apontar para uma função** que será executada quando o evento acontecer.  


## Convenção de nomes

Por convenção, funções que lidam com eventos geralmente começam com **`handle`**:
```jsx
function handleClick() {
  console.log("Botão clicado!");
}
```

## Funções em eventos: Arrow Function vs Nome da Função

### 1. Usando apenas o **nome da função**
```jsx
<button onClick={handleClick}>Clique aqui</button>
```
**Quando usar:**
- Quando você quer que a função seja executada **apenas quando o evento acontecer**.  
- Quando a função **não precisa receber argumentos extras**.


### 2. Usando **Arrow Function**
```jsx
<button onClick={() => handleClick('argumento')}>Clique aqui</button>
```
**Quando usar:**
- Quando você **precisa passar argumentos** para a função.  
- Quando quer executar **mais de uma ação** dentro do evento.


## Passando funções como props para componentes

Você também pode passar funções como props para componentes personalizados:

```jsx
function handleSelect() {
  console.log("Hello World!");
}

<TabButton onSelect={handleSelect}>Components</TabButton>

// COMPONENT
export default function TabButton({ children, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}
```

**Explicação:**
- A função `handleSelect` é passada como prop `onSelect` para o componente `TabButton`.
- Dentro do componente, o evento `onClick` do botão chama a função recebida via props.

# Usando JSX como Valor de Prop em React

Em React, **você pode passar JSX como valor de uma prop**, permitindo que um componente receba elementos complexos como conteúdo. Isso é muito útil para componentes genéricos de UI, como cards, botões ou modais.

---

## Regras Importantes

1. **Deve haver um elemento pai:**
   Se você quiser passar múltiplos elementos, eles precisam estar envolvidos por um elemento pai (`div`, `span`, `<> </>` etc.):

```jsx
<MyComponent
  content={
    <div>
      <h1>Título</h1>
      <p>Descrição do conteúdo.</p>
    </div>
  }
/>
```

2. **Pode ser apenas um elemento:**
   Se for apenas um elemento, não é necessário envolver em um pai extra:

```jsx
<MyComponent content={<p>Texto simples</p>} />
```

---

## Exemplo Completo

```jsx
function Card({ title, description, footer }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{description}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}

// Uso
<Card
  title={<h2>Meu Card</h2>}
  description={
    <div>
      <p>Este é um card com descrição detalhada.</p>
      <p>Pode ter múltiplos elementos dentro.</p>
    </div>
  }
  footer={<button>Saiba mais</button>}
/>
```

No HTML renderizado, tudo será exibido dentro do `<div>` correspondente, preservando a estrutura e os estilos.

---

## Dicas Práticas

* **Flexibilidade:** JSX como prop permite que o componente seja **totalmente customizável**.
* **Evite fragmentos desnecessários:** use `<></>` apenas quando precisar agrupar múltiplos elementos.
* **Props nomeadas:** prefira nomes claros como `header`, `footer`, `icon`, `content` para facilitar a leitura do código.

---

## Conclusão

Passar JSX como prop é uma técnica poderosa em React para criar **componentes altamente reutilizáveis e flexíveis**, permitindo que cada instância do componente receba conteúdo próprio, sem limitar a estrutura interna do componente.

# Props Forwarding em React

Quando criamos componentes React, **as props que passamos para um componente não são automaticamente enviadas para os elementos internos**. Isso significa que se você fizer algo assim:

```jsx
<MyComponent id="main" className="container" />
```

E dentro do componente:

```jsx
export default function MyComponent() {
  return <div>Hello World</div>;
}
```

O `div` **não receberá** o `id` nem o `className` — eles ficam apenas no componente `MyComponent`.

---

## Problema

Sem forwarding de props, você precisa explicitamente passar cada prop para os elementos internos:

```jsx
export default function MyComponent({ id, className }) {
  return <div id={id} className={className}>Hello World</div>;
}
```

Isso fica repetitivo e pouco escalável quando o componente recebe muitas props diferentes.

---

## Solução: Proxy Props / Rest Props

Você pode usar o **rest operator (`...props`)** para receber todas as props restantes em um objeto e repassá-las para o elemento interno:

```jsx
export default function Section({ title, children, ...props }) {
  return (
    <section {...props}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
```

### Uso:

```jsx
<Section id="examples" className="highlighted" title="Examples">
  <p>Este é um conteúdo dentro da Section.</p>
</Section>
```

No HTML resultante:

```html
<section id="examples" class="highlighted">
  <h1>Examples</h1>
  <p>Este é um conteúdo dentro da Section.</p>
</section>
```

> Todas as props passadas para `Section` (`id`, `className`, etc.) foram "replicadas" para o `<section>` interno.

---

## Exemplo com Condicional de Elementos

Você também pode combinar forwarding de props com render condicional:

```jsx
export default function Input({ placeholder, type, ...props }) {
  return (
    <>
      {type === "text" ? (
        <input placeholder={placeholder} {...props} />
      ) : (
        <textarea placeholder={placeholder} {...props} />
      )}
    </>
  );
}
```

### Uso:

```jsx
<Input
  type="text"
  placeholder="Digite seu nome"
  id="name"
  className="input-field"
/>

<Input
  type="textarea"
  placeholder="Digite sua mensagem"
  id="message"
  className="textarea-field"
/>
```

> Tanto o `<input>` quanto o `<textarea>` recebem automaticamente todas as props adicionais.

---

## Conclusão

* **Props não são enviadas automaticamente** para elementos internos.
* O **rest operator (`...props`)** permite criar componentes genéricos e reutilizáveis, passando todas as props extras para os elementos internos.
* Isso é especialmente útil em componentes customizados de UI, onde você quer manter a flexibilidade de receber `id`, `className`, `style` ou eventos (`onClick`, etc.).

---

## Dica prática

Sempre que criar um componente que envolva elementos HTML ou outros componentes, pense:

```text
Quais props extras quero que o usuário possa passar?
```

E use `{...props}` para repassá-las, evitando limitar a flexibilidade do componente.


# Props em React

Uma das vantagens dos componentes é que eles podem ser reutilizáveis, e isso é feito a partir das **props**.

---

## O que são Props?

Props permitem que dados sejam passados para componentes.

Na tag do componente, as props são os atributos que você passa com seus respectivos valores.

Podem ser:

- Strings
- Números (usando `{}`)
- Objetos
- Arrays
- Entre outros tipos

---

## Como as Props funcionam internamente?

Ao passar props em um componente, o React as transforma em um objeto único e passa esse objeto como o primeiro argumento para a função do componente.

Exemplo:

```jsx
<CoreConcept
  title="Components"
  description="Core UI Building Blocks"
/>
```

Internamente, isso equivale a:

```js
{
  title: "Components",
  description: "Core UI Building Blocks"
}
```

E a função do componente recebe esse objeto:

```jsx
function CoreConcept(props) {
  return props.title;
}
```

---

## Usando Props derivadas de uma matriz

Se você tem dados organizados em um array de objetos, pode importar e passar os valores para o componente.

Exemplo de importação nomeada:

```jsx
import { CORE_CONCEPTS } from "./constants";
```

### Passagem das props de duas formas:

1) Passando cada prop explicitamente:

```jsx
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}
/>
```

2) Passando todas as props de um objeto com spread operator, desde que os nomes coincidam:

```jsx
<CoreConcept {...CORE_CONCEPTS[0]} />
```

---

## Desestruturando props na função

Você pode desestruturar as props no parâmetro da função para acessar diretamente os valores:

```jsx
function CoreConcept({ title }) {
  return title;
}
```


# Outputting List Data Dinamically no React

Renderizar listas dinamicamente no React ajuda a evitar repetição de código e torna a aplicação mais escalável.

---

## Problema

- Precisamos de uma forma dinâmica de gerar componentes a partir de uma matriz de dados.

---

## Solução: JSX e `.map()`

- JSX permite renderizar uma matriz de dados.  
- O método `.map()` produz uma nova matriz de elementos com base na existente.

```jsx
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

function App() {
  return (
    <div>
      {items.map((item, index) => (
        <Component key={index} {...item} />
      ))}
    </div>
  );
}
```

---

## Importante: Prop `key`

- A prop `key` deve ser usada em cada elemento da lista.  
- Serve como identificador único para o React rastrear mudanças e otimizar a renderização.

```jsx
<Component key={item.id} {...item} />
```


# Outputting List Data Dinamically no React

Renderizar listas dinamicamente no React ajuda a evitar repetição de código e torna a aplicação mais escalável.

---

## Problema

- Precisamos de uma forma dinâmica de gerar componentes a partir de uma matriz de dados.

---

## Solução: JSX e `.map()`

- JSX permite renderizar uma matriz de dados.  
- O método `.map()` produz uma nova matriz de elementos com base na existente.

```jsx
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

function App() {
  return (
    <div>
      {items.map((item, index) => (
        <Component key={index} {...item} />
      ))}
    </div>
  );
}
```

---

## Importante: Prop `key`

- A prop `key` deve ser usada em cada elemento da lista.  
- Serve como identificador único para o React rastrear mudanças e otimizar a renderização.

```jsx
<Component key={item.id} {...item} />
```


# Styling e Dynamic Styling no React

Em React, é possível aplicar estilos de forma condicional ou dinâmica usando `className` e variáveis.  

---

## 1. Usando `className`

Você pode definir classes CSS diretamente no JSX usando o atributo `className`.

```jsx
<p className="minha-classe">Texto estilizado</p>
```

---

## 2. Dynamic Styling com Expressão Ternária

É comum querer alterar a classe de um elemento com base no estado do componente.  

```jsx
export default function App() {
    const [isSelected, setIsSelected] = React.useState(false);

    return (
        <div>
            <p className={isSelected ? "active" : undefined}>Style me!</p>
            <button onClick={() => setIsSelected(true)}>Toggle style</button>
        </div>
    );
}
```

- Se `isSelected` for `true` → `<p>` recebe a classe `"active"`.  
- Se `isSelected` for `false` → `<p>` não recebe classe (`undefined`).  

---

## 3. Passando Variáveis como Props

Você também pode passar variáveis para definir a classe dinamicamente:

```jsx
function Texto({ isActive }) {
    return <p className={isActive ? "active" : ""}>Styled Text</p>;
}
```

- O componente `<Texto>` recebe a prop `isActive`.  
- A classe é aplicada de acordo com o valor de `isActive`.  

---

# Mudando o Tipo de Tag em um Componente Dinamicamente

Em React, é possível alterar o tipo de tag de um componente de forma flexível. Aqui está um jeito simples de fazer isso:

> Observação importante: se você passar a prop com letra maiúscula (componente React ou tag HTML com letra maiúscula), não precisa declarar uma variável dentro do componente. Se passar uma tag HTML com letra minúscula, é necessário declarar a variável antes de usar.

---

## 1) Usando Fragmento `<></>`

**Componente:**

```jsx
export default function MeuComponente({ children }) {
  return <>{children}</>;
}
```

**Como chamar:**

```jsx
<MeuComponente>
  <p>Olá mundo!</p>
</MeuComponente>
```

---

## 2) Usando Props para passar uma tag HTML

**Componente:**

```jsx
export default function Tab({ children, ButtonsContainer }) {
  const Container = ButtonsContainer; // necessário apenas se for tag HTML com letra minúscula
  return <Container>{children}</Container>;
}
```

**Como chamar:**

```jsx
<Tab ButtonsContainer="div">
  <p>Olá mundo!</p>
</Tab>
```

---

## 3) Usando Props para passar um componente React

**Componente:**

```jsx
export default function Tab({ children, ButtonsContainer }) {
  return <ButtonsContainer>{children}</ButtonsContainer>; 
}

const Menu = ({ children }) => <nav>{children}</nav>;
```

**Como chamar:**

```jsx
<Tab ButtonsContainer={Menu}>
  <p>Olá mundo!</p>
</Tab>
```

> Componentes sempre devem ser passados com letra maiúscula.

---

## 4) Definindo uma prop padrão

**Componente:**

```jsx
export default function Tab({ children, ButtonsContainer = "div" }) {
  const Container = ButtonsContainer; 
  return <Container>{children}</Container>;
}
```

**Como chamar:**

```jsx
<Tab>
  <p>Olá mundo!</p>
</Tab>
```

Se ninguém passar a prop, ele usa a tag padrão (`div`).

# useState em React

Em React, **alterar uma variável normal de JavaScript não atualiza a interface automaticamente**. Isso acontece porque componentes React são executados uma vez e só atualizam a UI quando são "avisados". É aí que entram os **States**.

## O que é useState

- `useState` é um **React Hook** que cria variáveis reativas controladas pelo React. 
- Alterar um state com a função de update faz o React **atualizar a UI automaticamente**.
- Importação:
```javascript
import { useState } from "react";
```
> Todos os hooks do React começam com `use`.

## Regras de uso

- Só pode ser chamado dentro de **funções de componentes React** ou dentro de outros **React Hooks**.
- Deve ser chamado no **top-level** do componente, **não dentro de funções internas ou loops**.

## Sintaxe

`useState` retorna um array de 2 elementos:
```javascript
const [state, setState] = useState(valorInicial);
```
- `state` → valor atual do state
- `setState` → função que atualiza o state e dispara a renderização
- `valorInicial` → valor que o state terá inicialmente

### Exemplo básico

```javascript
function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
```

# Para que serve o React?

React é uma biblioteca JavaScript usada para criar **interfaces de usuário (UI)** de forma eficiente, permitindo alterações na página sem precisar recarregá-la.

## React = Programação de UI Declarativa

Com o React, você escreve interfaces de forma **declarativa** — ou seja, você descreve o que quer que apareça na tela, e o React cuida de como isso será atualizado.

## Por que usar React?

- **Menos passos para fazer as coisas acontecerem**: O código fica mais limpo e organizado.
- **JSX**: Com o JSX, você pode escrever HTML e JS juntos.
- **Componentes reutilizáveis**: Facilita a criação de componentes reutilizáveis, o que torna o desenvolvimento mais eficiente.

## Diferença entre JavaScript puro e React

- **Manipulação do DOM**:  
  - **JavaScript Puro**: Manipula o DOM diretamente e exige controle manual das atualizações.
  - **React**: Usa uma abordagem declarativa para atualizar o DOM automaticamente, tornando as atualizações mais eficientes.
  
- **Atualizações de UI**:  
  - **JavaScript Puro**: Você precisa controlar manualmente as atualizações de UI, o que pode ser complexo.
  - **React**: As atualizações da interface são feitas de forma automática e eficiente, sem a necessidade de intervenção manual.

- **Desenvolvimento e Manutenção**:  
  - **JavaScript Puro**: O desenvolvimento pode ser mais complexo, principalmente em UIs mais elaboradas.
  - **React**: Facilita o desenvolvimento e a manutenção de UIs complexas, graças à modularidade e reutilização de componentes.
  
