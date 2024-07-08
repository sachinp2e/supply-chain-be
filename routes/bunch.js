const express = require('express');
const router = express.Router();
const Asset = require('../models/bunchAssets');

// @route    POST api/assets/add
// @desc     Add new assets
// @access   Public
router.post('/add', async (req, res) => {
  const { sku } = req.body;
  const arr = sku.split(',')

  if (!Array.isArray(arr)) {
    return res.status(400).json({ msg: 'SKU must be an array of IDs' });
  }

  try {
    const assets = await Promise.all(arr.map(async (id) => {
      const newAsset = new Asset({ sku: id });
      return await newAsset.save();
    }));

    res.json(assets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/assets
// @desc     Get all assets
// @access   Public
router.get('/get', async (req, res) => {
    try {
      const assets = await Asset.find().sort({ createdAt: -1 });
      const result = assets.map((asset)=> asset?.sku)
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
