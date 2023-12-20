const fs = require("fs");

// blocking, synchronous way
const text = fs.readFileSync("./txt/input.txt", "utf8");
const textOut = `${text} I also love jesus. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);

// non-blocking, asychronous way
fs.readFile("./txt/start.txt", "utf8", (err, data1) => {
  if (err) throw new Error(err);
  fs.readFile(`./txt/${data1}.txt`, "utf8", (err, data2) => {
    if (err) throw new Error(err);
    fs.writeFile(
      "./txt/new-output.txt",
      `${data1}: ${data2}`,
      "utf-8",
      (err) => {
        console.log(`${data1}: ${data2}`);
      }
    );
  });
});
console.log("123 go");
