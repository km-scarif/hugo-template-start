let searchIndex

const MAX_SUMMARY_LENGTH = 100
const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm
const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm


async function initSearchIndex() {
    // create search index
    searchIndex = elasticlunr(function() {
        this.addField('title')
        this.addField('section')
        this.addField('content')
        this.addField('tags')
        this.setRef('uri')
    })

    // load docs
    const response = await fetch("/search-index.json")
    const docs = await response.json()

    // add docs to search index
    docs.forEach(doc => {
        searchIndex.addDoc(doc)
    })
}

// auto instantiate
(async () => { 
    await initSearchIndex()
})()

function handleSearch() {
    // get search string
    const searchStr = document.getElementById("search-input").value.trim().toLowerCase()
    if (!searchStr) return

    // search the index and display results
    const results = searchIndex.search(searchStr)
    displaySearchResults(searchStr, results)
}

function displaySearchResults(query, results) {
    const stems = query.split(" ")

    // set search and result count
    document.querySelector('.search-results-wrapper .search').innerHTML = query
    document.querySelector('.search-results-wrapper .count').innerHTML = results.length

    // set result list
    const ul = document.querySelector(".search-results-wrapper ul")
    ul.innerHTML = ""

    results.forEach(result => {
        const li = document.createElement('li')
        li.classList.add("mb-2")
        li.classList.add("px-2")

        li.innerHTML = `
            <a href="${result.ref}" class="font-bold px-2 hover:underline hover:bg-violet-100">${createContentHitResults(stems, result.doc.title)}</a>
            <div class="px-2 italic text-sm">Section: ${createContentHitResults(stems, result.doc.section)}</div>
            <div class="px-2">${createContentHitResults(stems, result.doc.content)}</div>`
        ul.append(li)
    })

    document.querySelector(".main-block").classList.add("hidden")
    document.querySelector(".search-results-wrapper").classList.remove("hidden")
}

// analyze content to hightlight hits
function createContentHitResults(stems, pageContent) {
    const searchQueryRegex = new RegExp(`(${stems.join('|')})`, 'gmi')
    const searchQueryHits = Array.from(
      pageContent.matchAll(searchQueryRegex),
      m => m.index
    )
    const sentenceBoundaries = Array.from(
      pageContent.matchAll(SENTENCE_BOUNDARY_REGEX),
      m => m.index
    )
    let searchResultText = ''
    let lastEndOfSentence = 0
    for (const hitLocation of searchQueryHits) {
        if (hitLocation > lastEndOfSentence) {
            for (let i = 0; i < sentenceBoundaries.length; i++) {
                if (sentenceBoundaries[i] > hitLocation) {
                    const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0
                    const endOfSentence = sentenceBoundaries[i]
                    lastEndOfSentence = endOfSentence

                    parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim()
                    searchResultText += `${parsedSentence} ... `
                    break
                }
            }
        }
        const searchResultWords = tokenize(searchResultText)
        // const pageBreakers = searchResultWords.filter(word => word.length > 50)
        // if (pageBreakers.length > 0) {
        //     searchResultText = fixPageBreakers(searchResultText, pageBreakers);
        // }
        if (searchResultWords.length >= MAX_SUMMARY_LENGTH) break
    }
    if (searchResultText.length == 0) {
        searchResultText = pageContent
    }
    return ellipsize(searchResultText, MAX_SUMMARY_LENGTH).replace(
        searchQueryRegex,
        "<strong>$&</strong>"
    )
}

function tokenize(input) {
    const wordMatches = Array.from(input.matchAll(WORD_REGEX), m => m)
    return wordMatches.map(m => ({
        word: m[0],
        start: m.index,
        end: m.index + m[0].length,
        length: m[0].length,
    }))
}

function ellipsize(input, maxLength) {
    const words = tokenize(input)
    if (words.length <= maxLength) {
      return input
    }
    return `${input.slice(0, words[maxLength].end)}...`
}

// polyfill for mobile safari 12
if (!String.prototype.matchAll) {
    String.prototype.matchAll = function (regex) {
        "use strict"
        function ensureFlag(flags, flag) {
            return flags.includes(flag) ? flags : flags + flag;
        }
        function* matchAll(str, regex) {
            const localCopy = new RegExp(regex, ensureFlag(regex.flags, "g"))
            let match
            while ((match = localCopy.exec(str))) {
                match.index = localCopy.lastIndex - match[0].length
                yield match
            }
        }
        return matchAll(this, regex)
    }
}