const express = require('express');
const router = express.Router();
const TransitPass = require('../models/TransitPass');

// Create new transit pass
router.post('/create', async (req, res) => {
  try {
    // Generate pass number in format: A25{MMDDHHMMSS}/1/{serial}
    const { passNo, serial } = await TransitPass.generatePassNo();

    const passData = {
      passNo: passNo,
      serial: serial,
      book: req.body.book,
      fromDateTime: req.body.fromDT,
      toDateTime: req.body.toDT,
      circle: 'BHADRAK',
      quarry: 'MANKIDIA - KA',
      licensee: 'SUSANTA KUMAR SAHOO',
      destination: req.body.dest,
      route: req.body.route,
      mineral: 'SAND',
      permitNo: req.body.permit,
      permitDate: req.body.permitDate,
      quantity: req.body.qty,
      vehicle: req.body.vehicle,
      length: req.body.len,
      breadth: req.body.br,
      height: req.body.ht,
      cubicContent: req.body.cc,
      grossWeight: req.body.gw,
      tareWeight: req.body.tw,
      mineralWeight: req.body.mw,
      driverName: req.body.driverName,
      district: req.body.district,
      tahasil: req.body.tahasil,
      carrierType: req.body.carrierType
    };

    const newPass = new TransitPass(passData);
    await newPass.save();

    res.status(201).json({
      success: true,
      message: 'Transit Pass created successfully',
      data: newPass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating transit pass',
      error: error.message
    });
  }
});

// Get all transit passes
router.get('/all', async (req, res) => {
  try {
    const passes = await TransitPass.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: passes.length,
      data: passes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transit passes',
      error: error.message
    });
  }
});

// Get transit pass by ID
router.get('/:id', async (req, res) => {
  try {
    const pass = await TransitPass.findById(req.params.id);
    if (!pass) {
      return res.status(404).json({
        success: false,
        message: 'Transit pass not found'
      });
    }
    res.status(200).json({
      success: true,
      data: pass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transit pass',
      error: error.message
    });
  }
});

// Update transit pass
router.put('/:id', async (req, res) => {
  try {
    const pass = await TransitPass.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pass) {
      return res.status(404).json({
        success: false,
        message: 'Transit pass not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Transit pass updated successfully',
      data: pass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating transit pass',
      error: error.message
    });
  }
});

// Delete transit pass
router.delete('/:id', async (req, res) => {
  try {
    const pass = await TransitPass.findByIdAndDelete(req.params.id);
    if (!pass) {
      return res.status(404).json({
        success: false,
        message: 'Transit pass not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Transit pass deleted successfully',
      data: pass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting transit pass',
      error: error.message
    });
  }
});

module.exports = router;
