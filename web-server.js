const fs = require("fs");
const http = require("http");
const url = require("url");

const overview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const card = fs.readFileSync(
  `${__dirname}/templates/product-card.html`,
  "utf-8"
);
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const productData = JSON.parse(data);

function replaceTemp(temp, product) {
  let output = temp.replace(/{name}/g, product.productName);
  output = output.replace(/{image}/g, product.image);
  output = output.replace(/{from}/g, product.from);
  output = output.replace(/{nutrients}/g, product.nutrients);
  output = output.replace(/{quantity}/g, product.quantity);
  output = output.replace(/{price}/g, product.price);
  output = output.replace(/{description}/g, product.description);
  output = output.replace(/{id}/g, product.id);
  if (!product.organic) output = output.replace(/{isOrganic}/g, "not-organic");
  return output;
}

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = productData.map((el) => replaceTemp(card, el)).join("");
    output = overview.replace(/{product-card}/g, cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const chosenFruit = productData[query.id];
    const output = replaceTemp(product, chosenFruit);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Error 404</h1>");
  }
});

server.listen(8000, () => {
  console.log("listening from the server side");
});
