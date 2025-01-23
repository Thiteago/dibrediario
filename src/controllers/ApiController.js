
import { getMatchesData } from '../services/crawlers/daily.js';

export class ApiController {
  async getDailyMatches(req, res) {
    let matches = await getMatchesData();
    return res.json({matches});
  }

  getSpecificMatch = async (req, res) => {
    let date = req.params.date;
    if (!this.#isDateValid(date)) {
      return res.status(400).json({ message: 'Invalid date format. Please use dd-mm-yyyy.' });
    }
    let matches = await getMatchesData(date);
    return res.json({ message: `Matches from ${date}`, matches});
  }

  #isDateValid(date) { 
    let dateArray = date.split('-');
    if (dateArray.length !== 3) {
      return false;
    }
    return true;
  }
}