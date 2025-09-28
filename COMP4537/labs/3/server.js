import { createServer } from 'http';
import { parse } from 'url';
import fs from 'fs';
import { greeting, readFileContent } from './modules/utils.js';
import { MESSAGE, HOME, FILE_WRITE_PAGE } from './lang/en/en.js';

const PORT = 3000;
const SUCCESS_STATUS = 200;
const NOT_FOUND_STATUS = 404;

const ROUTES = {
    HOME: '/',
    GET_DATE: '/COMP4537/labs/3/getDate',
	WRITE_FILE: '/COMP4537/labs/3/writeFile/',
    READ_FILE: '/COMP4537/labs/3/readFile'
};

const HTTP_METHODS = {
    GET: 'GET'
};

const CONTENT_TYPES = {
    TEXT_PLAIN: 'text/plain',
    TEXT_HTML: 'text/html'
};

const DEFAULT_NAME = 'N/A';

const FILES = {
    GREETING_FILE: 'greeting.txt',
    WRITING_FILE: 'file.txt'
};

const READ_FILE_PATTERN = new RegExp(`^${ROUTES.READ_FILE}/([^/]+\.txt)$`);

function sendNotFound(res) {
    res.writeHead(NOT_FOUND_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_PLAIN });
    res.end(MESSAGE.NOT_FOUND_404_MESSAGE);
}

const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    if (req.method === HTTP_METHODS.GET) {
		const readFileMatch = pathname.match(READ_FILE_PATTERN);

		if (readFileMatch) {
            const fileName = readFileMatch[1]; 

            fs.readFile(fileName, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(NOT_FOUND_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
                    res.end(`<p style="color:red;">${MESSAGE.FILE_READ_ERROR} ${err.message}</p>`);
                    return;
                }
                res.writeHead(SUCCESS_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
                res.end(readFileContent(fileName, data));
            });
			
            return;
        }

        switch (pathname) {
			case ROUTES.HOME:
				res.writeHead(SUCCESS_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
				res.end(HOME);
				break;

			case ROUTES.GET_DATE:
				const name = parsedUrl.query.name || DEFAULT_NAME;
				const now = new Date();
				const greetingMessage = greeting(name, now);
				let html = `
					<div style="color:blue;">
						${greetingMessage}
					</div>
					<button onclick="window.location.href='${ROUTES.HOME}'">Go Back</button>
				`;
				const logMessage = `${greetingMessage.replace(/<br>/g, ' ').trim()}\n`;    

				fs.appendFile(FILES.GREETING_FILE, logMessage + '\n', function(err) {
					if (err) {
						console.error(MESSAGE.FILE_WRITE_ERROR, err);
					} else {
						console.log(MESSAGE.FILE_WRITE_SUCCESS);
					}
				});

				res.writeHead(SUCCESS_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
				res.end(html);
				break;
			
			case ROUTES.WRITE_FILE:
				const textToAppend = parsedUrl.query.text;

				if(textToAppend) {
					const dataToAppend = textToAppend.trim() + '\n';

					fs.appendFile(FILES.WRITING_FILE, dataToAppend, function(err) {
						let pageMessage = '';

						if (err) {
							console.error(MESSAGE.FILE_WRITE_ERROR, err);
							pageMessage = `<p style="color:red;">${MESSAGE.FILE_WRITE_ERROR} ${err.message}</p>`;
						} else {
							pageMessage = `<p style="color:green;">${MESSAGE.FILE_WRITE_SUCCESS}: Added "${textToAppend}" to ${FILES.WRITING_FILE}.</p>`;
						}

						res.writeHead(SUCCESS_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
						res.end(pageMessage + FILE_WRITE_PAGE);
					});
				} else {
					res.writeHead(NOT_FOUND_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
					res.end('<p style="color:red;">No text provided to write to file.</p>' + FILE_WRITE_PAGE);
				}
				break;
			
			default:
				sendNotFound(res);
    	}
    } else {
        sendNotFound(res);
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
