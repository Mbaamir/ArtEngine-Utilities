const fs = require("fs");

const checkTill = 7501;

checkImagesAre7500();
checkJsonsAre7500();
console.log("done");

function checkImagesAre7500() {
    console.log("main")
  for (let i = 1; i < checkTill; i++) {
      if (fs.existsSync(`${__dirname}/build/Final/images/${i}.png`)) {
        // Do something
   
        if(i%100===0){
          console.log(`$image ${i} exists`);
        }

      } else {
        console.log(`error in images ~${i}`);
      }
    }
  }


  function checkJsonsAre7500() {
    console.log("main")
  for (let i = 1; i < checkTill; i++) {
      if (fs.existsSync(`${__dirname}/build/Final/json/${i}.json`)) {
   
        if(i%100===0){
          console.log(`json ${i} exists`);
        }

      } else {
        console.log(`error in json ~${i}`);
      }
    }
  }
