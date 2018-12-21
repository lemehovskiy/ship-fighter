require("./sass/style.scss");

require ("jquery");

require('../build/ship_fighter.js');


$(document).ready(function () {

    $('.ship-fighter-demo').shipFighter();

});