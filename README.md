##FRAMEWORKS

Backend Server made with: [nodeJS](https://nodejs.org) and [express](http://expressjs.com/). (NodeJS é um javascript runtime e express é uma web framework que corre em cima do nodeJS. O express serve para facilitar a criação de um servidor e APIs.)

Frontend made with [AngularJS](https://angularjs.org/). (Angular é uma framework que corre no browser em cima do normal HTML e Javascript e serve para fazer web applications). Para a parte de ui (gŕaficos) usei [Angular Material](https://material.angularjs.org/latest/)

Database used: [MongoDB](https://www.mongodb.org/). (É uma NoSql db, das mais usadas muito boa).

Hoje em dia este é o state of the art para fazer web applications e servidores com APIs. A combinação destes componentes chama-se MEAN Stack -> Mongo, Express, Angular, Node. PHP era como se fazia sites mais tradicionais, hoje em dia está muito muito longe das novas tecnologias. Outras frameworks usadas são Django (Python), Flask (Python), outras em java. Para mim a melhor é node e para este tipo de projectos é sem dúvida a superior em termos de performance e facilidade de desenvolvimento.

##LEARN

Os cursos da codeschool são muito bons para começar e são grátis, têm várias coisas mas pode ver só os videos:

* Angular - https://www.codeschool.com/courses/shaping-up-with-angular-js
* Nodejs - https://www.codeschool.com/courses/real-time-web-with-node-js
* Express - http://campus.codeschool.com/courses/building-blocks-of-express-js/

##HOW TO RUN

Install nodeJS:
```
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install mongo:
```
sudo apt-get install mongodb
```

Install git (if not already installed):
```
sudo apt-get install git
```

Download cancioneiro:
```
git clone https://github.com/nuno-santos/cancioneiro
```

cd into our directory:
```
cd cancioneiro
```

Run npm install:
```
npm install
```

Start server:
```
npm start
```

That's it! Check localhost:3000. (If running on a cloud vm, check \<vm ip\>:3000, don't forget to open port 3000).

##ABOUT THE CODE

Tudo o que pertence à parte de frontend encontra-se:

* **Pasta public/ng/components:** Estes são os componentes do angular. Cada componente tem uma certa responsabilidade (division of concerns) para ser mais fácil o desenvolvimento de cada um em separado. Por exemplo o componente list é responsável por mostrar a lista de músicas.
* **Pasta public/ng/services:** Estes são os serviços do angular. São responsáveis por comunicar com a API do servidor e passar os dados aos componentes. Também são responsáveis para tratar da comunicação entre diferentes componentes. 
* **views/index.ejs:** Página inicial onde são incluidos todos os componentes do angular nesta única página (one page web site). Pode se notar o "<div ui-view ... ></div>" onde vão aparecer as diferentes views da aplicação consoante a navegação (login, lista de músicas, editor, etc).

As partes do backend importantes são:

* **bin/www e app.js:** scripts responsáveis por criar o servidor e indicar quais as routes a usar.
* **routes/api.js** script onde está contida a API. Portanto estão definidas todas as routes por exemplo a route "GET /api/songs" devolve a lista de músicas, a route "GET /api/songs/<id>" devolve a música correspondente ao "<id>".
* **custom_modules/auth_jwt.js:** script responsável por tratar da autenticação, feito com [JWT](https://jwt.io/), serve para autenticação com tokens sem precisar de cookies, é escalável e pronto para mobile apps.
