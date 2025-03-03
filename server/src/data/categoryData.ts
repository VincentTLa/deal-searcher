import * as cheerio from 'cheerio';

export async function categoryData() {
  // TO DO: DYNAMIC VARIABLES FOR PAGE NUMBER - INFINITE LOADING LATER
  // DYNAMIC VARIABLES FOR CATEGORY
  const $ = await cheerio.fromURL(
    'https://www.ozbargain.com.au/deals/feed?page=1',
  );

  // TO DO: ADD FOLLOWING FIELDS FROM LINK ABOVE:
  /*
  TITLE
  LINK
  IMAGE
  PUBLISH DATE
  CATEGORIES
  
  */
  const data = $.extract({
    releases: [
      {
        // First, we select individual release sections.
        selector: 'item',
        // Then, we extract the release date, name, and notes from each section.
        value: {
          // Selectors are executed within the context of the selected element.
          name: 'title',
          link: 'link',
          category: 'category', // Add more categories?
          // date: {
          //   selector: 'relative-time',
          //   // The actual release date is stored in the `datetime` attribute.
          //   value: 'pubDate',
          // },
          // notes: {
          //   selector: '.markdown-body',
          //   // We are looking for the HTML content of the element.
          //   value: 'innerHTML',
          // },
        },
      },
    ],
  });
  return data;
}
