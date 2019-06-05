const express = require('express');
const app = express();
const debug = require('debug')("appjs");
const bodyParser = require('body-parser');
const cors = require('cors')
var mysql = require('mysql');
var multer = require('multer');
var path = require('path');
var corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
var con = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

var storage = multer.diskStorage({
	// destination
	destination: function (req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});

con.connect(function (err) {
	if (err) {
		console.log(err);
		debug(err);
	}
	else {
		console.log("CONNECT TO DATABASE");
		debug("Connected to Database!!!");
	}
});

// app.use(cors());
app.use(bodyParser.json());

// app.listen(8000, () => {
// 	debug('Server started!');
// });
app.route('/api/test').get((req, res) => {
	console.log("TESTROUTE");
	debug("TESTROUTE");
});

app.route('/api/createPlace').post((req, res) => {
	console.log(req.body);
	con.query(`insert into attraction values ('',
		'${req.body.placeName}',
		'${req.body.operDay}',
		'${req.body.operTime}',
		'${req.body.suggTime}',
		'${req.body.cost}',
		'${req.body.type}',
		'${req.body.area}',
		'${req.body.transportation}',
		'${req.body.description}',
		'N',
		'',
		'0',
		'0')`, function (err, result, field) {
			if (err) console.log(err);
			else con.query(`select attID from attraction where name='${req.body.placeName}'`, function (err, result, field) {
				res.send(result);
			});;
		});;
});

app.route('/api/createEvent').post((req, res) => {
	console.log(req.body);
	con.query(`insert into events values ('',
		'${req.body.eventName}',
		'',
		'${req.body.time}',
		'',
		'${req.body.cost}',
		'${req.body.type}',
		'${req.body.location}',
		'${req.body.transportation}',
		'${req.body.description}',
		'${req.body.startdate}',
		'${req.body.enddate}',
		'N',
		'',
		'0',
		'0')`, function (err, result, field) {
			if (err) console.log(err);
			else con.query(`select attID from events where name='${req.body.eventName}'`, function (err, result, field) {
				if (err) console.log(err);
				console.log(result);
				res.send(result);
			});;
		});;
});

app.route('/api/getPlace').post((req, res) => {
	console.log(req.body);
	con.query(`select * from attraction where attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
		//console.log(result);
		res.send(result);
	});;
});

app.route('/api/getEvent').post((req, res) => {
	console.log(req.body);
	con.query(`select * from events where attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
		//console.log(result);
		res.send(result);
	});;
});

app.route('/api/getComments/:id').get((req, res) => {
	console.log(req.body);
	con.query(`select name, feedback, date, rating from went_to_attraction join users on went_to_attraction.uid = users.uid where attID='${req.params.id}'`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	});;
});

app.route('/api/getRoute/:id').get((req, res) => {
	console.log(req.body);
	con.query(`select * from contains join attraction on contains.attID=attraction.attID where routeID='${req.params.id}' order by time`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	});;
});

app.route('/api/getUser/:id').get((req, res) => {
	console.log(req.body);
	con.query(`select name from users where uid='${req.params.id}'`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	});;
});

app.route('/api/suggestPlaces/:key').get((req, res) => {
	console.log(req.params.key);
	con.query(`select attraction.attID, attraction_name.name, description from attraction join attraction_name on attraction.attId=attraction_name.attID where attraction_name.name like '%${req.params.key}%' and validated='Y' order by name`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	});;
});

app.route('/api/listPlaces').post((req, res) => {
	console.log(req.body);
	con.query(`select attID, name, description from attraction where type='${req.body.type}' and validated='Y'`, function (err, result, field) {
		if (err) console.log(err);
		//console.log(result);
		res.send(result);
	});;
});

app.route('/api/listEvents').get((req, res) => {
	console.log(req.body);
	con.query(`select * from events where validated='Y' and datediff(endDate, sysdate())>=0 and datediff(sysdate(), startDate)>=0`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/findPlace').post((req, res) => {
	console.log(req.body);
	con.query(`select attID from attraction 
				where name='${req.body.searchKey}' 
				and validated='Y'`, function (err, result, field) {
			if (err) console.log(err);
			//console.log(result);
			res.send(result);
		});;
});

app.post("api/upload/:id", upload.array("uploads[]", 12), function (req, res) {
	console.log('files', req.files);
	for (var i = 0; i < req.files.length; i++) {
		con.query(`update attraction set imgSrc ='${req.files[i].originalname}' where attID='${req.params.id}'`, function (err, result, field) {
			if (err) console.log(err);
			//console.log(result);
		});;
	}
	res.send(req.files);
});

app.post("/api/uploadevent/:id", upload.array("uploads[]", 12), function (req, res) {
	console.log('files', req.files);
	for (var i = 0; i < req.files.length; i++) {
		con.query(`update events set imgSrc='${req.files[i].originalname}' where attID='${req.params.id}'`, function (err, result, field) {
			if (err) console.log(err);
			console.log(result);
		});;
	}
	res.send(req.files);
});

app.route('/api/checkUnv').get((req, res) => {
	console.log(req.body);
	var temp = [];
	con.query(`select count(validated) as count1 from attraction where validated='N'`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		temp.push(result);
	});;
	con.query(`select count(validated) as count2 from events where validated='N'`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		temp.push(result);
		res.send(temp);
	});;
});

