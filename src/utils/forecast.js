const request = require("request");

const darkskyUrl = "https://api.darksky.net/forecast/4c41b94e94e2bea592073363b42cb45c/"


const forecast = (lat, lon, cb) => {
    request.get({
        url: `${darkskyUrl}${lat},${lon}?units=si`,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            return cb("Server error", {})
        }

        if (body.error) {
            return cb({
                "error": "Invalid location"
            }, {})
        }

        cb(undefined, {
            summary: body.daily.summary,
            temperature: body.currently.temperature,
            rainProbability: Math.round(body.currently.precipProbability * 100)
        })
    })
}

module.exports = forecast;