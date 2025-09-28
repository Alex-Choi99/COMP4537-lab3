import { LangEn } from "../lang/en/en.js";

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
}
