const geoCancelButtton = document.getElementById('GEO_cancel_button');
const getOkButtton = document.getElementById('GEO_OK_button');
const closeToolButton = document.getElementById('closeToolButton');

const tool = document.getElementById('tool');
const input = document.querySelector('.geo_input');
const geoInput = document.querySelector('.geo_input');
const modal = document.querySelector('.modal');

closeToolButton.addEventListener('click', () => {
    document.querySelector('.tool').style.display = "none";
    modal.style.zIndex = '2'
    geoInput.value = '';
})

getOkButtton.addEventListener('click', () => {
    if (validateGeo(geoInput.value)) {
        console.log(transfomGeo(geoInput.value))
    } else {
        tool.style.display = "block";
        modal.style.zIndex = '0'
    }
});

geoCancelButtton.addEventListener('click', () => {
    document.querySelector('.modal').style.display = "none";
    document.querySelector('.overlay').style.display = "none";
});

function validateGeo(input) {
    const coordinatePattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    if (coordinatePattern.test(input)) {
        return true;
    } else {
        return false;
    }
}

function transfomGeo(input) {
    const coordinatesString = input.split(', ');
    const coordinates = coordinatesString.map((str) => {
        return parseFloat(str);
    })
    return coordinates;
}
