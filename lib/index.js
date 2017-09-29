import express from 'express';
import path from 'path';

import routes from '../routes/index';

let app = express();

//NOTE remove if favicon is supplied
app.get('/favicon.ico', function(req, res) {
	res.status(204);
});

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use('/', routes);

app.use((req, res, next) => {
	res.status(404).render('404');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Running on port 3000');
});
