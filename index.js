var citiesArray;
var filtArr;
var input = document.getElementById("search");
var list = document.getElementById("list");
var overlay = document.getElementById("overlay");


(function() {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    $.getJSON(endpoint, function(data) {
        citiesArray = data.map(function(ele) {
            ele.city = ele.city.toLowerCase();
            ele.state = ele.state.toLowerCase();
            return ele;
        });
    }).fail(function(err) {
        if (err) {
            citiesArray = [];
        }
    });
})();

function showCoords() {
    var id = Number(this.id);
    var lat = filtArr[id].latitude;
    var long = filtArr[id].longitude;
    var markup = `<span>X</span><h2>${lat}, ${long}</h2>`;
    overlay.style.display = "initial";
    overlay.innerHTML = markup;
}

function findCity() {
    console.log(citiesArray)
    var val = this.value.toLowerCase();
    var reg, cityName, stateName;
    filtArr = citiesArray.filter(function(ele) {
        return ele.city.indexOf(val) !== -1 || ele.state.indexOf(val) !== -1;
    });
    var markup = filtArr.map(function(ele, id) {
        reg = new RegExp(val, "gi")
        cityName = ele.city.replace(reg, `<span class="highlight">${val}</span>`);
        stateName = ele.state.replace(reg, `<span class="highlight">${val}</span>`);
        return (
            `<li id="${id}">
                <span class="name">${cityName}, ${stateName}</span>
                <span class="pop">${ele.population}</span>
             </li>`
        );
    }).join("");
    list.innerHTML = markup;
}

input.addEventListener("keyup", findCity);
$(document).on("click", "li", showCoords);
$(document).on("click", "#overlay span", function(e) {
    overlay.style.display = "none";
});