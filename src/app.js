const path = require("path");
const express = require("express");
const hbs = require("hbs")

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

//define the directory paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../template/views")
const partialsPath = path.join(__dirname, "../template/partials")

//set the hbs configs
app.set("view engine", "hbs")
app.set("views", viewsDirectoryPath)

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Welcome to the weather app",
        description: "Enter a location to get the current weather forecast."
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help and Support",
        description: "This is the help section of the Weather app"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        description: "I am Satish Kumar. I am a newbie backend development"
    })
})

app.get("/weather", (req, res) => {
    console.log(req.query);
    if(!req.query.location || req.query.location.trim().length ===0) {
        return res.send({ error : "location is missing" });
    }

    geocode(req.query.location, (error, {lat, lon, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, lon, (error, { summary, temperature, rainProbability }) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                summary,
                forecast: `Today's temperature is ${ temperature } degree centigrate. There is a ${ rainProbability }% chances of raining`
            })
            // console.log("Forecast: ", location);
            // console.log(chalk.green(summary))
            // console.log(chalk.green(`Todays temperature is ${temperature} degree Celsius`));
            // console.log(chalk.green(`There is a ${rainProbability}% chances of raining`));
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        redirect: "/help",
        title: "Help article not found.",
        redirectTo: "help page"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        redirect: "/"   ,
        title: "404? Voila! you made it here.",
        redirectTo: "home page"
    })
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})