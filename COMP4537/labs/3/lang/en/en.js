const UI_TEXT = {
  WELCOME_TITLE: 'Lab 3 (Alex Choi - A01323994)',
  NAME_LABEL: 'Enter your name:',
  SUBMIT_BUTTON: 'Greet Me',
  GREETING_PREFIX: 'Hello ',
  GREETING_SUFFIX: 'What a beautiful day.',
  DATE_MESSAGE_PREFIX: 'Server current date and time is'
};

const FORM_CONFIG = {
  METHOD: 'GET',
  ACTION: '/COMP4537/labs/3/getDate',
  PARAMS: 'name',
  INPUT_ID: 'name',
  INPUT_NAME: 'name'
};

export const NOT_FOUND_MESSAGE = 'Not Found';

export function home() {
  return `
					<h1>${UI_TEXT.WELCOME_TITLE}</h1>
					<form method="${FORM_CONFIG.METHOD}" action="${FORM_CONFIG.ACTION}" params="${FORM_CONFIG.PARAMS}">
						<label for="${FORM_CONFIG.INPUT_ID}">${UI_TEXT.NAME_LABEL}</label>
						<input type="text" id="${FORM_CONFIG.INPUT_ID}" name="${FORM_CONFIG.INPUT_NAME}" required>
						<button type="submit">${UI_TEXT.SUBMIT_BUTTON}</button>
					</form>
				`
}

export function greet(name) {
  return `${UI_TEXT.GREETING_PREFIX} [${name}], ${UI_TEXT.GREETING_SUFFIX}<br>`;
}

export function dateMessage(dateStr) {
  return `${UI_TEXT.DATE_MESSAGE_PREFIX} ${dateStr}`;
}
