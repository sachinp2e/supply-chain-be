const express = require("express");
const router = express.Router();
const Asset = require("../models/asset");
const axios = require("axios");

// @route    POST api/assets/add
// @desc     Add new assets
// @access   Public
router.post("/add-history", async (req, res) => {
  const { sku,txnHash } = req.body;

  try {
    const response = await axios.post(
      "https://dev-ks-testnet.p2eppl.com/v1/contract/query/ZP6jL8cuzpbEqBsiOQBrU10o8NKxkuN61720248529721/QueryAsset",
      {
        invokerId: "53B67963FD7EF602108516506AEC34A500B5534E",
        args: {
          assetID: sku,
        },
      },{headers:{'x-api-key':'WGzKF3r7rxAwPbCwShzpyzukByEP6uFjMfYqdLJtykcEEJREqfiGC68X6gmUKUZHsneT62626nFMDjpS5mHldfYQ0aq3MnxETwMFj30XtSlItQfA.DUDqelcNAhmUnn1C'}}
    );
    const result = response.data.result.result
    const newHistory = {
      location:result.Status.Location,
      status:result.Status.AssetStatus,
      txnHash,
    };
    const asset = await Asset.findOne({ sku });
    if (!asset) {
      const newAsset = new Asset({
        name:result.Name,
        description:result.Description,
        sku,
      });
      newAsset.history.push(newHistory);
      await newAsset.save();
      return res.json(newAsset);
    }
    asset.history.push(newHistory);
    await asset.save();
    res.json(asset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route    GET api/assets
// @desc     Get all assets
// @access   Public
router.get("/:sku/get-history", async (req, res) => {
  try {
    let asset = await Asset.findOne({ sku: req.params.sku })
    if(!asset){
        return res.status(400).json({ msg: 'Asset with the given SKU not found!' });
    }
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
