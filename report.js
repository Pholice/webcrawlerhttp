import { crawlPage } from "./crawl.js";
function printReport(pages) {
    const sortedKeys = Object.keys(pages).sort((a,b) => pages[b] - pages[a])
    const sortedPages = {};
    sortedKeys.forEach(key => {
        sortedPages[key] = pages[key]
    })
    console.log('The report is starting')
    for (let key in sortedPages) {
        console.log(`Found ${key} internal links to ${sortedPages[key]}`)
    }
}
export {printReport}