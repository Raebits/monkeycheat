export const monkeyCheat = () => {
  let wordsDivElements = Array.from(document.getElementsByClassName('word'));
  let wordsLettersElements = wordsDivElements.map((htmlDivElement) => Array.from(htmlDivElement.children));
  let words = wordsLettersElements.map(elements => {
      let wordArray = elements.map(element => element.innerHTML)
      return wordArray.join('')
  })
  console.log('words: ', words);
  return words
}