app.route('/api/unvEvents').get((req, res) => {
	console.log(req.body);
	con.query(`select count(validated) as count from events where validated='N'`, function (err, result, field) {
		if (err) console.log(err);
		//console.log(result);
		res.send(result);
	});;
});

app.route('/api/getUnvPlaces').get((req, res) => {
	console.log(req.body);
	con.query(`select * from attraction where validated='N'`, function (err, result, field) {
		if (err) console.log(err);
		//console.log(result);
		res.send(result);
	});;
});

app.route('/api/getUnvEvents').get((req, res) => {
	console.log(req.body);
	con.query(`select * from events where validated='N'`, function (err, result, field) {
		if (err) console.log(err);
		//console.log(result);
		res.send(result);
	});;
});

app.get('/api/pic/:id', function (req, res) {
	con.query(`select imgSrc from attraction where attID='${req.params.id}'`, function (err, rows, field) {
		// var temp = [];
		// for (var i = 0; i < JSON.parse(JSON.stringify(rows)).length ; i++) {
		// 	temp.push(JSON.parse(JSON.stringify(rows))[i].src);
		// }
		debug("getPIC %O", rows);
		console.log(JSON.parse(JSON.stringify(rows))[0].imgSrc);
		res.sendFile("/uploads/" + JSON.parse(JSON.stringify(rows))[0].imgSrc, { "root": __dirname });
	});;

});

app.get('/api/eventpic/:id', function (req, res) {
	con.query(`select imgSrc from events where attID='${req.params.id}'`, function (err, rows, field) {
		// debug(rows);
		// var temp = [];
		// for (var i = 0; i < JSON.parse(JSON.stringify(rows)).length ; i++) {
		// 	temp.push(JSON.parse(JSON.stringify(rows))[i].src);
		// }
		console.log(JSON.parse(JSON.stringify(rows))[0].imgSrc);
		res.sendFile("/uploads/" + JSON.parse(JSON.stringify(rows))[0].imgSrc, { "root": __dirname });
	});;

});

app.route('/api/relatedPlaces/:id').get((req, res) => {
	console.log(req.body);
	con.query(`select attID, name 
				from attraction 
				where type=(select type from attraction 
							where attID = '${req.params.id}') 
						and not attID = '${req.params.id}' 
						and validated='Y' 
						order by name`, function (err, result, field) {
			if (err) console.log(err);
			console.log(result);
			res.send(result);
		});;
});

app.route('/api/relatedArea/:id').get((req, res) => {
	console.log(req.body);
	con.query(`select attID, name from attraction where zone=(select zone from attraction where attID = '${req.params.id}') and not attID = '${req.params.id}' and validated='Y' order by name`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	});;
});

app.route('/api/getRouteLists').get((req, res) => {
	console.log(req.body);
	con.query(`select distinct type1, routeID from route where not type1='';`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	});;
});

app.route('/api/checkFav').post((req, res) => {
	console.log(req.body);
	con.query(`select count(*) as count from favorite where uid='${req.body.user}' and attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		res.send(result);
	});;
});

app.route('/api/addFav').post((req, res) => {
	console.log(req.body);
	con.query(`insert into favorite values ('${req.body.user}', '${req.body.id}')`, function (err, result, field) {
		if (err) console.log(err);
	});;
});

app.route('/api/setName').post((req, res) => {
	console.log(req.body);
	con.query(`insert into attraction_name values ('${req.body.att}', '${req.body.name}')`, function (err, result, field) {
		if (err) console.log(err);
	});;
});

app.route('/api/removeFav').post((req, res) => {
	console.log(req.body);
	con.query(`delete from favorite where uid='${req.body.user}' and attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
	});;
});

