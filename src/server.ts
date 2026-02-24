import Fastify from 'fastify';
import { ParserService } from './parser/parser.service';
import { getPhoneDetails } from './parser/parser.phone-details';
import { getBrands } from './parser/parser.brands';

export const baseUrl = 'https://www.gsmarena.com';

const server = Fastify({ logger: true });
const parserService = new ParserService();

server.get('/brands', async () => {
  const data = await getBrands();
  return { status: true, data };
});

server.get('/brands/:brandSlug', async (request) => {
  const { brandSlug } = request.params as { brandSlug: string };
  const data = await parserService.getPhonesByBrand(brandSlug);
  return { status: true, data };
});

server.get('/latest', async () => {
  const data = await parserService.getLatestPhones();
  return { status: true, data };
});

server.get('/top-by-interest', async () => {
  const data = await parserService.getTopByInterest();
  return { status: true, data };
});

server.get('/top-by-fans', async () => {
  const data = await parserService.getTopByFans();
  return { status: true, data };
});

server.get('/search', async (request, reply) => {
  const query = (request.query as any).query;
  if (!query) {
    return reply.status(400).send({ error: 'Query parameter is required' });
  }
  const data = await parserService.search(query);
  return data;
});

server.get('/:slug', async (request) => {
  const slug = (request.params as any).slug;
  const data = await getPhoneDetails(slug);
  return data;
});

const start = async () => {
  try {
    await server.listen({ port: 4000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();