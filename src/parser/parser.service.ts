import axios from 'axios';
import * as cheerio from 'cheerio';
import { IPhoneListItem, ISearchResult } from '../types';
import { baseUrl } from '../config';

export async function getHtml(url: string): Promise<string> {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    return data;
  }

export class ParserService {

  

  /**
   * Приватный хелпер для парсинга таблиц на странице stats.php3
   * @param captionText - Текст заголовка таблицы для поиска ('By daily hits' или 'By total favorites')
   */
  private async _parseStatsTable(captionText: string): Promise<IPhoneListItem[]> {
    const html = await getHtml(`${baseUrl}/stats.php3`);
    const $ = cheerio.load(html);
    const topPhones: IPhoneListItem[] = [];

    const table = $(`table:has(caption:contains("${captionText}"))`);

    table.find('tbody tr').each((index, el) => { // <-- Добавляем index для получения ранга
      const link = $(el).find('th a');
      const href = link.attr('href');
      const hitsText = $(el).find('td').last().prev().text().replace(/,/g, '');

      if (href) {
        const slug = href.replace('.php', '');
        topPhones.push({
          rank: index + 1, // <-- ДОБАВЛЕНО: Ранг, начиная с 1
          name: link.text().trim(),
          slug: slug,
          hits: parseInt(hitsText, 10) || 0,
          detail_url: `/${slug}`, // <-- ДОБАВЛЕНО: Ссылка на детальную страницу
        });
      }
    });

    return topPhones;
  }
  
  async getPhonesByBrand(brandSlug: string): Promise<IPhoneListItem[]> {
    const html = await getHtml(`${baseUrl}/${brandSlug}.php`);
    const $ = cheerio.load(html);
    const phones: IPhoneListItem[] = [];

    $('.makers ul li').each((_, el) => {
      const href = $(el).find('a').attr('href');
      if (href) {
        phones.push({
          name: $(el).find('span').text().trim(),
          slug: href.replace('.php', ''),
          imageUrl: $(el).find('img').attr('src'),
          detail_url: `/${href.replace('.php', '')}`,
        });
      }
    });
    
    return phones;
  }
  
  async getLatestPhones(): Promise<IPhoneListItem[]> {
    const html = await getHtml(`${baseUrl}/new.php3`);
    const $ = cheerio.load(html);
    const phones: IPhoneListItem[] = [];
    
    $('.makers ul li').each((_, el) => {
      const href = $(el).find('a').attr('href');
      if (href) {
        phones.push({
          name: $(el).find('span').text().trim(),
          slug: href.replace('.php', ''),
          imageUrl: $(el).find('img').attr('src'),
          detail_url: `/${href.replace('.php', '')}`,
        });
      }
    });

    return phones;
  }

  async getTopByInterest(): Promise<IPhoneListItem[]> {
    return this._parseStatsTable('By daily hits');
  }

  async getTopByFans(): Promise<IPhoneListItem[]> {
    return this._parseStatsTable('By total favorites');
  }

  async search(query: string): Promise<ISearchResult[]> {
    const html = await getHtml(`${baseUrl}/results.php3?sQuickSearch=yes&sName=${query}`);
    console.log(`${baseUrl}/results.php3?sQuickSearch=yes&sName=${query}`)
    const $ = cheerio.load(html);
    const phones: ISearchResult[] = [];

    $('.makers ul li').each((_, el) => {
      const href = $(el).find('a').attr('href');
      if (href) {
        phones.push({
          name: $(el).find('span').text().trim(),
          slug: href.replace('.php', ''),
          imageUrl: $(el).find('img').attr('src'),
          detail_url: `/${href.replace('.php', '')}`,
        });
      }
    });
    //console.log(phones)
    return phones;
  }

  
  
}