app.route('/api/commentRoute').post((req, res) => {
	console.log(req.body);
	con.query(`update went_to_route set feedback='${req.body.cmt}', rating='${req.body.rate}' where uID='${req.body.uid}' and routeID='${req.body.rid}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/isRated').post((req, res) => {
	console.log(req.body);
	con.query(`select feedback from went_to_route where uID='${req.body.uid}' and routeID='${req.body.rid}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/valPlace').post((req, res) => {
	console.log(req.body);
	con.query(`update attraction set validated='Y' where attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/delPlace').post((req, res) => {
	console.log(req.body);
	con.query(`delete from attraction where attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/valEvent').post((req, res) => {
	console.log(req.body);
	con.query(`update events set validated='Y' where attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/delEvent').post((req, res) => {
	console.log(req.body);
	con.query(`delete from events where attID='${req.body.id}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/createRoute').post((req, res) => {
	console.log(req.body);

	con.query(`insert into route values ('', '${req.body.route.length}', '');`, function (err, result, field) {
		if (err) console.log(err);
		console.log(result);
		con.query(`select max(routeID) as last from route`, function (err, rows, field) {
			if (err) console.log(err);
			console.log(JSON.parse(JSON.stringify(rows))[0].last);
			con.query(`insert into went_to_route values ('${JSON.parse(JSON.stringify(rows))[0].last}', '${req.body.user}', '', '${req.body.date}', '')`, function (err, result, field) {
				if (err) console.log(err);
				res.send(result);
			});;
			for (var i = 0; i < req.body.route.length; i++) {
				con.query(`insert into contains values ('${req.body.route[i].attID}', '${i + 1}', '${JSON.parse(JSON.stringify(rows))[0].last}')`, function (err, result, field) {
					if (err) console.log(err);
				});;
			}
		});;
	});;
});

app.route('/api/listFav/:id').get((req, res) => {
	console.log(req.params.id);
	con.query(`select attraction.attID, name, description from attraction join favorite on attraction.attID = favorite.attID where favorite.uid='${req.params.id}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/listWtr/:id').get((req, res) => {
	console.log(req.params.id);
	con.query(`select went_to_route.routeID, date, attraction.name from went_to_route join contains on went_to_route.routeID=contains.routeID join attraction on contains.attID=attraction.attID where went_to_route.uid = '${req.params.id}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

app.route('/api/token').post((req, res) => {
	debug("HERE IS THE TOKENNNNN PART");
	debug(req.body);
	con.query(`select uid from users where email = '${req.body.email}'`, function (err, result, field) {
		//if (err) console.log(err);
		console.log(result);
		if (result == '') {
			debug("NOT CREATED YET");
			console.log('here');
			// con.query(`insert into users (uid, name, email,prefID) values ('', '${req.body.name}', '${req.body.email}',1)`, 
			con.query(`insert into users (name, email) values ('${req.body.name}','${req.body.email}')`,
				function (err, result, field) { //prefID
					if (field)
						debug("FIELD %O", field);
					if (err)
						debug("Error %o ", err);
					else
						debug("DONE %O", result);
					// if (err) console.log(err);
					// else console.log(result);
				});;
		} else res.send(result);
	});;
});

app.route('/api/editPlace').post((req, res) => {
	console.log(req.body);
	con.query(`update attraction set 
		name= '${req.body.place.placeName}',
		operDate= '${req.body.place.operDay}',
		operTime='${req.body.place.operTime}',
		suggTime='${req.body.place.suggTime}',
		cost='${req.body.place.cost}',
		type='${req.body.place.type}',
		zone='${req.body.place.area}',
		transportation='${req.body.place.transportation}',
		description='${req.body.place.description}',
		lat='${req.body.place.lat}',
		lng='${req.body.place.lng}',
		validated='Y'
				where attID = '${req.body.id}'`, function (err, result, field) {
			if (err) console.log(err);
			else {
				console.log(result);
				con.query(`select attID from attraction where name='${req.body.place.placeName}'`, function (err, result, field) {
					console.log('result: attID ---------------------');
					console.log(result);
					res.send(result);
				});;
			}
		});;
});
app.route('/api/editName').post((req, res) => {
	console.log(req.body);
	con.query(`update attraction_name set name ='${req.body.nname}'  where attID='${req.body.id}'and name= '${req.body.name}')`, function (err, result, field) {
		if (err) console.log(err);
	});;
});
app.route('/api/getNames/:id').get((req, res) => {
	console.log(req.body);
	con.query(`select attraction_name.name from attraction_name where attID ='${req.params.id}'`, function (err, result, field) {
		if (err) console.log(err);
		res.send(result);
	});;
});

if (process.env.NODE_ENV == "production") {
	console.log("PRODUCTION SERVING INDEX DEPLOY");
	debug("PRODUCTION SERVING INDEX DEPLOY");
	app.use(express.static(path.join(__dirname, "../dist/BTA")));
	app.get('/*', (req, res) => {
		res.sendFile((path.join(__dirname, "../dist/BTA/index.html")));
	});
}

module.exports = app;

