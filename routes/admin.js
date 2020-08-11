const express = require('express');
const router = express.Router();
const Game = require('../models/Game');



//get all game
router.get('/games',async (req,res)=>{
    try{
        const games = await Game.find();
        res.json(games);
    }catch (err){
        res.status(500).json({message:err.message});
        
    }

});

//get one game
router.get('/games/:id',getGame, (req,res)=>{
    res.send(res.game);

});
//post new game
router.post('/',async (req,res)=>{
    const game = new Game({
        game_id : req.body.game_id,
        title: req.body.title,
        cdkey: req.body.cdkey,
        picture: req.body.picture,
        price: req.body.price
    });
    try{
        const newGame = await game.save();
        res.status(201).json(newGame);
    }catch(err){
        res.status(400).json({message:err.message});

    }

});
//Update one game
router.patch('/:id',getGame, async(req,res)=>{
    if(req.body.title !=null){
        res.game.title = req.body.title;
    }
    if(req.body.cdkey !=null){
        res.game.cdkey = req.body.cdkey;
    }
    if(req.body.picture !=null){
        res.game.picture = req.body.picture;
    }
    if(req.body.price !=null){
        res.game.price = req.body.price;
    }
    try{
        const updatedGame = await res.game.save();
        res.json(updatedGame);
    }catch(err){
        res.status(400).json({message:err.message});
    }

});
//Delete one game
router.delete('/:id',getGame, async (req,res)=>{
    try{
        await res.game.remove();
        res.json({message: 'Deleted game'});
    }catch(err){
        res.status(500).json({msg:err.message});
    }

});

// Function that finds a game in the DB
async function getGame(req,res,next){
    let game;
    try{
        game = await Game.findById(req.params.id) // maybe change to ID and not game_id
            if(game == null){
                return res.status(404).json({msg:'Cannot find game'});
            }
    }catch(err){
      return res.status(500).json({msg:err.message});
    }

    res.game = game;
    next();

}


module.exports = router;