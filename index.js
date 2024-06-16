import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

const app = express();

let listarPets = [];
let listarInteressados = [];

// Configurar express para manipular corretamente os dados quando eles forem submetidos via método POST
app.use(express.urlencoded({ extended: true })); // Habilita a biblioteca query string via POST

app.use(session({
  secret: 'Minhawe12u9391',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 15
  }
}));

app.use(cookieParser());

// Função para verificar se o usuário está autenticado
function usuarioEstaAutenticado(requisicao, resposta, next) {
  if (requisicao.session.usuarioAutenticado) {
    next(); // Permitir que a requisição continue a ser processada
  } else {
    resposta.redirect('/login.html');
  }
}

function cadastrarPets(requisicao, resposta) {
  const nome = requisicao.body.nome;
  const raca = requisicao.body.raca;
  const idade = requisicao.body.idade;

  // Verificando se os campos não estão vazios
  if (nome && raca && idade) {
    listarPets.push({
      nome: nome,
      raca: raca,
      idade: idade,
    });
    resposta.redirect('/listarPets');
  } else {
    resposta.write(`
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cadastro de Pets</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <div class="container m-5">
        <form method="POST" action="/cadastrarPets" class="border row g-3 needs-validation" novalidate>
            <fieldset>
            <legend>Cadastro de Pets</legend>
            <div class="col-md-4">
                <label for="nome" class="form-label"> Nome: </label>
                <input type="text" class="form-control" id="nome" name="nome" value="${nome}" required>`);
    if (!nome) {
      resposta.write(`<div class="alert alert-dark" role="alert">
        Informe o nome do Pet.
      </div>`);
    }
    resposta.write(` </div>
    <div class="col-md-4">
      <label for="raca" class="form-label">Raça</label>
      <input type="text" class="form-control" id="raca" name="raca" value="${raca}" required>`);
    if (!raca) {
      resposta.write(`<div class="alert alert-dark" role="alert">
        Informe a raça do Pet.
      </div>`);
    }
    resposta.write(`</div>
    <div class="col-md-4">
      <label for="idade" class="form-label">Idade (em anos)</label>
      <input type="text" class="form-control" id="idade" name="idade" value="${idade}" required>`);
    if (!idade) {
      resposta.write(`<div class="alert alert-dark" role="alert">
        Informe a idade do Pet.
      </div>`);
    }
    resposta.write(`</div>
        <div class="col-12">
        <button class="btn btn-primary" type="submit">Cadastrar</button>
        <a class="btn btn-secondary" href="/"> Voltar </a>
        </div>
        </fieldset>
        </form>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
        </html>`);
    resposta.end(); // Finaliza o envio da resposta
  }
}

function cadastrarInteressado(requisicao, resposta) {
  const nomeI = requisicao.body.nomeI;
  const email = requisicao.body.email;
  const telefone = requisicao.body.telefone;

  // Verificando se os campos não estão vazios
  if (nomeI && email && telefone) {
    listarInteressados.push({
      nomeI: nomeI,
      email: email,
      telefone: telefone,
    });
    resposta.redirect('/listarInteressados');
  } else {
    resposta.write(`
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cadastro de Interessados</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <div class="container m-5">
        <form method="POST" action="/cadastrarInteressado" class="border row g-3 needs-validation" novalidate>
            <fieldset>
            <legend>Cadastro de Interessados</legend>
            <div class="col-md-4">
                <label for="nomeI" class="form-label"> Nome: </label>
                <input type="text" class="form-control" id="nomeI" name="nomeI" value="${nomeI}" required>`);
    if (!nomeI) {
      resposta.write(`<div class="alert alert-dark" role="alert">
        Informe o nome.
      </div>`);
    }
    resposta.write(` </div>
    <div class="col-md-4">
      <label for="email" class="form-label">Email</label>
      <input type="text" class="form-control" id="email" name="email" value="${email}" required>`);
    if (!email) {
      resposta.write(`<div class="alert alert-dark" role="alert">
        Informe o email.
      </div>`);
    }
    resposta.write(`</div>
    <div class="col-md-4">
      <label for="telefone" class="form-label">Telefone</label>
      <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}" required>`);
    if (!telefone) {
      resposta.write(`<div class="alert alert-dark" role="alert">
        Informe o telefone.
      </div>`);
    }
    resposta.write(`</div>
        <div class="col-12">
        <button class="btn btn-primary" type="submit">Cadastrar</button>
        <a class="btn btn-secondary" href="/"> Voltar </a>
        </div>
        </fieldset>
        </form>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
        </html>`);
    resposta.end(); // Finaliza o envio da resposta
  }
}

