# NextWave — Sprint 4

Evolução do projeto da Sprint 3 para React. A NextWave apresenta a Jovi Smart Camera, uma demonstração de captura e organização de imagens de aula por matéria.

## Tecnologias utilizadas

- React e JavaScript
- Vite
- React Router
- Tailwind CSS
- CSS original da Sprint 3
- API mockada local

## Requisitos

- Node.js e npm
- Navegador atualizado

## Instalação e execução

Na pasta raiz do projeto, onde está o arquivo `package.json`, instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço indicado pelo Vite, normalmente `http://localhost:5173`.

## Funcionalidades

- Páginas responsivas para desktop, tablet e celular.
- Rotas públicas para a página inicial, galeria e equipe.
- Rota privada para a câmera.
- Envio de imagem com prévia e feedback demonstrativo.
- Organização das capturas por matéria, incluindo matérias personalizadas.
- Salvamento local das matérias e imagens no navegador.

## Rotas

- `/` — página inicial
- `/galeria` — galeria
- `/equipe` — integrantes
- `/entrar` — entrada demonstrativa
- `/app` — câmera e biblioteca de capturas, protegida por rota privada

## API e armazenamento

A API mockada em `src/services/mockApi.js` simula respostas para o feedback da câmera e para a lista de matérias. A pontuação é demonstrativa: não mede nitidez ou iluminação de verdade, e as imagens não são enviadas a um servidor.

As capturas e matérias personalizadas ficam no `localStorage` do navegador utilizado. Não há back-end ou servidor adicional para iniciar.

## Acesso de teste

Na tela de entrada, informe qualquer nome. A demonstração não possui senha nem autenticação real.

## Organização do código

- `src/components` — cabeçalho, rodapé e proteção de rota.
- `src/context` — estado compartilhado da sessão demonstrativa.
- `src/hooks` — hook `useCapture`, que separa a lógica da câmera da interface.
- `src/pages` — páginas React.
- `src/services` — API mockada.
- `src/css/estilo.css` — estilos originais da Sprint 3.
- `src/img` — imagens do projeto.

O projeto utiliza componentes React, props, hooks nativos (`useState` e `useEffect`), o hook personalizado `useCapture` e rotas públicas e privadas.

## Uso de inteligência artificial

A equipe utilizou o OpenAI Codex como apoio para planejar a estrutura em React, organizar componentes, rotas e implementar a API. A equipe revisou e adaptou as sugestões ao projeto da Sprint 3.

## Deploy

- Deploy na Vercel: https://sprint4front-web-navy.vercel.app/

## Integrantes

Consulte `INTEGRANTES.TXT` para os nomes completos e RMs dos integrantes.