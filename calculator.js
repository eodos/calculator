$(document).ready(() => {
	$('button').click(function() {
		let entry = $(this).attr('value');
		parseKey(entry);
	});
});

var digits = 0;
var entry = '0';
var isDecimal = false;
var calculatorHistory = '0';
var operation = '';
var operationFinished = false;
var partialSolution = 0;

function parseKey(key) {
	console.log('Entry: ' + key);

	if ($.isNumeric(key)) {
		parseNumber(key);
	}
	switch (key) {
		case '.':
			parseDecimal();
			break;
		case '=':
			solve();
			break;
		case '+':
			parseOperator(key);
			break;
		case 'ac':
			reset();
			break;
	}

	console.log('Digits: ' + digits);
}

function parseNumber(key) {
	entry = entry === '0' ? key : entry.concat(key);
	digits = entry === '0' ? 0 : digits + 1;

	if (digits == 10) {
		reset();
		return;
	}
	$('#current').text(entry);
}

function parseDecimal() {
	if (!isDecimal) {
		isDecimal = true;
		digits++;
		entry = entry.concat('.');
		$('#current').text(entry);
	}
}

function parseOperator(operator) {
	calculatorHistory =
		calculatorHistory === '0' ? entry + operator : calculatorHistory.concat(entry + operator);

	partialSolution = Number(entry);
	operation = operator;
	console.log('Operator: ' + operation);
	console.log('History: ' + calculatorHistory);

	// switch (operator) {
	// 	case '+':
	// 		break;
	// }

	entry = '0';
	isDecimal = false;
	digits = 0;
	$('#history').text(calculatorHistory);
	$('#current').text(entry);
}

function solve() {
	if (calculatorHistory == '0') {
		calculatorHistory = entry;
	} else {
		calculatorHistory = calculatorHistory.concat(entry + '=');
		console.log(entry + ' ' + calculatorHistory);
		switch (operation) {
			case '+':
				console.log('Adding');
				partialSolution += Number(entry);
				break;
		}
		entry = partialSolution;
		console.log('Solution: ' + entry);
	}
	$('#history').text(calculatorHistory);
	$('#current').text(entry);
	reset();
}

function maxDigits() {
	console.log('Max digits reached');
	$('#current').text('Max digits reached');
	reset();
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
