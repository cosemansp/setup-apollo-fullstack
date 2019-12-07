import fetch from 'node-fetch';
import { log } from './logManager';

export const sleep = (time) => new Promise((r) => setTimeout(r, time));

export const waitForServices = async (urls) => {
  while (true) {
    const results: string[] = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((_) => 'ok')
          .catch((x) => x.message),
      ),
    );
    const errors = results.filter((x) => x.includes('ECONNREFUSED'));
    if (errors.length) {
      await sleep(2000);
      log.info('Waiting for service(s) availability...');
    } else {
      return true;
    }
  }
};

export type Url = { name: string; url: string };

export const getConfig = (): Url[] => {
  return Object.entries(process.env)
    .filter(([key]) => key.includes('SERVICE_URL_'))
    .sort(([k1], [k2]) => k1.localeCompare(k2))
    .map(([key, value]) => {
      return {
        name: key.replace('SERVICE_URL', '').toLowerCase(),
        url: value,
      };
    });
};
