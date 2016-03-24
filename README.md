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

Tudo o que pertence à parte de frontend encontra-se na pasta public/ng. Estes são os componentes de angular. Tudo o que 
