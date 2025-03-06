import * as cheerio from 'cheerio';

export function itemDetailHelper(htmlData: any) {
  const $ = cheerio.load(htmlData);

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
}
