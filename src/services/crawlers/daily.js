import puppeteer from "puppeteer";

export async function getDailyMatches(date = null) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  if(date){
    await page.goto('https://ge.globo.com/agenda/#/futebol/' + date)
  }else{
    await page.goto('https://ge.globo.com/agenda/')
  }
  
  await page.setViewport({width: 1080, height: 1024});

  await page.waitForSelector('[class^="GroupByChampionshipsstyle__GroupByChampionshipsWrapper"]')

  const matches = await page.evaluate(() => {
    const matches = []
    const matchesElements = document.querySelectorAll('[class^="GroupByChampionshipsstyle__GroupByChampionshipsWrapper"]') // isso aqui ta certo
    matchesElements.forEach((matchElement) => {
      const matchChampionship = {}
      let result = matchElement.querySelector('a > span')
      if (result) {
        matchChampionship.championship = result.textContent
      }else if (matchElement.querySelector('h2 > span')) {
        matchChampionship.championship = matchElement.querySelector('h2 > span').textContent
      }

      let matchCardsElements = matchElement.querySelectorAll('[class^="GroupByChampionshipsstyle__MomentsWrapper"]')
      let sectionButtons = matchCardsElements[0].querySelectorAll('button[class^="ShowMoreButtonstyle__ShowMoreContainer"]')

      if (sectionButtons.length > 0) {
        sectionButtons.forEach((button) => {
          button.click()
        })
      }

      matchElement.querySelectorAll('[class^="GroupByChampionshipsstyle__MomentsWrapper"] > a').forEach((matchWrapper) => {
        const matchInfo = {}
        let matchTime = matchWrapper.querySelector('div:first-child > div:first-child > div:last-child > div:first-child > span:last-child')
        matchTime ? matchInfo.time = matchTime.textContent : matchInfo.time = 'Ainda não definido'
        let homeInfo = matchWrapper.querySelector('div[type="home"]')
        let awayInfo = matchWrapper.querySelector('div[type="away"]')
        matchInfo.team1 = homeInfo.querySelector('div:first-child > span').textContent
        homeInfo.querySelector('div:last-child > span') ? matchInfo.team1_score = homeInfo.querySelector('div:last-child > span').textContent :
                                                          matchInfo.team1_score = 'Ainda não ocorreu'
        
        matchInfo.team2 = awayInfo.querySelector('div:first-child > span').textContent
        awayInfo.querySelector('div:last-child > span') ? matchInfo.team2_score = awayInfo.querySelector('div:last-child > span').textContent :
                                                          matchInfo.team2_score = 'Ainda não ocorreu'
        
        matchChampionship.matches = [...matchChampionship.matches || [], matchInfo]
      })
      matches.push(matchChampionship)
    })
    return matches
  })

  await browser.close()
  return matches
}

