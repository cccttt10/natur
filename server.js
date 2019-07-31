const app = require('./app');

const port = 3300;

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