function autenticarUsuario(requisicao, resposta) {
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  if (usuario == 'admin' && senha == '123') {
    requisicao.session.usuarioAutenticado = true;
    resposta.cookie('dataUltimoAcesso', new Date().toLocaleString(), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30
    });
    resposta.redirect('/');
  } else {
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<title>Resultado do Cadastro</title>');
    resposta.write('<meta charset="utf-8">');
    resposta.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resposta.write('</head>');
    resposta.write('<body>');
    resposta.write(`<p>Usuário ou senha inválidos!</p>`);
    resposta.write('<input type="button" value="Voltar" onclick="history.go(-1)"/>');
    if (requisicao.cookies.dataUltimoAcesso) {
      resposta.write('<p>');
      resposta.write('Seu último acesso foi em: ' + requisicao.cookies.dataUltimoAcesso);
      resposta.write('</p>')
    }
    resposta.write('</body>');
    resposta.write('</html>');
    resposta.end();
  }
}

app.post('/login', autenticarUsuario);
app.get('/login', (req, resp) => {
  resp.redirect('/login.html');
});
app.get('/logout', (req, resp) => {
  req.session.destroy();
  resp.redirect('/login.html');
});

// Permitir que os usuários acessem o conteúdo da pasta público
app.use(express.static(path.join(process.cwd(), 'publico')));

// Permitir que os usuários acessem o conteúdo da pasta protegido, verificando antes se o usuário está autenticado
app.use(usuarioEstaAutenticado, express.static(path.join(process.cwd(), 'protegido')));

// Quando um usuário enviar uma requisição do tipo POST para o endpoint 'http://localhost:3000/cadastrarUsuario'
// executa a função 'cadastrarUsuario()'
app.post('/cadastrarPet', usuarioEstaAutenticado, cadastrarPets);
app.post('/cadastrarInteressado', usuarioEstaAutenticado, cadastrarInteressado);

app.get('/listarPets', usuarioEstaAutenticado, (req, resp) => {
  resp.write('<html>');
  resp.write('<head>');
  resp.write('<title>Pets cadastrados</title>');
  resp.write('<meta charset="utf-8">');
  resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
  resp.write('</head>');
  resp.write('<body>');
  resp.write('<h1>Pets cadastrados</h1>');
  resp.write('<table class="table table-striped">');
  resp.write('<tr>');
  resp.write('<th>Nome</th>');
  resp.write('<th>Raça</th>');
  resp.write('<th>Idade</th>');
  resp.write('</tr>');
  for (let i = 0; i < listarPets.length; i++) {
    resp.write('<tr>');
    resp.write(`<td>${listarPets[i].nome}</td>`);
    resp.write(`<td>${listarPets[i].raca}</td>`);
    resp.write(`<td>${listarPets[i].idade}</td>`);
    resp.write('</tr>');
  }
  resp.write('</table>');
  resp.write('<a href="/">Voltar</a>');
  resp.write('<p>');
  if (req.cookies.dataUltimoAcesso) {
    resp.write('<p>');
    resp.write('Seu último acesso foi em: ' + req.cookies.dataUltimoAcesso);
    resp.write('</p>')
  }
  resp.write('</p>');
  resp.write('</body>');
  resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
  resp.write('</html>');
  resp.end();
});

app.get('/listarInteressados', usuarioEstaAutenticado, (req, resp) => {
  resp.write('<html>');
  resp.write('<head>');
  resp.write('<title>Interessados cadastrados</title>');
  resp.write('<meta charset="utf-8">');
  resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
  resp.write('</head>');
  resp.write('<body>');
  resp.write('<h1>Lista de interessados</h1>');
  resp.write('<table class="table table-striped">');
  resp.write('<tr>');
  resp.write('<th>Nome</th>');
  resp.write('<th>Email</th>');
  resp.write('<th>Telefone</th>');
  resp.write('</tr>');
  for (let i = 0; i < listarInteressados.length; i++) {
    resp.write('<tr>');
    resp.write(`<td>${listarInteressados[i].nomeI}</td>`);
    resp.write(`<td>${listarInteressados[i].email}</td>`);
    resp.write(`<td>${listarInteressados[i].telefone}</td>`);
    resp.write('</tr>');
  }
  resp.write('</table>');
  resp.write('<a href="/">Voltar</a>');
  resp.write('<p>');
  if (req.cookies.dataUltimoAcesso) {
    resp.write('<p>');
    resp.write('Seu último acesso foi em: ' + req.cookies.dataUltimoAcesso);
    resp.write('</p>')
  }
  resp.write('</p>');
  resp.write('</body>');
  resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
  resp.write('</html>');
  resp.end();
});

app.listen(porta, host, () => {
  console.log(`Servidor rodando em: http://${host}:${porta}`);
});
