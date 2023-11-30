const puppeteer = require("puppeteer");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "output.csv",
  header: [{ id: "content", title: "Content" }],
});

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  try {
    await page.goto("https://www.google.com/", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector(".uU7dJb", { timeout: 10000 });
    const elementContent = await page.$eval(".uU7dJb", (element) =>
      element.textContent.trim()
    );

    console.log("Содержимое элемнта:", elementContent);

    await csvWriter.writeRecords([{ content: elementContent }]);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  } finally {
    await browser.close();
  }
})();
