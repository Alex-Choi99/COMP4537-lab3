/**
 * Language class for English messages and HTML content.
 */
class LangEn {
  constructor() {
    this.MESSAGE = {
      FILE_WRITE_ERROR: 'Error writing to file:',
      FILE_WRITE_SUCCESS: 'Greeting message saved to file successfully',
      NOT_FOUND_404_MESSAGE: 'Not Found'
    };
    this.HOME = `
      <h1>Lab 3 (Alex Choi - A01323994)</h1>
      <form method="GET" action="/COMP4537/labs/3/getDate" params="$name">
        <label for="name">Enter your name:</label>
        <input type="text" id="name" name="name" required>
        <button type="submit">Greet Me</button>
      </form>
      <br>
      <form method="GET" action="/COMP4537/labs/3/writeFile/" params="$text">
        <label for="text">Enter text to write to file:</label>
        <textarea id="text" name="text" rows="4" cols="50" required></textarea>
        <button type="submit">Write to File</button>
      </form>
      <br>
      <button type="button" onclick="window.location.href='/COMP4537/labs/3/readFile/file.txt'">Read from File</button>
    `;
    this.AUTO_HOME_RETURN = `
      <p>Returning to home in 2 seconds...</p>
      <script>
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      </script>
    `;
    this.CLOSE_DIV = `</div>`;
    this.CLOSE_P = `.</p>`;
    this.HOME_BUTTON = `<button onclick="window.location.href='/'">Go Back</button>`;
    this.GREETING_TEXT = `<div style="color:blue;">`;
    this.ERROR = `<div style="color:red;">`;
    this.SUCCESS = `<div style="color:green;">`;
    this.TEXT_FILE = ` File: `;
    this.HYPHEN = ` - `;
    this.TEXT_ADDED = `: Added "`;
    this.TEXT_TO = `" to `;
    this.WARNING_TEXTLESS = `No text provided to write to file.`;
    this.HELLO = `Hello [`;
    this.GREET_TIME = `], What a beautiful day.\nServer current date and time is `;
    this.FILE_CONTENT = `<h3>Contents of ` ;
    this.FILE_CONTENT2 = `:</h3><pre>`;
    this.CLOSE_PRE = `</pre>`;
  }
}

module.exports = LangEn;