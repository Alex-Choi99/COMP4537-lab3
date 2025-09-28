import { LangEn } from "../lang/en/en.js";
import fs from 'fs';

const UTF8 = 'utf8';
const NEW_LINE = '\n';

/**
 * Utility class providing helper methods for greeting and file content display.
 */
export class Utils {
	constructor() {
		this.lang = new LangEn();
	}

	/**
	 * Generates HTML content for a greeting message.
	 * @param {*} greetingMessage | The greeting message to be displayed
	 * @returns {string} HTML string containing the greeting message
	 */
	getDate(greetingMessage){
		return `${this.lang.GREETING_TEXT}${greetingMessage}${this.lang.CLOSE_DIV}${this.lang.HOME_BUTTON}`;
	}

    /**
     * Generates a greeting message with the provided name and date.
     * @param {*} name | Name of the person to greet
     * @param {*} date | Current date
     * @returns {string} Greeting message
     */
    greeting(name, date) {
        return `${this.lang.HELLO}${name}${this.lang.GREET_TIME}${date.toString()}`;
    }

    /**
     * Generates HTML content to display the contents of a file.
     * @param {*} fileName | Name of the file
     * @param {*} data | Content of the file
     * @returns {string} HTML string to display file contents
     */
    readFileContent(fileName, data) {
        return `${this.lang.FILE_CONTENT}${fileName}${this.lang.FILE_CONTENT2}${data}${this.lang.CLOSE_PRE}${this.lang.HOME_BUTTON}`;
    }

    /**
	 * Handles reading a file and sending the response.
	 * @param {*} fileName | Name of the file to read
	 * @param {*} res | Response object
	 * @param {*} statusCodes | Status codes object
	 * @param {*} contentTypes | Content types object
	 */
    handleReadFile(fileName, res, statusCodes, contentTypes) {
        const { NOT_FOUND_STATUS, SUCCESS_STATUS } = statusCodes;
        const { TEXT_HTML } = contentTypes;

        fs.readFile(fileName, UTF8, (err, data) => {
            if (err) {
                res.writeHead(NOT_FOUND_STATUS, { CONTENT_TYPE: TEXT_HTML });
                res.end(`${this.lang.ERROR}${this.lang.FILE_READ_ERROR}${this.lang.TEXT_FILE}${fileName}${this.lang.HYPHEN}${err.message}${this.lang.CLOSE_P}${this.lang.AUTO_HOME_RETURN}`);
                return;
            }
            res.writeHead(SUCCESS_STATUS, { CONTENT_TYPE: TEXT_HTML });
            res.end(this.readFileContent(fileName, data));
        });
    }

    /**
	 * Handles writing to a file and sending the response.
	 * @param {*} fileName | Name of the file
	 * @param {*} dataToAppend | Data to append to the file
	 * @param {*} res | Response object
	 * @param {*} statusCodes | Status codes object
	 * @param {*} contentTypes | Content types object
	 * @param {*} successMsg | Success message
	 * @param {*} errorMsg | Error message
	 * @param {*} autoReturnHtml | HTML for auto return
	 */
    handleWriteFile(fileName, dataToAppend, res, statusCodes, contentTypes, successMsg, errorMsg, autoReturnHtml) {
        const { SUCCESS_STATUS, NOT_FOUND_STATUS } = statusCodes;
        const { TEXT_HTML } = contentTypes;

        fs.appendFile(fileName, dataToAppend, { encoding: UTF8 }, (err) => {
            let pageMessage = '';
            if (err) {
                console.error(errorMsg, err);
                pageMessage = `${this.lang.ERROR}${errorMsg} ${err.message}${this.lang.CLOSE_P}`;
            } else {
                pageMessage = `${this.lang.SUCCESS}${successMsg}${this.lang.TEXT_ADDED}${dataToAppend.trim()}${this.lang.TEXT_TO}${fileName}${this.lang.CLOSE_P}`;
            }
            res.writeHead(SUCCESS_STATUS, { CONTENT_TYPE: TEXT_HTML });
            res.end(pageMessage + autoReturnHtml);
        });
    }

    /**
	 * Handles greeting logic and file logging.
	 * @param {*} name | Name of the person to greet
	 * @param {*} now | Current date
	 * @param {*} res | Response object
	 * @param {*} statusCodes | Status codes object
	 * @param {*} contentTypes | Content types
	 * @param {*} fileName | File to log the greeting message
	 */
    handleGreeting(name, now, res, statusCodes, contentTypes, fileName) {
        const { SUCCESS_STATUS } = statusCodes;
        const { TEXT_HTML } = contentTypes;
        const greetingMessage = this.greeting(name, now);
        let html = this.getDate(greetingMessage);
        const logMessage = `${greetingMessage.trim()}${NEW_LINE}`;
        fs.appendFile(fileName, logMessage + NEW_LINE, { encoding: UTF8 }, (err) => {
            if (err) {
                console.error(this.lang.MESSAGE.FILE_WRITE_ERROR, err);
            } else {
                console.log(this.lang.MESSAGE.FILE_WRITE_SUCCESS);
            }
        });
        res.writeHead(SUCCESS_STATUS, { CONTENT_TYPE: TEXT_HTML });
        res.end(html);
    }
}
