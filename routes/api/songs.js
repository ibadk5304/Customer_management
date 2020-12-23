var express = require('express');
var router = express.Router();

var Song = require('../../models/song')
//define endpoints or more routers

//Get all songs
router.get('/',function(req, res){
    // return all song data from Mongo
    res.header('x-mycustom-header', 'abc123')
    Song.find({},(err, songs) => {
        if(err) return res.status(400).send('Error')

        res.send(songs)
    })
})

// Get a specific song 
router.get('/:id',function(req, res){
    // return all song data from Mongo
    Song.findById(req.params.id,(err, song) => {
        if(err) return res.status(400).send('Error')
        if(!song) return res.status(404).send()
        res.send(song)
    })
})
//Create a song 

router.post('/', (req, res)=>{
    //create a song object
    const newSong = new Song(req.body)
    newSong.save(function(err,newSong){
        if(err){
            return res.status(400).send()
        };
        res.status(201).send(newSong)
    });
})
// Update a song 

router.delete('/:id',(req, res) => {
    //make sure it exists
    song.findById(req.params.id, (err, song) => {
        if(!song) return res.status(404).send()

        song.findByIdAndDelete(req.params.id, (err, result) => {
        
            if(err) return res.status(400).send('Error')
    
            //console.log(result)
            res.status(204).send()
        })
    })
    
})

module.exports = router;