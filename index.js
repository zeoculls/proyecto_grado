var express = require("express");
var bodyParser = require("body-parser")
var Sequelize = require('sequelize')
var path = require('path')
var app = express();


var PORT = process.env.PORT || 4000
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/partials');
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log('process.env.DATABASE_URL',process.env.DATABASE_URL);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
})

if (process.env.NODE_ENV === 'production') {
  console.log('ENTORNO:',process.env.NODE_ENV);
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres"
  });
}
else {
  console.log('ENTORNO:',process.env.NODE_ENV);
  var sequelize = new Sequelize('Javier', 'Javier', '', {
      dialect: "postgres",
      port: 5432
  });
}

app.listen(PORT,function(){
    console.log("Node Version:", process.version);
    console.log("Sirviendo puerto 4000");
  
})

app.post('/save', function(req, res) {
    console.log('recado',req.body);
    console.log('recado precio',req.body.precio);
    var rowSize, columnSize;
    var colors = ["green",
            "darkBlue",
            "red",
            "yellow",
            "pink",
            "darkBlue",
            "purple",
            "deepBlue",
            "lightPurple",
            "yellow"]

    var randColor = colors[Math.floor((Math.random() * 10))];
    console.log('Precio', req.body.precio);
    if(req.body.precio < 20) {
        rowSize = 1;
        columnSize = 2;
    }
    if(req.body.precio > 20 &&  req.body.precio < 50) {
        rowSize = 2;
        columnSize = 2;
    }
    if(req.body.precio > 50 &&  req.body.precio < 100) {
        rowSize = 3;
        columnSize = 3;
    }
    if(req.body.precio > 100)
        {
        rowSize = 3;
        columnSize = 3;
    }
    Servicio.create({ 
      titulo: req.body.title, 
      descripcion: req.body.descripcion, 
      precio: req.body.precio, 
      categoria: req.body.categorias, 
      ofertaDemanda: req.body.oferta, 
      codigoPostal: '28033', 
      usuario: 'Javier', 
      color: randColor, 
      row: rowSize, 
      column: columnSize, 
      posicion: 'segundo'})
})

app.get('/servicios', function(req, res) {
    Servicio.findAll().then(function(servicios){
        res.send(servicios)
    })
})

app.post('/servicioId', function(req, res) {
    console.log('Servidor POST Busqueda by id:-->', req.body)

    Servicio.find({
            where: { id: req.body.id }})   
    .then(function(servicio){
        res.send(servicio)
    })
})

app.get('/users', function(req, res) {
    User.findAll().then(function(users){
       res.send(users)
    })
})

var Servicio = sequelize.define('servicio', {
  titulo: { type: Sequelize.STRING, field: 'titulo' },
  descripcion: { type: Sequelize.STRING, field: 'descripcion' },
  precio: { type: Sequelize.INTEGER, field: 'precio' },
  color: { type: Sequelize.STRING, field: 'color'},
  categoria: { type: Sequelize.STRING, field: 'categoria' },
  ofertaDemanda: { type: Sequelize.STRING, field: 'ofertaDemanda' },
  codigoPostal: { type: Sequelize.INTEGER, field: 'codigoPostal' },
  //usuario: { type: Sequelize.STRING, field: 'usuario' },
  row: { type: Sequelize.INTEGER, field: 'row'},
  column: { type: Sequelize.INTEGER, field: 'column'},
  contacto: { type: Sequelize.STRING, field: 'contacto' }
  },
 {
  freezeTableName: true // Model tableName will be the same as the model name
})

var User = sequelize.define('user', {
  usuario: {
    type: Sequelize.STRING,
    field: 'usuario', // Will result in an attribute that is firstName when user facing but first_name in the database
    primaryKey: true
  },
  nombre: { type: Sequelize.STRING, field: 'nombre' },
  descripcion: { type: Sequelize.STRING, field: 'descripcion' },
  apellidos: { type: Sequelize.STRING, field: 'apellidos' },
  direccion: { type: Sequelize.STRING, field: 'direccion'},
  codigoPostal: { type: Sequelize.INTEGER, field: 'codigoPostal' },
  fechaNacimiento: { type: Sequelize.DATE, field: 'fechaNacimiento' },
  email: { type: Sequelize.STRING, field: 'email'},
  contacto: { type: Sequelize.STRING, field: 'contacto'},

  fotoAvatar: { type: Sequelize.STRING, field: 'fotoAvatar'},
}, {
  freezeTableName: true 
});

var Categoria = sequelize.define('categoria', {
  categoria: { type: Sequelize.STRING, field: 'categoria', primaryKey: true
 },
  descripcion: { type: Sequelize.STRING, field: 'descripcion' },
  color: { type: Sequelize.STRING, field: 'color' },
  },
{
  freezeTableName: true 
});

var Alerta = sequelize.define('alerta', {
  usuario: { type: Sequelize.STRING, field: 'categoria'},
  categoria: { type: Sequelize.STRING, field: 'descripcion' },
  ofertaDemanda: { type: Sequelize.STRING, field: 'ofertaDemanda' },
  codigoPostal: { type: Sequelize.INTEGER, field: 'codigoPostal' },
  },
{
  freezeTableName: true 
});


Servicio.belongsTo(User,{foreignKey: 'usuario'});
Servicio.belongsTo(Categoria,{foreignKey: 'categoria'});
Alerta.belongsTo(User,{foreignKey: 'usuario'});
Alerta.belongsTo(Categoria,{foreignKey: 'categoria'});

//True fuerza la sincronizacion de la base de datos, si no es
//igual se borra todo el contido DROP Y CREATE TABLE
var DB = false
Categoria.sync({force: DB})
User.sync({force: DB})
Servicio.sync({force: DB})
Alerta.sync({force: DB})
//https://serviciomania.herokuapp.com/ | https://git.heroku.com/serviciomania.git


