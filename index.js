const fs = require('fs');

function getSubMaze(inizio, fine, maze) {

    let mazeArray = maze.split('\n');
    let startFound = false;
    let rawSubMaze = [];
    let subMaze = [];

    mazeArray.forEach((v, i) => {            
        if(v.includes(inizio)) {
            startFound = true;
        }
        if(startFound === true) {
            rawSubMaze.push(v);
        }
        if(v.includes(fine)) {
            startFound = false;
        }
    })

    let startPos = rawSubMaze[0].indexOf(inizio);
    let endPos = startPos + inizio.length;

    rawSubMaze.forEach((v,i) => {
        subMaze.push( v.substring(startPos, endPos) );
    })

    return subMaze;

}

fs.readFile('map.txt', 'utf8', (err, map) => {
    fs.readFile('maze.txt', 'utf8', (err, maze) => {
        let pass = "";
        const lines = map.split('\n');
        const mapArray = [];        
        // Trasformo il map in un array multidimensionale
        for (let i = 0; i < lines.length; i += 6) {
            mapArray.push([lines[i], lines[i + 1], lines[i + 2], lines[i + 3], lines[i + 4]])
        }
        // console.log(mapArray);
        mapArray.forEach((i, v) => {

            let startString = i[0];
            let endString = i[4];

            let subMaze = getSubMaze(startString, endString, maze);

            pass += subMaze[ i[1] ][ i[2] ];
        
        })
        
        console.log(pass);
        
    })
});