var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

// listar novedades
router.get('/', async function(req, res, next) {
    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades 
    });
  });

// borrar novedades
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades')

});

// agregar la página para añadir novedad
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.bajada != "" && req.body.contenido != "" && req.body.imagen != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'No se cargó la novedad'
    }); 
  }
});

// modificar novedad
router.get('/modificar/:id', async (req, res, next) => {

  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});

// modificar: proceso Update
router.post('/modificar', async (req, res, next) => {
  try {
    let obj = {
      titulo: req.body.titulo,
      bajada: req.body.bajada,
      contenido: req.body.contenido,
      imagen: req.body.imagen
    }

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  }
  catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, message: 'No se modificó la novedad'
    })
  }
})


  module.exports = router;