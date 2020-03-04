let webcamData
const webcamView = document.querySelector(".single-webcam")
const shuffleButton = document.querySelector(".shuffle")

const flashScreen = document.querySelector(".flash")
let currentTimeZone = 0
let webcams = new Array()

d3.csv("data/webcams_headers.csv").then(function (data) {
    webcamData = data
    initiateData(data)
})

function initiateData(data) {
    //check the length of the webcam array
    //add a webcam until there are x elements in the array
    while (webcams.length < 5) {
        const randomWebcamId = Math.floor(Math.random() * data.length)
        //check that the webcam is not a black screen
        //or that it doesn't reply with a black screen
        //if not, then, add it to the array of webcams for preloading. 
        const webcam = new Webcam(randomWebcamId)
        const currentFeed = preload(data[randomWebcamId].Url, randomWebcamId)
        if (currentFeed != null) {
            webcam.setImg(currentFeed)
            webcams.push(webcam)
        }
    }
    const randomWebcam = webcams[0].id
    webcamView.style.backgroundImage = `url(${data[randomWebcam].Url})`
    //TODO: change webcam if error or black screen
}

function flashWhiteScreen() {
    flashScreen.style.opacity = 1
    setTimeout(function () {
        flashScreen.style.opacity = 0
    }, 500);
}

window.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
        flashWhiteScreen()
        webcams.shift()
        initiateData(webcamData)
    }
})