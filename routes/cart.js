const express = require('express');
const router = new express.Router();
const items = require('../fakeDb');
const ExpressError = require('../expressError');

router.get("/", (req,res,next) => {
    return res.json({ items: items });
})

router.post("/", (req,res,next) => {
    const newItem = {
        name: req.body.name,
        price: req.body.price,
    };

    items.push(newItem);
    res.status(201).json({ item: newItem });
})

router.get("/:name", ( req ,res ,next ) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if( foundItem === undefined ){
        throw new ExpressError("Item not found", 404);
    }
    return res.json({item: foundItem});
})

router.patch("/:name", ( req, res, next) => {
    const editItem = items.find(item => item.name === req.params.name);
    if( foundItem === undefined ){
        throw new ExpressError("Item not found", 404);
    }
    editItem.name = req.body.name;
    editItem.price = req.body.price;
    return res.json({item: editItem});
})

router.delete('/:name', (req, res, next) => {
    const deleteItem = items.find(item => item.name === req.params.name);
    if( foundItem === -1 ){
        throw new ExpressError("Item not found", 404);
    }
    items.splice(deleteItem, 1);
    res.json({message: "Item Deleted"});
})

module.exports = router;