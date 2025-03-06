import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { categoryData } from './data/categoryData';
import { mainDealsData } from './data/mainDealsData';
import { itemData } from './data/itemData';
import { Categories } from './data/types';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  // const data = await categoryData();
  // res.send(data);
});

app.get('/main-deals/:page', async (req: Request, res: Response) => {
  const data = await mainDealsData(req.params.page);
  res.send(data);
});

app.get(
  '/cat/:category/:page',
  async (req: Request, res: Response): Promise<void> => {
    const { category, page } = req.params;

    // Validate category against enum
    if (!Object.values(Categories).includes(category as Categories)) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    try {
      const data = await categoryData(category, page);
      res.send(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

// TODO: Single Item retrieval
// app.get(
//   'item/:itemNumber',
//   async (req: Request, res: Response): Promise<void> => {
//     const { itemNumber } = req.params;

//     try {
//       const data = await itemData(itemNumber);
//       res.send(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   },
// );

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
