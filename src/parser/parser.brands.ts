import { IBrandDetails } from "../types";
import { getHtml } from "./parser.service";
import * as cheerio from 'cheerio';
import { baseUrl } from "../config";

export async function getBrands(): Promise<Record<string, IBrandDetails>> {
    const html = await getHtml(`${baseUrl}/makers.php3`);
    const $ = cheerio.load(html);
    
    const brands: Record<string, IBrandDetails> = {};

    $('.st-text table td').each((_, el) => {
      const link = $(el).find('a');
      const href = link.attr('href');
      
      if (href) {
        const brandName = link.contents().first().text().trim();
        const deviceCountText = link.find('span').text();
        
        const deviceCountMatch = deviceCountText.match(/\d+/);
        const deviceCount = deviceCountMatch ? parseInt(deviceCountMatch[0], 10) : 0;

        const brandIdMatch = href.match(/-(\d+)\.php$/);
        const brandId = brandIdMatch ? parseInt(brandIdMatch[1], 10) : 0;
        
        const brandSlug = href.replace('.php', '');

        brands[brandName] = {
          brand_id: brandId,
          brand_slug: brandSlug,
          device_count: deviceCount,
          detail_url: `/brands/${brandSlug}`,
        };
      }
    });

    return brands;
  }
  