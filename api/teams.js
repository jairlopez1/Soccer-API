const Team = require('../models/team');
const router = require('express').Router();

//Get team with given name
//http://localhost:8000/api/teams/?name=Real_Madrid
router.get('/find', function(req, res) {
    if (req.query.name) {
        Team.find({ name: req.query.name }, function(err, stu) {
            if (err) {
                res.status(400).json('mesage: Invalid team name');
            } else if (stu.length > 0) {
                res.json(stu[0]);
            } else {
                res.sendStatus(404);
            }
        });
    }
    else{
        Team.find({}, function(err, stu) {
            if (err) {
                res.status(400).json('mesage: Invalid team name');
            } else if (stu) {
                res.json(stu);
            } else {
                res.sendStatus(404);
            }
        });
    }
});

// Get team with given ID
// http://localhost:8000/api/teams/60656a0afe556c79c1c67b87
router.get('/:id', function(req, res) {
    Team.findById(req.params.id, function(err, stu) {
        if (err) {
            res.status(400).json('mesage: Invalid team ID');
        } else if (stu) {
            res.json(stu);
        } else {
            res.sendStatus(404);
        }
    });
});

// Add new team
router.post('/', function(req, res) {
    // Create a new team from JSON request body
    const team = new Team({
        _id: req.body._id,
        name: req.body.name,
        country: req.body.country,
        trophies: req.body.trophies,
        players: req.body.players
    });

    // Save team and return it as JSON
    team.save(function(err, stu) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(stu);
        }
    });
});

// Update existing team
router.put('/:id', function(req, res) {
    // Update the team with values from the request
    Team.updateOne({ _id: req.params.id }, req.body, function(err, result) {
        if (err) {
            res.status(400).send(err);
        } else if (result.n === 0) {
            res.status(404).json({ message: 'Team not found' });
        } else {
            res.sendStatus(204);
        }
    });
});


// Delete existing team with the given ID in the URL
router.delete('/:id', function(req, res) {
    // Delete this team
    Team.deleteOne({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.status(400).send(err);
        } else if (result.n === 0) {
            res.status(404).json({ message: 'Team not found' });
        } else {
            res.sendStatus(204);
        }
    });
});

router.delete('/', function(req, res) {
    res.status(404).json({ message: 'Team not found' });
});

module.exports = router;