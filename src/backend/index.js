//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;
const fs = require('fs');
var express = require('express');
var app = express();
var utils = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//Ejercicio 3
var datos = require('./datos.json');
const { RSA_NO_PADDING } = require('constants');

//Ejercicio 4
app.get('/devices/', function(req, res) {
    //res.send(datos);
    res.json(datos);
});

//Ejercicio 5
//Espera una consulta al endpoint EJ /devices/1
//Parámetro id = el id del dispositivo a buscar
// devuelve el dispositivo con el id que viene del parametro
app.get('/devices/:id', function(req, res) {
    let datosFiltrados = datos.filter(item => item.id == req.params.id);
    res.json(datosFiltrados[0]);
});

//Ejercicio 6
//Espera recibir {id:1,state:1/0} , impacta el cambio y lo devuelve
app.post('/devices/', function(req, res) {
    let datosFiltrados = datos.filter(item => item.id == req.body.id);
    if (datosFiltrados.length > 0) {
        datosFiltrados[0].state = req.body.state;
    }
});


// Endpoint para eliminar un dispositivo por id
app.post('/devices/delete/', function(req,res){
    let datosFiltrados = datos.filter(item => item.id != req.body.id);
    datos = datosFiltrados;
    res.send("eliminado")

});


app.post('/devices/add/', function(req,res){
    // Crea nuevo id en 1
    let newId = 1;
    // Ids usados por otros dispositivos
    let usedIds = [];
    datos.forEach(element => {
        usedIds.push(element.id)
    });
    // Aumenta en 1 el id hasta encontrar uno sin usar
    while (usedIds.includes(newId)){
        newId += 1;
    }
    
    // Agrega el nuevo dispositivo al JSON datos
    datos.push({"id":newId,
                 "name":req.body.name,
                 "description":req.body.description,
                 "state":req.body.state
                    })
    res.send('agregado')
})

//=======[ Main module code ]==================================================
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================