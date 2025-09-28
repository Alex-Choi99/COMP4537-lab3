export const MESSAGE = {
  FILE_WRITE_ERROR: 'Error writing to file:',
  FILE_WRITE_SUCCESS: 'Greeting message saved to file successfully',
  NOT_FOUND_404_MESSAGE: 'Not Found'
};

export const HOME =`
  <h1>Lab 3 (Alex Choi - A01323994)</h1>
  <form method="GET" action="/COMP4537/labs/3/getDate" params="$name">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name" required>
    <button type="submit">Greet Me</button>
  </form>
  <br>
  <form method="GET" action="/COMP4537/labs/3/writeFile" params="$text">
    <label for="text">Enter text to write to file:</label>
    <textarea id="text" name="text" rows="4" cols="50" required></textarea>
    <button type="submit">Write to File</button>
  </form>
  <br>
  <button type="button" onclick="window.location.href='/COMP4537/labs/3/readFile/file.txt'">Read from File</button>
`;

export const FILE_WRITE_PAGE = `
  <p>Returning to home in 2 seconds...</p>
  <script>
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  </script>
`;
