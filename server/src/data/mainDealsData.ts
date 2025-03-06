import axios from 'axios';
import { itemDetailHelper } from '../helpers/itemDetailHelper';

export async function mainDealsData(page: string) {
  try {
    const response = await axios.get(
      `https://www.ozbargain.com.au/deals/feed?page=${page}`,
    );

    const data = itemDetailHelper(response.data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
