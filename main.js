import {argv} from 'node:process'
import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    if (process.argv.length > 3) {
        throw new Error('Too many arguments')
    }
    else if (process.argv.length < 3) { 
        throw new Error('Need argument')
    }
    const base_url = process.argv[2]
    console.log(`Crawling: ${base_url}`)
    
    try {
        const results = await crawlPage(base_url);
        printReport(results)
    } catch (error) {
        console.error(`Error crawling the page: ${error.message}`);
    }
}

main()