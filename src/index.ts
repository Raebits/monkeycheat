import puppeteer from 'puppeteer-core'
import { monkeyCheat } from './monkeyCheat';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: process.platform === 'linux' ? '/usr/bin/google-chrome' : undefined
  });
  const page = await browser.newPage();
  await page.goto('https://monkeytype.com', {
    waitUntil: 'networkidle2'
  });

  await page.screenshot({path: 'example.png'});
  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });
  console.log('Dimensions:', dimensions);

  try{
    const acceptAllCookiesString = 'div[class="button active acceptAll"]'
    await page.click(acceptAllCookiesString)
  }catch(error){
    console.log('accept cookie button not found')
  }

  /**
   * get words
   */
  let words = await page.evaluate(monkeyCheat)
  console.log(words)
  await page.waitForTimeout(3000);

  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    let letters = word.split('')
    console.log(letters)
    for (let j = 0; j < letters.length; j++) {
      const letter = letters[j]
      console.log(`pressing ${letter}`)
      await page.keyboard.press(letter as any)
      await page.waitForTimeout(1);
    }

    if(i < (words.length - 1)){
      console.log('pressing space')
      await page.keyboard.press('Space')
      await page.waitForTimeout(1);
    }
  }

  // await browser.close();
})();