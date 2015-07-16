var express = require("express");
var bodyParser = require("body-parser");
var Sequelize = require('sequelize');
var path = require('path');
var app = express();
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;  
var cookieParser = require('cookie-parser');

var auth = require('./public/routes/auth.js');
var users = require('./public/routes/users.js');

var PORT = process.env.PORT || 4000
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/partials');
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(cookieParser());
//app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 }));

app.use(session({secret: 'secret', 
                 saveUninitialized: true,
                 resave: true}));

app.use('/users',users);
app.use('/auth',auth);


// Simple route middleware to ensure user is authenticated.

passport.serializeUser(function(user, done){
    console.log('SEIRALIZE USER', user.id);
//    console.log('id:', user.id);    
    return done(null, user.id);
});

passport.deserializeUser(function(user ,done){
    console.log('DESEIRALIZE USER!:', user.id);
    done(null, user.id);
});

passport.use(new GoogleStrategy({
  clientID: '514182895063-jmjal17a7d5dgth23tof34t06sq4aohf.apps.googleusercontent.com',
  clientSecret: 'SQygJWZKcgnJ1cyD0M_cAliJ',
  returnURL: 'http://127.0.0.1:4000/auth/google/callback',
  callbackURL: 'http://localhost:4000/auth/google/callback',
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log('GoogleStrategy:', profile.id);
    done(null, profile);
  }
));





console.log('process.env.DATABASE_URL',process.env.DATABASE_URL);



app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
})

if (process.env.NODE_ENV === 'production') {
  console.log('ENTORNO Heroku:',process.env.NODE_ENV);
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres"
  });
}
else {
  console.log('ENTORNO Local:',process.env.NODE_ENV);
  var sequelize = new Sequelize('Javi', 'Javi', '', {
      dialect: "postgres",
      port: 5432
  });
}

app.listen(PORT,function(){
    console.log("Node Version:", process.version);
    console.log("Sirviendo puerto 4000");
  
})

app.post('/nuevoUsuario', function(req, res) {
    console.log('Usuario',req.body);
    Usuario.create({ 
      usuario: req.body.usuario, 
      nombre: req.body.nombre, 
      apellidos: req.body.apellidos, 
      direccion: req.body.direccion, 
      codigoPostal: req.body.codigoPostal, 
      fechaNacimiento: req.body.fechaNacimiento, 
      email: req.body.email, 
      contacto: req.body.contacto
      })
})

app.post('/save', function(req, res) {
    console.log('recado',req.body);
    console.log('recado owner',req.body.owner);
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
    if(req.body.precio <= 20) {
        rowSize = 2;
        columnSize = 3;
    }
    if(req.body.precio > 20 &&  req.body.precio <= 50) {
        rowSize = 2;
        columnSize = 3;
    }
    if(req.body.precio > 50 &&  req.body.precio < 100) {
        rowSize = 2;
        columnSize = 3;
    }
    if(req.body.precio > 100)
        {
        rowSize = 2;
        columnSize = 3;
    }
    Servicio.create({ 
      titulo: req.body.title, 
      descripcion: req.body.descripcion, 
      precio: req.body.precio, 
      categoria: req.body.categorias, 
      ofertaDemanda: req.body.oferta, 
      codigoPostal: '28033', 
      color: randColor, 
      row: rowSize, 
      column: columnSize, 
      owner: req.body.owner
      })
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

app.get('/usuarios', function(req, res) {
  Usuario.findAll().then(function(usuarios){
       res.send(usuarios)
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
  row: { type: Sequelize.INTEGER, field: 'row'},
  column: { type: Sequelize.INTEGER, field: 'column'},
  contacto: { type: Sequelize.STRING, field: 'contacto' }
  },
 {
  freezeTableName: true // Model tableName will be the same as the model name
})


var Usuario = sequelize.define('usuario', {
  usuario: { type: Sequelize.STRING, field: 'usuario', primaryKey: true },
  nombre: { type: Sequelize.STRING, field: 'nombre' },
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
  //usuario: { type: Sequelize.STRING, field: 'usuario'},
  categoria: { type: Sequelize.STRING, field: 'categoria' },
  alerta: { type: Sequelize.STRING, field: 'alerta', primaryKey: true},
  ofertaDemanda: { type: Sequelize.STRING, field: 'ofertaDemanda' },
  codigoPostal: { type: Sequelize.INTEGER, field: 'codigoPostal' },
  },
{
  freezeTableName: true 
});


Servicio.belongsTo(Usuario,{foreignKey: 'owner'});
Servicio.belongsTo(Categoria,{foreignKey: 'categoria'});
//Alerta.belongsTo(Usuario,{foreignKey: 'owner'});
//Alerta.belongsTo(Categoria,{foreignKey: 'categoria'});

//True fuerza la sincronizacion de la base de datos, si no es
//igual se borra todo el contido DROP Y CREATE TABLE
var DB = false
Categoria.sync({force: DB})
Servicio.sync({force: DB})
Usuario.sync({force: DB})
Alerta.sync({force: DB})
//https://serviciomania.herokuapp.com/ | https://git.heroku.com/serviciomania.git


app.get('/borrarDB', function(req, res) {
    console.log('Se invoca borrarDB');
    sequelize.dropAllTables();
    console.log('BorrarDB elimina BASE DE DATOS');
    res.end("<h1>Base de datos BORRADA</h1>");
})    

app.get('/cargarDB', function(req, res) {
    console.log('Se invoca cargarDB');

    Categoria.create({ 
      categoria: 'Transporte',
      descripcion:'',
      color:'darkBlue'
    })

    Categoria.create({ 
      categoria: 'Clases',
      descripcion:'',
      color:'lightPurple'
    })

    Categoria.create({ 
      categoria: 'Recados',
      descripcion:'',
      color:'red'
    })

    Categoria.create({ 
      categoria: 'Reparaciones',
      descripcion:'',
      color:'yellow'
    })

    Categoria.create({ 
      categoria: 'Asesoria',
      descripcion:'',
      color:'green'
    })

    Categoria.create({ 
      categoria: 'Otros',
      descripcion:'',
      color:'green'
    }) 

    Usuario.create({ 
      usuario: 'Javier',
      nombre: 'Javier',
      apellidos: 'Portabales' ,
      direccion: 'Querol' ,
      codigoPostal: '28033' ,
      fechaNacimiento: '1987/05/26' ,
      email: 'micorreo@gmail.com' ,
      contacto: '912 738 23 45'
    })
    console.log('CargarDB carga BASE DE DATOS');
    res.end("<h1>Base de datos Cargada</h1>");
})

//git add --a
/////git remote add origin https://github.com/zeoculls/proyecto_grado.git
//git commit -m 'problema' 
//git push -u origin master







