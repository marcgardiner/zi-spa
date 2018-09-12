const request = require('request');
const apiOptions = {
    server: process.env.SERVER_URL || 'http://localhost:3000'
};

const _isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const _formatDistance = (distance) => {
    let numDistance, unit;
    if (distance && _isNumeric(distance)) {
        if (distance > 1) {
            numDistance = parseFloat(distance).toFixed(1);
            unit = 'km';
        }
        else {
            numDistance = parseInt(distance * 1000, 10);
            unit = 'm';
        }
        return numDistance + unit;
    }
    else {
        return '?';
    }
};

const _showError = (req, res, status) => {
    let title, content;
    if (status === 404) {
        title = '404, page not found';
        content = `Oh dear. Looks like we can't find this page. Sorry.`;
    }
    else if (status === 500) {
        title = '500, internal server error';
        content = `How embarrassing. There's a problem with our server.`;
    }
    else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};

const renderHomepage = (req, res, responseBody) => {
    res.render('locations-list', {
        title: 'zispa - find a place to work with wifi',
        pageHeader: {
            title: 'zispa',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: `Looking for wifi and a seat? zispa helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let zispa help you find the place you're looking for.`
    });
};

/* GET 'home' page */
module.exports.homelist = (req, res) => {
    renderHomepage(req, res);
};

const getLocationInfo = (req, res, callback) => {
    let requestOptions, path;
    path = '/api/locations/' + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(requestOptions, (_err, response, body) => {
        let data = body;
        if (response.statusCode === 200) {
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };
            callback(req, res, data);
        }
        else {
            _showError(req, res, response.statusCode);
        }
    });
};

const renderDetailPage = (req, res, locDetail) => {
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        sidebar: {
            context: 'is on zispa because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: `If you've been and you like it - or if you don't - please leave a review to help other people just like you.`
        },
        location: locDetail
    });
};

/* GET 'Location info' page */
module.exports.locationInfo = (req, res) => {
    getLocationInfo(req, res, (req, res, responseData) => {
        renderDetailPage(req, res, responseData);
    });
};

const renderReviewForm = (req, res, locDetail) => {
    res.render('location-review-form', {
        title: `Review ${locDetail.name} on zispa`,
        pageHeader: {
            title: 'Review ' + locDetail.name
        },
        error: req.query.err,
        url: req.originalUrl
    });
};

/* GET 'Add review' page */
module.exports.addReview = (req, res) => {
    getLocationInfo(req, res, (req, res, responseData) => {
        renderReviewForm(req, res, responseData);
    });
};

/* POST 'Add review' page */
module.exports.doAddReview = (req, res) => {
    const locationid = req.params.locationid;
    const path = `/api/locations/${locationid}/reviews`;
    const postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/location/' + locationid + '/reviews/new?err=val');
    }
    else {
        request(requestOptions, (_err, response, body) => {
            if (response.statusCode === 201) {
                res.redirect('/location/' + locationid);
            }
            else if (response.statusCode === 400 && body.name && body.name === 'ValidationError') {
                res.redirect('/location/' + locationid + '/reviews/new?err=val');
            }
            else {
                console.log(body);
                _showError(req, res, response.statusCode);
            }
        });
    }
};
