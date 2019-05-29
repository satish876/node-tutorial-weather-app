const request = require("request")

const mapboxToken = "pk.eyJ1Ijoia3VtYXJzYXRpc2g4NzYiLCJhIjoiY2p3M2oxcmdhMGo1NjRicXI3MHhzNHRvaSJ9.eIiiQ_dyA1x38oxjz_PATw"
const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places"

const geocode = (location, cb) => {
    const url = `${mapboxUrl}/${encodeURIComponent(location)}.json?access_token=${mapboxToken}&limit=1`;
    request.get({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            return cb("Server error", {});
        }

        const geo = body.features[0];

        if (!geo) {
            return cb("Location not found!", {});
        }

        cb(undefined, {
            lon: geo.center[0],
            lat: geo.center[1],
            location: geo.place_name
        })
    })
}

module.exports = geocode;