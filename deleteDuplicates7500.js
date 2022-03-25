const fs = require("fs");

const progressInterval = 2;

deleteDuplicates();

function deleteDuplicates() {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "##################### \nDeleting Duplicates \n########################"
  );

  const totalFiles = 13;

  for (let i = 1; i < totalFiles + 1; i++) {
    if (i % progressInterval === 0)
      console.log("\x1b[35m%s\x1b[0m", i + " files checked for duplicated");
    let isIthJsonMissing = !fs.existsSync(
      `${__dirname}/build/Final/json/${i}.json`
    );
    if (isIthJsonMissing) {
      continue;
    }
    let a_Path = `${__dirname}/build/Final/json/${i}.json`;
    let jsonA = require(a_Path);
    let a_Attribs = jsonA.attributes;
    for (let j = i + 1; j <= totalFiles; j++) {
      let isJthJsonMissing = !fs.existsSync(
        `${__dirname}/build/Final/json/${j}.json`
      );
      if (isJthJsonMissing) {
        continue;
      }

      let jsonB = require(`${__dirname}/build/Final/json/${j}.json`);
      let b_Attribs = jsonB.attributes;
      if (attribsEqual(a_Attribs, b_Attribs)) {
        try {
          fs.unlinkSync(`${__dirname}/build/Final/json/${j}.json`);
          fs.unlinkSync(`${__dirname}/build/Final/images/${j}.png`);
          console.log(
            "\x1b[33m%s\x1b[0m",
            `Deleted NFT-${j}, Duplicate of NFT-${i}`
          );
        } catch (err) {
          console.error(`Error Deleting ${j}.json : ${err}`);
        }
      }
    }
  }
  console.log("\x1b[32m%s\x1b[0m", "Duplicate Check and Deletions Completed!");
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
