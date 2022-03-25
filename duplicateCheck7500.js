function duplicateCheck() {
  const totalFiles = 7501;

  for (let i = 1; i <= totalFiles+1; i++) {
    let a_Path = `${__dirname}/build/Final/json/${i}.json`;
    let jsonA = require(a_Path);
    let a_Attribs = jsonA.attributes;
    if(i%100===0) console.log(i+"files checked");
    for (let j = i + 1; j <= totalFiles; j++) {
            
      let jsonB = require(`${__dirname}/build/Final/json/${j}.json`);
      let b_Attribs = jsonB.attributes;
      if (attribsEqual(a_Attribs, b_Attribs)) {
        console.log(`${j} is a duplicate of ${i}`);
      }
    }
  }
  console.log("Duplicate Check Completed!");
}

function attribsEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  let allSame = 0;
  for (let i = 0; i < a.length; i++) {
    let a_traitObj = a[i];
    for (let j = 0; j < b.length; j++) {
      let b_traitObj = b[j];
      if (JSON.stringify(a_traitObj) === JSON.stringify(b_traitObj)) {
        allSame++;
      }
    }
  }
  if (allSame === a.length) {
    return true;
  } else {

      return false;
  }
}

duplicateCheck();
