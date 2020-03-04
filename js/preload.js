class Webcam {
    constructor(id) {
        this.id = id
    }
    setImg(image) {
        this.image = image
    }
}

var images = new Array()

function preload(url, id) {
    if (checkFeed(url, id)) {
        const image = new Image()
        image.src = url
        return image
    } else {
        return null
    }
}

function checkFeed(url, id) {
    //console.log("checkFeed ", url)
    checkImage(url).then(height => {}).catch(error => {
        //console.log("there was an error in the promise, we should remove this id from the array:", url)
        removeWebcam(url, id)
    });
    return true
}

function removeWebcam(url, id) {
    console.log("removing invalid url..")
    const item = webcams.find(element => element.id == id);
    webcams.splice(webcams.indexOf(item), 1);
    initiateData(webcamData)
}

function checkImage(src) {
    const ms = 20000
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in', ms, ' ms.')
        }, ms)
    })

    let promise = new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img.height)
        img.onerror = reject
        img.src = src
    })

    return Promise.race([
        promise,
        timeout
    ])
}