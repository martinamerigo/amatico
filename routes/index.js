//jshint esversion:8

const express = require('express');
const router = express.Router();

//model
const Station = require('../model/station');
const Transition = require('../model/transition');

//local function
const {
  calculatedistance,
  calculatecarbon,
  calculateprice
} = require('../routes/function.js');

router.get('/', async (req, res) => {
  // const newTraction = new Traction({
  //   traction: '1'
  // });
  // await newTraction.save();
  var liststations= await Station.find({});
  var dist ;
  var carbonkg;
  var pricecarbon;
  res.render('index',{
    pricecarbon,
    dist,
    liststations,
    carbonkg
  });
});

router.get('/inputsta', async (req, res) => {
  const liststations = await Station.find();
  const listtransitions = await Transition.find();
  // const newTraction = new Traction({
  //   traction: '1'
  // });
  // await newTraction.save();
  res.render('inputsta',{
    liststations,
    listtransitions
  });
});

router.post('/inputsta', (req, res) => {
  const {
    name,
    routes,
    sta
  } = req.body;
  let errors = [];
  const newSta = new Station({
    name,
    routes,
    sta
    });

    newSta.save()
          .then(station => {
            req.flash('success_msg', 'Station are now registered');
            res.redirect('/inputsta');
          });
});

router.get('/inputtrans', async (req, res) => {
  const liststations = await Station.find();
  const listtransitions = await Transition.find();
  // const newTraction = new Traction({
  //   traction: '1'
  // });
  // await newTraction.save();
  res.render('inputtrans',{
    liststations,
    listtransitions
  });
});

router.post('/inputtrans', (req, res) => {
  const {
    trans,
    from,
    to,
    distance,
    indicatoroptional
  } = req.body;
  let errors = [];
  const newTrans = new Transition({
    trans,
    from,
    to,
    distance,
    indicatoroptional
    });

    newTrans.save()
          .then(transition => {
            req.flash('success_msg', 'New Transition are now registered');
            res.redirect('/inputtrans');
          });
});

router.post('/carbclc', async (req, res) => {
  const liststations = await Station.find();
  const {
    from,
    to
  } = req.body;
  let errors = [];

  await Station.findOne({
    name: from
  })
  .then(stafrom => {
    if (stafrom) {}else{
      var dist ;
      var carbonkg;
      var pricecarbon;
      // User exists
      errors.push({
        msg: "Station is not registered"
      });
      res.render('index', {
        errors,
        dist,
        carbonkg,
        pricecarbon,
        liststations
      });
    }});

    await Station.findOne({
        name: to
      })
      .then(stato => {
        if (stato) {}else{
          var dist ;
          var carbonkg;
          var pricecarbon;
          // User exists
          errors.push({
            msg: "Station is not registered"
          });
          res.render('index', {
            errors,
            dist,
            carbonkg,
            pricecarbon,
            liststations
          });
        }});
    

  var dist = await calculatedistance(from,to);
  var carbonkg = await calculatecarbon(dist);
  var pricecarbon = await calculateprice(carbonkg);
  res.render('index',{
    dist,
    carbonkg,
    pricecarbon,
    liststations
  });
  console.log(errors)
});

module.exports = router;