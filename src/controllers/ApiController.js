
import { getDailyMatches } from '../services/crawlers/daily.js';

export class ApiController {
  async getDailyMatches(req, res) {
    let today = new Date();
    today = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    let matches = await getDailyMatches();
    return res.json({ message: `Daily matches - ${today}`, matches});
  }

  getSpecificMatch = async (req, res) => {
    let date = req.params.date;
    if (!this.#isDateValid(date)) { // 'this' is automatically bound in arrow functions
      return res.status(400).json({ message: 'Invalid date format. Please use dd-mm-yyyy.' });
    }
    let matches = await getDailyMatches(date);
    return res.json({ message: `Matches from ${date}`, matches});
  }

  #isDateValid(date) { // Define as a regular function
    let dateArray = date.split('-');
    if (dateArray.length !== 3) {
      return false;
    }
    return true;
  }
}