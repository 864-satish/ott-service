import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { marked } from 'marked';

@Injectable()
export class AppService {
  getHello() {

    const readmeUrl = 'https://github.com/864-satish/ott-service/blob/master/README.md';
    return {
      about: readmeUrl,
      message: 'The OTT service is up and running!',
    }
    /**@info : Stopping readme html
    const readmePath = 'README.md'
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');
    const htmlContent = marked(readmeContent);

    return `
      <html>
        <head>
          <title>README</title>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
    */
  }
}
