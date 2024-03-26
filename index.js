import express from 'express';
import { matchesRoutes } from './src/routes/MatchesRoutes.js';

const app = express();

app.use(matchesRoutes)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});