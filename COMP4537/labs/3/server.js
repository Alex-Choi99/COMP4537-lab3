/**
 * Alex Choi - A01323994
 * Lab 3 - Basic HTTP Server with File Operations
 * COMP4537 - Web Development
 * Date: September 2025
 * I acknowledge that I used VSCode Copilot to assist in the development of this code.
 */

import { createServer } from 'http';
import { parse } from 'url';
import fs from 'fs';
import { Utils } from './modules/utils.js';
import { LangEn } from './lang/en/en.js';

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
const UTF8 = 'utf8';
const NEW_LINE = '\n';
const CONTENT_TYPE = 'Content-Type';

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
				const fileName = readFileMatch[1];
				fs.readFile(fileName, UTF8, (err, data) => {
					if (err) {
						res.writeHead(NOT_FOUND_STATUS, { CONTENT_TYPE: CONTENT_TYPES.TEXT_HTML });
						res.end(`${this.lang.ERROR}${this.lang.FILE_READ_ERROR}${this.lang.TEXT_FILE}${fileName}${this.lang.HYPHEN}${err.message}${this.lang.CLOSE_P}${this.lang.AUTO_HOME_RETURN}`);
						return;
					}
					res.writeHead(SUCCESS_STATUS, { CONTENT_TYPE: CONTENT_TYPES.TEXT_HTML });
					res.end(this.utils.readFileContent(fileName, data));
				});
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
					const greetingMessage = this.utils.greeting(name, now);
					let html = this.utils.getDate(greetingMessage);
					const logMessage = `${greetingMessage.trim()}${NEW_LINE}`;

					fs.appendFile(FILES.GREETING_FILE, logMessage + NEW_LINE, { encoding: UTF8 }, function(err) {
						if (err) {
							console.error(this.lang.MESSAGE.FILE_WRITE_ERROR, err);
						} else {
							console.log(this.lang.MESSAGE.FILE_WRITE_SUCCESS);
						}
					}.bind(this));

					res.writeHead(SUCCESS_STATUS, { CONTENT_TYPE: CONTENT_TYPES.TEXT_HTML });
					res.end(html);
					break;

				case ROUTES.WRITE_FILE:
					const textToAppend = parsedUrl.query.text;
					if (textToAppend) {
						const dataToAppend = textToAppend.trim() + NEW_LINE;
						fs.appendFile(FILES.WRITING_FILE, dataToAppend, { encoding: UTF8 }, function(err) {
							let pageMessage = '';
							if (err) {
								console.error(this.lang.MESSAGE.FILE_WRITE_ERROR, err);
								pageMessage = `${this.lang.ERROR}${this.lang.MESSAGE.FILE_WRITE_ERROR} ${err.message}${this.lang.CLOSE_P}`;
							} else {
								pageMessage = `${this.lang.SUCCESS}${this.lang.MESSAGE.FILE_WRITE_SUCCESS}${this.lang.TEXT_ADDED}${textToAppend}${this.lang.TEXT_TO}${FILES.WRITING_FILE}${this.lang.CLOSE_P}`;
							}
							res.writeHead(SUCCESS_STATUS, { CONTENT_TYPE: CONTENT_TYPES.TEXT_HTML });
							res.end(pageMessage + this.lang.AUTO_HOME_RETURN);
						}.bind(this));
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

	start() {
		const server = createServer(this.handleRequest.bind(this));
		server.listen(PORT, () => {
			console.log(`${PORT}`);
		});
	}
}

const labServer = new LabServer();
labServer.start();
