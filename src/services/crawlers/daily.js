import puppeteer from "puppeteer";

export async function getDailyMatches(date = null) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  if(date){
    await page.goto('https://ge.globo.com/agenda/#/futebol/' + date, { waitUntil: 'networkidle2', timeout: 0 })
  }else{
    await page.goto('https://ge.globo.com/agenda/', { waitUntil: 'networkidle2' , timeout: 0})
  }
  
  await page.setViewport({width: 1080, height: 1024});

  const matches = await page.evaluate((date) => {
    const today = new Date()

    const status = {
      'ENCERRADA': 'Finalizado',
      'REAL_TIME': 'Em Andamento',
      'PRE_JOGO': 'Pré Jogo',
      'PRE_DIA': 'PRE_DIA'
    }
    const matches = []
    const matchesElements = document.querySelectorAll('[class^="GroupByChampionshipsstyle__GroupByChampionshipsWrapper"]')
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
        let matchTimeSpans = matchWrapper.querySelectorAll('span[class^="sc-eqUAAy dpZzQr"]')

        if(matchTimeSpans.length > 0){
          matchTimeSpans.forEach((span) => {
            if(span.textContent.match(/\d{2}:\d{2}/)){
              matchInfo.time = span.textContent
            }
            if(!matchInfo.time){
              matchInfo.time = 'Ainda não definido'
            }
          })
        }

        let matchStatus = matchWrapper.querySelector('span[data-status-id]').getAttribute('data-status-id')
        matchInfo.status = status[matchStatus]

        if(matchInfo.status === 'PRE_DIA'){
          if(date){
            matchInfo.status = 'Ainda não ocorreu'
          }
          matchInfo.time > today.getHours() + ':' + today.getMinutes() ? matchInfo.status = 'Pré Jogo' : matchInfo.status = 'Ainda não ocorreu'
        }

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
  }, date)

  await browser.close()
  return matches
}

