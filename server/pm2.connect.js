var pm2 = require('pm2');

pm2.connect(function (err) {
	if (err) {
		console.error('pm2 connect err', err);
		process.exit(2);
	}

	console.info('pm2 connected');

	pm2.start({
		script: './dist/index.js',         // Script to be run
		name: 'app-server',         // Script to be run
		output: './.pm2/out.log',
		error: './.pm2/error.log',
		pid: './.pm2/httpServer.pid',
		logDateFormat: 'YYYY-MM-DD HH:mm:ss',
		exec_mode: 'cluster',
		instances: 3,                 // Optional: Scales your app, 0：max
		mergeLogs: true,
	}, function (err, proc) {
		console.info('pm2 disconnect err = ', err);
		if (err) {
			throw err;
		}
	});
});