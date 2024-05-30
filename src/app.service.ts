import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { marked } from 'marked';

@Injectable()
export class AppService {
  getHello(): string {
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
  }
}
