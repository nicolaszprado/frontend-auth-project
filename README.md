# Sistema de Autenticação - React

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 📋 Sobre o Projeto

Este projeto implementa um sistema de autenticação completo em React utilizando JavaScript puro e CSS. O sistema inclui páginas de login, registro, rota protegida e uma página inicial para usuários autenticados. (foi criado com objetivo de ser integrado a outro projeto meu: https://github.com/nicolaszprado/auth-project-nicolasz)

## 🚀 Características

- ✅ Sistema de autenticação completo (login/registro)
- 🔒 Rotas protegidas com redirecionamento automático
- 🔄 Gestão de estado com Context API
- 📱 Design responsivo
- 📄 Validação de formulários
- 🌐 Suporte para comunicação com API

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── InputField.jsx     # Componente reutilizável para campos de formulário
│   └── ProtectedRoute.jsx # Componente para rotas protegidas
├── context/
│   └── AuthContext.jsx    # Context API para gerenciar autenticação
├── pages/
│   ├── HomePage.jsx       # Página principal após login
│   ├── LoginPage.jsx      # Página de login
│   ├── NotFound.jsx       # Página 404
│   └── RegisterPage.jsx   # Página de registro
├── services/
│   └── authService.js     # Serviço de autenticação com API
├── styles/
│   ├── AuthPages.css      # Estilos para as páginas de autenticação
│   ├── HomePage.css       # Estilos para a página principal
│   ├── InputField.css     # Estilos para componentes de entrada
│   └── NotFound.css       # Estilos para página 404
├── App.js                 # Componente principal com rotas
└── main.js                # Ponto de entrada da aplicação
```

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **React Router**: Sistema de roteamento para navegação entre páginas
- **Context API**: Gerenciamento de estado global
- **CSS**: Estilização sem dependências externas

## 📦 Instalação e Uso

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em seu navegador:
```
http://localhost:8080
```

## 🔧 Configuração

Para conectar com sua própria API, edite o arquivo `src/services/authService.js` e atualize a constante `API_URL` com a URL da sua API:

```javascript
const API_URL = "https://sua-api.com";
```

## 🖥️ Páginas

### Página de Login
- Formulário com validação de email e senha
- Opção "Lembrar-me"
- Link para a página de registro
- Gestão de erros de autenticação

### Página de Registro
- Formulário com validação completa
- Nome de usuário, email e senha
- Confirmação de senha
- Gestão de erros (ex: email já cadastrado)

### Página Inicial
- Exibe informações do usuário logado
- Botão de logout
- Interface protegida para usuários autenticados

### Página 404
- Página de erro personalizada
- Link para retornar à página inicial

## 🔐 Segurança

O sistema utiliza:
- Armazenamento de tokens JWT no localStorage
- Rotas protegidas com redirecionamento automático
- Validação de formulários no lado cliente

## 👤 Autenticação

A autenticação é gerenciada através do `AuthContext`, que fornece:

- Estado do usuário atual
- Função de login
- Função de logout
- Estado de carregamento

## 💡 Uso da Autenticação

```jsx
// Em qualquer componente:
import { useAuth } from '../context/AuthContext';

function MeuComponente() {
  const { user, login, logout, loading } = useAuth();
  
  // Seu código aqui
}
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
