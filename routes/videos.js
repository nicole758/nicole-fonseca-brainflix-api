const express = require('express');
const router = express.Router() // To use router, insrtantiate it like this
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

function readAthletesFile() {
    const athletesList = fs.readFileSync("./data/athletes.json");
    const parsedData = JSON.parse(athletesList);
    return parsedData;
}

router.get("/", (req, res) => {
    const athletes = readAthletesFile();
    res.json(athletes);
});

// POST endpoint to add a athlete
router.post("/", (req, res) => {    
    // Make a new athlete with a unique id
    console.log(req.body);
    const newAthlete = {
        id: uuidv4(),
        name: req.body.name,
        nickname: req.body.nickname,
    };

    // 1. Read the current athletes array
    // 2. Add to the athletes array
    // 3. Write the entire new athletes array to the file
    const athletes = readAthletesFile();
    athletes.push(newAthlete);
    fs.writeFileSync("./data/athletes.json", JSON.stringify(athletes));

    // Respond with the athlete that was created
    res.status(201).json(newAthlete);
});

module.exports = router;
