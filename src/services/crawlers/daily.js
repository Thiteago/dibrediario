const BASE_URL="https://www.sofascore.com/api/v1/sport/football/scheduled-events/"

export async function getMatchesData(date=null) {
  let date_choosed = date == null ? new Date() : dateConverter(date)
  const year = date_choosed.getFullYear();
  const month = String(date_choosed.getMonth() + 1).padStart(2, "0");
  const day = String(date_choosed.getDate()).padStart(2, "0");

  date_choosed = `${year}-${month}-${day}`;
  const res = await fetch(BASE_URL + date_choosed);
  const data = await res.json();

  const events = data.events;
  let tournaments = await reorganizeMatches(events)

  return tournaments
}

 function reorganizeMatches(events){
  return events.reduce((acc, event) => {
    const tournamentName = event.tournament.name;

    if (!acc[tournamentName]) {
      acc[tournamentName] = [];
    }

    acc[tournamentName].push({
      gameId: event.id,
      slug: event.slug,
      startTimestamp: event.startTimestamp,
      homeTeam: event.homeTeam.name,
      awayTeam: event.awayTeam.name,
      homeScore: event.homeScore.current,
      awayScore: event.awayScore.current,
      status: event.status.description,
    });

    return acc;
  }, {});
}

function dateConverter(date){
  const [day, month, year] = date.split("-");
  return new Date(year, month - 1, day);
}