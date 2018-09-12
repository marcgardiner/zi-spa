const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const TheEarth = {

    EarthRadius: 6371, // km, miles is 3959

    getDistanceFromRads: (rads) => {
        return parseFloat(rads * TheEarth.EarthRadius);
    },

    getRadsFromDistance: (distance) => {
        return parseFloat(distance / TheEarth.EarthRadius);
    }
};

/* GET list of locations */
module.exports.locationsListByDistance = function(req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const maxDistance = parseFloat(req.query.maxDistance);
    const point = {
        type: 'Point',
        coordinates: [lng, lat]
    };
    const geoOptions = {
        spherical: true,
        maxDistance: TheEarth.getRadsFromDistance(maxDistance),
        num: 10
    };
    if ((!lng && lng !== 0) || (!lat && lat !== 0) || !maxDistance) {
        console.log('locationsListByDistance missing params');
        sendJSONresponse(res, 404, {
            'message': 'lng, lat and maxDistance query parameters are all required'
        });
        return;
    }
    Loc.geoNear(point, geoOptions, (err, results, stats) => {
        console.log('Geo Results', results);
        console.log('Geo stats', stats);
        if (err) {
            console.log('geoNear error:', err);
            sendJSONresponse(res, 404, err);
        }
        else {
            const locations = buildLocationList(req, res, results, stats);
            sendJSONresponse(res, 200, locations);
        }
    });
};

const buildLocationList = function(req, res, results, stats) {
    let locations = [];
    results.forEach((doc) => {
        locations.push({
            distance: TheEarth.getDistanceFromRads(doc.dis),
            name: doc.obj.name,
            address: doc.obj.address,
            rating: doc.obj.rating,
            facilities: doc.obj.facilities,
            _id: doc.obj._id
        });
    });
    return locations;
};

/* GET a location by the id */
module.exports.locationsReadOne = function(req, res) {
    console.log('Finding location details', req.params);
    if (req.params && req.params.locationid) {
        Loc
            .findById(req.params.locationid)
            .exec((err, location) => {
                if (!location) {
                    sendJSONresponse(res, 404, {
                        'message': 'locationid not found'
                    });
                    return;
                }
                else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(location);
                sendJSONresponse(res, 200, location);
            });
    }
    else {
        console.log('No locationid specified');
        sendJSONresponse(res, 404, {
            'message': 'No locationid in request'
        });
    }
};

/* POST a new location */
/* /api/locations */
module.exports.locationsCreate = function(req, res) {
    console.log(req.body);
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(','),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [
            {
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            },
            {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }
        ]
    }, (err, location) => {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        }
        else {
            console.log(location);
            sendJSONresponse(res, 201, location);
        }
    });
};

/* PUT /api/locations/:locationid */
module.exports.locationsUpdateOne = function(req, res) {
    if (!req.params.locationid) {
        sendJSONresponse(res, 404, {
            'message': 'Not found, locationid is required'
        });
        return;
    }
    Loc
        .findById(req.params.locationid)
        .select('-reviews -rating')
        .exec((err, location) => {
            if (!location) {
                sendJSONresponse(res, 404, {
                    'message': 'locationid not found'
                });
                return;
            }
            else if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }

            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(',');
            location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            location.openingTimes = [
                {
                    days: req.body.days1,
                    opening: req.body.opening1,
                    closing: req.body.closing1,
                    closed: req.body.closed1
                }, {
                    days: req.body.days2,
                    opening: req.body.opening2,
                    closing: req.body.closing2,
                    closed: req.body.closed2
                }
            ];

            location.save((err, location) => {
                if (err) {
                    sendJSONresponse(res, 404, err);
                }
                else {
                    sendJSONresponse(res, 200, location);
                }
            });
        });
};

/* DELETE /api/locations/:locationid */
module.exports.locationsDeleteOne = function(req, res) {
    const locationid = req.params.locationid;
    if (locationid) {
        Loc
            .findByIdAndRemove(locationid)
            .exec((err, location) => {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log('Location id ' + locationid + ' deleted');
                sendJSONresponse(res, 204, null);
            });
    }
    else {
        sendJSONresponse(res, 404, {
            'message': 'No locationid'
        });
    }
};
