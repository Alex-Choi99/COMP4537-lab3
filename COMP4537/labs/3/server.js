import { createServer } from 'http';
import { parse } from 'url';
import formatDate from './modules/utils.js';
import { greet, dateMessage, home, NOT_FOUND_MESSAGE } from './lang/en/en.js';

const PORT = 3000;
const SUCCESS_STATUS = 200;
const NOT_FOUND_STATUS = 404;

// Route constants
const ROUTES = {
    HOME: '/',
    GET_DATE: '/COMP4537/labs/3/getDate'
};

// HTTP methods
const HTTP_METHODS = {
    GET: 'GET'
};

const CONTENT_TYPES = {
    TEXT_PLAIN: 'text/plain',
    TEXT_HTML: 'text/html'
};

const DEFAULT_NAME = 'N/A';

function sendNotFound(res) {
	res.writeHead(NOT_FOUND_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_PLAIN });
	res.end(NOT_FOUND_MESSAGE);
}

const server = createServer((req, res) => {
	const parsedUrl = parse(req.url, true);

	if (req.method === HTTP_METHODS.GET) {
		switch (parsedUrl.pathname) {
			case ROUTES.HOME:
				res.writeHead(SUCCESS_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
				res.end(home());
				break;
			case ROUTES.GET_DATE:
				const name = parsedUrl.query.name || DEFAULT_NAME;
				const now = new Date();
				const greeting = greet(name);
				const dateMsg = dateMessage(formatDate(now));

				const html = `
					<div style="color:blue;">
						${greeting} ${dateMsg}
					</div>
				`;

				res.writeHead(SUCCESS_STATUS, { 'Content-Type': CONTENT_TYPES.TEXT_HTML });
				res.end(html);
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
