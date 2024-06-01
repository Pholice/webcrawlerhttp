import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect } from "@jest/globals";


test('normalize url', () => {
    const normalizedURL = 'blog.boot.dev/path'
    const urlOne = 'https://blog.boot.dev/path/'
    const urlTwo = 'https://blog.boot.dev/path'
    const urlThree ='http://blog.boot.dev/path/'
    const urlFour = 'http://blog.boot.dev/path'
    
    expect(normalizeURL(urlOne)).toBe(normalizedURL)
    expect(normalizeURL(urlTwo)).toBe(normalizedURL)
    expect(normalizeURL(urlThree)).toBe(normalizedURL)
    expect(normalizeURL(urlFour)).toBe(normalizedURL)
})

test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })