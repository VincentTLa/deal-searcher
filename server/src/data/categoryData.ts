// import * as cheerio from 'cheerio';

// export async function categoryData() {
//   // TO DO: DYNAMIC VARIABLES FOR PAGE NUMBER - INFINITE LOADING LATER
//   // DYNAMIC VARIABLES FOR CATEGORY
//   const $ = await cheerio.fromURL(
//     'https://www.ozbargain.com.au/deals/feed/page=1',
//   );

//   // TO DO: ADD FOLLOWING FIELDS FROM LINK ABOVE:
//   /*
//   TITLE
//   LINK
//   IMAGE
//   PUBLISH DATE
//   CATEGORIES

//   */
//   const data = $.extract({
//     releases: [
//       {
//         // First, we select individual release sections.
//         selector: 'item',
//         // Then, we extract the release date, name, and notes from each section.
//         value: {
//           // Selectors are executed within the context of the selected element.
//           title: 'title',
//           link: 'link',
//           category: 'category', // Add more categories?

//           allCategories: [
//             {
//               selector: 'category',
//             },
//           ],

//           pubDate: 'pubDate',
//           // date: {
//           //   selector: 'relative-time',
//           //   // The actual release date is stored in the `datetime` attribute.
//           //   value: 'pubDate',
//           // },
//           // notes: {
//           //   selector: '.markdown-body',
//           //   // We are looking for the HTML content of the element.
//           //   value: 'innerHTML',
//           // },
//         },
//       },
//     ],
//   });
//   return data;
// }

import axios from 'axios';
import * as cheerio from 'cheerio';

export async function categoryData() {
  try {
    const response = await axios.get(
      'https://www.ozbargain.com.au/deals/feed?page=1',
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
