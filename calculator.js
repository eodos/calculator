// Button handlers
$(document).ready(() => {
	$('button').click(function() {
		let entry = $(this).attr('value');
		parseKey(entry);
	});
});

// Key press handlers
$(document).keypress(function(event) {
	console.log('Key pressed: ' + event.key);
	switch (event.key) {
		case 'Enter':
			parseKey('=');
			break;
		case '/':
			parseKey('%');
			break;
		case '*':
			parseKey('x');
			break;
		default:
			parseKey(event.key);
			break;
	}
});

var digits = 0;
var entry = '0';
var isDecimal = false;
var calculatorHistory = '0';
var operation = '';
var operationFinished = false;
var partialSolution = 0;
var showResult = false;

function parseKey(key) {
	console.log('Entry: ' + key);

	if ($.isNumeric(key)) {
		parseNumber(key);
	} else {
		switch (key) {
			case '.':
				parseDecimal();
				break;
			case '=':
				solve();
				break;
			case '+':
			case '-':
				parseOperator(key);
				break;
			case 'ce':
				entry = '0';
				digits = 0;
				break;
			case 'ac':
				reset();
				break;
		}
	}

	// Update display
	$('#current').text(entry);
	$('#history').text(calculatorHistory);

	console.log('Digits: ' + digits);
}

function parseNumber(key) {
	entry = entry === '0' || showResult ? key : entry.concat(key);
	digits = (entry === '0' || showResult) && key === '0' ? 0 : digits + 1;
	showResult = false;

	if (digits == 10) {
		reset();
		entry = 'Max digits';
		showResult = true;
	}
}

function parseDecimal() {
	if (!isDecimal) {
		isDecimal = true;
		digits++;
		entry = entry.concat('.');
	}
}

function parseOperator(operator) {
	if (operationFinished) {
		operationFinished = false;
		calculatorHistory = '0';
	}
	operation = operator;
	parsePartialSolution(entry);

	calculatorHistory =
		calculatorHistory === '0' ? entry + operator : calculatorHistory.concat(entry + operator);
	console.log('Operator: ' + operation);
	console.log('History: ' + calculatorHistory);

	entry = String(partialSolution);
	showResult = true;
	isDecimal = false;
	digits = 0;
}

function parsePartialSolution(input) {
	switch (operation) {
		case '+':
			partialSolution += Number(input);
			break;
		case '-':
			partialSolution -= Number(input);
			break;
	}
	console.log('Partial solution: ' + input);
}

function solve() {
	if (calculatorHistory == '0') {
		calculatorHistory = entry;
	} else if (calculatorHistory.charAt(calculatorHistory.length - 1) !== '=') {
		parsePartialSolution(entry);
		calculatorHistory = calculatorHistory.concat(entry + '=' + partialSolution);
	}
	// reset();
	operationFinished = true;
	showResult = true;
	history = '0';
	operation = '';
	partialSolution = 0;
	// TODO: fix reset() to do a partial re-initialization of variables
}

function reset() {
	digits = 0;
	isDecimal = false;
	entry = '0';
	history = '0';
	operation = '';
	calculatorHistory = '0';
	partialSolution = 0;
}
