import express from 'express';
let router = express.Router();

import moment from 'moment';

router.get('/', (req, res) => {
	res.render('layout');
});

router.get('/:time', function(req, res) {
	let time = req.params.time;
	if (!isNaN(time)) {
		res.send(getHumanDate(time));
	} else {
		res.send(getUnix(time));
	}
	res.end();
});

function getHumanDate(time) {
	let date = moment.unix(time).format('ll');

	if (date == 'Invalid date') {
		return {
			unix: null,
			natural: null
		};
	}

	let answer = {
		unix: +time,
		natural: date
	};

	return answer;
}

function getUnix(str) {
	let time = str.split(' ');
	let newDate = moment(`${time[0]}/${time[1]}/${time[2]}`, 'MMMM/D/YYYY').valueOf() / 1000;

	let natural = moment.unix(newDate).format('LL');
	if (natural == 'Invalid date') {
		return {
			unix: null,
			natural: null
		};
	}

	return {
		unix: newDate,
		natural
	};
}

module.exports = router;
