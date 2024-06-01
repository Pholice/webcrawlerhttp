import { normalize } from 'node:path';
import { JSDOM } from 'jsdom';
import url from 'node:url';

function normalizeURL(url) {
    const myURL = new URL(url)
    let normalize = `${myURL.host}${myURL.pathname}`
    if (normalize.endsWith('/')) {
        return normalize.slice(0, -1)
    } else {
        return normalize
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const bodys = dom.window.document.querySelectorAll('a');
    
    for (const body of bodys) {
        if (body.hasAttribute('href')) {
            let href = body.getAttribute('href');
            try {
                // Convert any relative URLs to absolute URLs
                href = new URL(href, baseURL).href;
                urls.push(href);
            } catch(err) {
                console.log(`Invalid URL: ${err.message} - ${href}`);
            }
        }
    }

    console.log(`Extracted URLs: ${urls}`);
    return urls;
}

async function crawlPage(baseURL, currURL = baseURL, pages = {}) {
    if (!currURL.includes(baseURL)) {
        return pages
    }
    let normalized = normalizeURL(currURL)
    if (normalized in pages) {
        pages[normalized]++
        return pages
    } else {
        pages[normalized] = 1
    }
    
    const html = await parsePage(currURL)
    const foundUrls = getURLsFromHTML(html, baseURL)
    for (const url of foundUrls) {
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages
}

async function parsePage(baseURL) {
    let response
    try {
        response = await fetch(baseURL)
      } catch (err) {
        throw new Error(`Got Network error: ${err.message}`)
    }
    if (response.status >= 400) {
        console.log(`Got HTTP error: ${response.status} ${response.statusText}`)
        return
    }
    
    const contentType = response.headers.get('Content-Type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`)
        return
    }
    return response.text()
}

export { normalizeURL, getURLsFromHTML, crawlPage};