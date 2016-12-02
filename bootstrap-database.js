const path = require('path');
const app = require(path.resolve(__dirname, './server/server'));
const ds = app.datasources.ms;

const Game = app.models.game;
const Alignment = app.models.alignment;
const MafiaRole = app.models.mafiaRole;
const Slot = app.models.slot;

const async = require('async');

function createGame(cb) {
    Game.create({
        "id": 1,
        "name": "Newbie 1756",
        "topicId": 69128
    }, cb);
}

function createAlignments(cb) {
    Alignment.create([
        {
            "id": 1,
            "name": "Town", 
            "color": "#008000"
        },
        {
            "id": 2,
            "name": "Mafia", 
            "color": "#FF0000"
        }
    ], cb);
}

function createRoles(cb) {
    MafiaRole.create([
        {
            "id": 1,
            "name": "Vanilla",
            "alignmentId": 1
        },
        {
            "id": 2,
            "name": "Cop",
            "alignmentId": 1
        },
        {
            "id": 3,
            "name": "Doctor",
            "alignmentId": 1
        },
        {
            "id": 4,
            "name": "Goon",
            "alignmentId": 2
        },
        {
            "id": 5,
            "name": "Roleblocker",
            "alignmentId": 2
        }
    ], cb);
}

function createSlots(cb) {
    Slot.create([
        {
            "number": 1,
            "player": "Accountant",
            "gameId": 1,
            "mafiaRoleId": 4
        },
        {
            "number": 2,
            "player": "Charloux",
            "gameId": 1,
            "mafiaRoleId": 3
        },
        {
            "number": 3,
            "player": "Manuel87",
            "gameId": 1,
            "mafiaRoleId": 5
        },
        {
            "number": 4,
            "player": "Morning Tweet",
            "gameId": 1,
            "mafiaRoleId": 1
        },
        {
            "number": 5,
            "player": "MisaTange",
            "gameId": 1,
            "mafiaRoleId": 1
        },
        {
            "number": 6,
            "player": "NorskaBlue",
            "gameId": 1,
            "mafiaRoleId": 1,
            "aliases": ["NB"]
        },
        {
            "number": 7,
            "player": "thatsit",
            "gameId": 1,
            "mafiaRoleId": 1
        },
        {
            "number": 8,
            "player": "Transcend",
            "gameId": 1,
            "mafiaRoleId": 1
        },
        {
            "number": 9,
            "player": "WeCanSimplyBeOurselves",
            "gameId": 1,
            "mafiaRoleId": 2
        }
    ], cb)
}

ds.automigrate(err => {
    if (err) throw err;

    async.series([
        createGame,
        createAlignments,
        createRoles,
        createSlots
    ], err => {
        if (err) throw err;
    });
});