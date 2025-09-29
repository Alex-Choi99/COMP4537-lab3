/**
 * Alex Choi - A01323994
 * I acknowledge that I used VSCode Copilot to assist in the development of this code.
 */

let { createServer } = require('http');
let { parse } = require('url');
let Utils = require('./modules/utils.js');
let LangEn = require('./lang/en/en.js');

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
const REGEX_TEXT = `^${ROUTES.READ_FILE}/([^/]+\.txt)$`;
const NEW_LINE = '\n';
const FIRST_CAPTURING_GROUP = 1;

/**
 * LabServer class to handle HTTP requests and responses.
 */
class LabServer {
	constructor() {
		this.READ_FILE_PATTERN = new RegExp(REGEX_TEXT);
		this.lang = new LangEn();
		this.utils = new Utils();
	}

	/**
	 * A method to send a 404 Not Found response.
	 * @param {*} res | Response object
	 */
	sendNotFound(res) {
		res.writeHead(NOT_FOUND_STATUS, { CONTENT_TYPE: CONTENT_TYPES.TEXT_PLAIN });
		res.end(this.lang.MESSAGE.NOT_FOUND_404_MESSAGE);
	}

	/**
	 * A method to handle incoming HTTP requests.
	 * @param {*} req | Request object
	 * @param {*} res | Response object
	 */
	handleRequest(req, res) {
		const parsedUrl = parse(req.url, true);
		const pathname = parsedUrl.pathname;

		if (req.method === HTTP_METHODS.GET) {
			const readFileMatch = pathname.match(this.READ_FILE_PATTERN);
			if (readFileMatch) {
				const fileName = readFileMatch[FIRST_CAPTURING_GROUP];
				this.utils.handleReadFile(fileName, res, { SUCCESS_STATUS, NOT_FOUND_STATUS }, CONTENT_TYPES);
				return;
			}

			switch (pathname) {
				case ROUTES.HOME:
					res.writeHead(SUCCESS_STATUS, { CONTENT_TYPE: CONTENT_TYPES.TEXT_HTML });
					res.end(this.lang.HOME);
					break;

				case ROUTES.GET_DATE:
					const name = parsedUrl.query.name || DEFAULT_NAME;
					const now = new Date();
					this.utils.handleGreeting(name, now, res, { SUCCESS_STATUS }, CONTENT_TYPES, FILES.GREETING_FILE);
					break;

				case ROUTES.WRITE_FILE:
					const textToAppend = parsedUrl.query.text;
					if (textToAppend) {
						const dataToAppend = textToAppend.trim() + NEW_LINE;
						this.utils.handleWriteFile(
							FILES.WRITING_FILE,
							dataToAppend,
							res,
							{ SUCCESS_STATUS, NOT_FOUND_STATUS },
							CONTENT_TYPES,
							this.lang.MESSAGE.FILE_WRITE_SUCCESS,
							this.lang.MESSAGE.FILE_WRITE_ERROR,
							this.lang.AUTO_HOME_RETURN
						);
					} else {
						res.writeHead(NOT_FOUND_STATUS, { CONTENT_TYPE: CONTENT_TYPES.TEXT_HTML });
						res.end(`${this.lang.ERROR}${this.lang.WARNING_TEXTLESS}${this.lang.CLOSE_P}${this.lang.AUTO_HOME_RETURN}`);
					}
					break;

				default:
					this.sendNotFound(res);
			}
		} else {
			this.sendNotFound(res);
		}
	}

	/**
	 * Starts the HTTP server.
	 */
	start() {
		const server = createServer(this.handleRequest.bind(this));
		server.listen(PORT, () => {
			console.log(`${PORT}`);
		});
	}
}

const labServer = new LabServer();
labServer.start();
