import { readFile } from 'fs';

export default {
  readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
  },
};
