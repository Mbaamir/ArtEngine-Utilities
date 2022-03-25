const fs = require("fs");

const progressInterval = 2;

fillNftsTill7500();

function fillNftsTill7500() {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "#####################\nFilling Missing NFTs \n########################"
  );

  const fillFilesUpto = 13;

  for (let i = 1; i < fillFilesUpto; i++) {
    if (i % progressInterval === 0)
      console.log(
        "\x1b[35m%s\x1b[0m",
        i + " files Checked for Gaps and Filled"
      );
    let imageContent = fs.readdirSync(`${__dirname}/build/Final/json`);
    let lastItemNumber = imageContent[imageContent.length - 1].slice(0, 1);
    if (i >= lastItemNumber) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        `Count @ ${
          i + 1
        } has exceeded number of NFT Files available. \nGenerate and Add more`
      );
      return;
    }

    let isImageMissing = !fs.existsSync(
      `${__dirname}/build/Final/images/${i}.png`
    );
    let isJsonMissing = !fs.existsSync(
      `${__dirname}/build/Final/json/${i}.json`
    );

    if (isImageMissing && isJsonMissing) {
      console.log("\x1b[2m%s\x1b[0m", `NFT-${i} Missing`);

      fs.renameSync(
        `${__dirname}/build/Final/images/${lastItemNumber}.png`,
        `${__dirname}/build/Final/images/${i}.png`
      );

      fs.renameSync(
        `${__dirname}/build/Final/json/${lastItemNumber}.json`,
        `${__dirname}/build/Final/json/${i}.json`
      );

      let resource = require(__dirname + `/build/Final/json/${i}.json`);
      resource.edition = Number(i);
      resource.name = `MetaWolves #${i}`;
      resource.image = `https://metawolves.mypinata.cloud/ipfs/QmUExkhov1wMeKXJ8kMGyJXShSU5uPC9simbZoDD4tLvRK/${i}.png`;
      resource.description = "MetaWolves by UnsignedArtist NFT";

      fs.writeFileSync(
        `${__dirname}/build/Final/json/${i}.json`,
        JSON.stringify(resource)
      );
      console.log(
        "\x1b[34m%s\x1b[0m",
        `NFT-${lastItemNumber} Fills Missing NFT-${i} `
      );
    } else if (isImageMissing) {
      console.warn(`Image ${i} Missing but Json ${i} Present`);
    } else if (isJsonMissing) {
      console.warn(`Json ${i} Missing but Image ${i} Present`);
    }
  }
  console.log("\x1b[32m%s\x1b[0m", "Filled Missing Spaces!");
}