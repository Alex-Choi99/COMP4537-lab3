/**
 * Generates a greeting message with the provided name and date.
 * @param {*} name | Name of the person to greet
 * @param {*} date | Current date
 * @returns {string} Greeting message
 */
export function greeting(name, date) {
  return `
    Hello [${name}], What a beautiful day.
	Server current date and time is ${date.toString()}
`;
}

/**
 * Generates HTML content to display the contents of a file.
 * @param {*} fileName | Name of the file
 * @param {*} data | Content of the file
 * @returns {string} HTML string to display file contents
 */
export function readFileContent(fileName, data) {
    return `
        <h3>Contents of ${fileName}:</h3>
        <pre>${data}</pre>
        <button onclick="window.location.href='/'">Go Back</button>
    `;
}
