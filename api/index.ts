import Fastify from 'fastify';
import { ParserService } from '../src/parser/parser.service';
import { getPhoneDetails } from '../src/parser/parser.phone-details';
import { getBrands } from '../src/parser/parser.brands';
import type { IncomingMessage, ServerResponse } from 'http';

export const baseUrl = 'https://www.gsmarena.com';

const app = Fastify({ logger: true });
const parserService = new ParserService();

app.get('/brands', async () => {
  const data = await getBrands();
  return { status: true, data };
});

app.get('/brands/:brandSlug', async (request) => {
  const { brandSlug } = request.params as { brandSlug: string };
  const data = await parserService.getPhonesByBrand(brandSlug);
  return { status: true, data };
});

app.get('/latest', async () => {
  const data = await parserService.getLatestPhones();
  return { status: true, data };
});

app.get('/top-by-interest', async () => {
  const data = await parserService.getTopByInterest();
  return { status: true, data };
});

app.get('/top-by-fans', async () => {
  const data = await parserService.getTopByFans();
  return { status: true, data };
});

app.get('/search', async (request, reply) => {
  const query = (request.query as any).query;
  if (!query) {
    return reply.status(400).send({ error: 'Query parameter is required' });
  }
  const data = await parserService.search(query);
  return data;
});

app.get('/:slug', async (request) => {
  const slug = (request.params as any).slug;
  const data = await getPhoneDetails(slug);
  return data;
});

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  await app.ready();
  app.server.emit('request', req, res);
};

export default handler;
module.exports = handler;
