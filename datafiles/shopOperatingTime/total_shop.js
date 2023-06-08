var fs = require("fs");

const result = [];
fs.readdir(".", function (err, list) {
  if (err) throw err;

  for (let i = 51; i <= 100; i++) {
    var regex = new RegExp(`shop_${String(i)}_op.*.json`);
    list.forEach(function (item) {
      if (regex.test(item)) {
        const shop = require(`./${item}`);
        result.push(shop);
        // console.log(result);
      }
    });
  }

  console.log(result);
  fs.writeFile("./total_shop.json", JSON.stringify(result), (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
});
