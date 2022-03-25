const fs = require("fs");
const requireContext = require("require-context");

const jsonContext = requireContext(`${__dirname}/jsonUpload`, true, /.json$/);

updateURI(jsonContext);
console.log("updated");

function updateURI(_context) {
  console.log("main");
let count=0;


  _context.keys().forEach((key) => {
    const fileName = key;
    if (fileName === "_metadata.json") {
      return;
    } else {
      let fileNumber = fileName.slice(0, -5);
      let resource = require(__dirname + `/jsonUpload/${fileNumber}.json`);
      resource.edition = Number(fileNumber);
      resource.name = `MetaWolves #${fileNumber}`;
      resource.image = `https://metawolves.mypinata.cloud/ipfs/QmUExkhov1wMeKXJ8kMGyJXShSU5uPC9simbZoDD4tLvRK/${fileNumber}.png`;
      resource.description = "MetaWolves by UnsignedArtist NFT";

      count++;
      if(count%100===0) console.log(`${count} cards processed`)

      fs.writeFileSync(
        __dirname + `/jsonUpload/${fileNumber}.json`,
        JSON.stringify(resource)
      );
    }
  });
}
