import axios from 'axios';
import * as cheerio from 'cheerio';

export async function mainDealsData(page: string) {
  try {
    const response = await axios.get(
      `https://www.ozbargain.com.au/deals/feed?page=${page}`,
    );
    const html = response.data;

    const $ = cheerio.load(html);

    const data = $('item')
      .map((index, element) => {
        const categories: string[] = [];
        $(element)
          .find('category')
          .each((i, cat) => {
            categories.push($(cat).text());
          });

        return {
          title: $(element).find('title').text(),
          link: $(element).find('link').text(),
          description: $(element).find('description').text(),
          pubDate: $(element).find('pubDate').text(),
          categories: categories,
          image: $(element).find('media\\:thumbnail').attr('url'),
        };
      })
      .get();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
