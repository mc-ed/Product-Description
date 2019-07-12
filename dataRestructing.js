const fs = require('fs')

fs.readFile('./public/fonts/lowes-icons.woff', (err, results) => {
    console.log(results[0])
    var arr = new Int32Array(Math.ceil(results.length / 4));
    for(let i = 0; i < arr.length; i++) {
        let val = 0;
        for(let j = 0;  j < 4; j++) {
            val += results[(i * 4) + j] << (8 * j);
        }
        arr.set([val], i);
    }
    fs.writeFile('./testing2.js', arr.toString() , (err) => {
        console.log(err)
    })
})



