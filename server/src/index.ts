import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { categoryData } from './data/categoryData';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  const data = await categoryData();

  res.send(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
