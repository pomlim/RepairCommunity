const result = [];
for (let i = 51; i <= 100; i++) {
  const shop = require(`./shop_${String(i).padStart(3, "0")}.json`);
  result.push(shop);
}

const fs = require("fs");

fs.writeFile("./total_shop.json", JSON.stringify(result), (err) => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
