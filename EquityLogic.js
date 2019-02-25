$.fn.digits = function(){
    return this.each(function(){
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
    })
};

$(document).ready(function() {
    $('.tooltip').tooltipster();
});

$('.tooltip').tooltipster({
    animation: 'grow',
    delay: 200,
    theme: 'tooltipster-default',
    touchDevices: false,
    trigger: 'hover'
});

var comma = $.animateNumber.numberStepFactories.separator(',');

var round = function (num){
  return Math.round(num * 100) / 100 || 0;
};


var round3places = function (num){
    return Math.round(num * 1000) / 1000 || 0;
};

var toInteger = function(str){
    return parseFloat(str.replace(/,/g,''));
}

var MattMoneyFormat = function(num) {
    return num.substring(0, num.indexOf('.'));
};

function numberWithCommas(x) {
                            var parts = x.toString().split(".");
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            return parts.join(".");
                        }

$("#initialFunding").hide();
$("#center").hide();
$("#right").hide();
$("#payoff").hide();

$("#ownership").hide();
$("#ownershipRecomputed").hide();
$("#risk").hide();

$("#nextCenter").click(function(){
    $("#container").width("50%");
    $("#left").addClass("left");
    $("#left").width("50%");
    $("#initialFunding").show();
    $("#center").show();
    $("#center").addClass("right");
    $("#center").width("50%");
    $("#nextCenter").hide();
});

$("#nextRight").click(function(){
    $("#container").width("100%");
    $("#left").removeClass("half");
    $("#left").width("30%");
    $("#center").width("30%");
    $("#center").removeClass("right");
    $("#center").addClass("center");
    $("#right").show();
    $("#nextRight").hide();
});

// $("#nextFinalized").click(function(){
//     $("#finalized").show();
//     $("#ownership").show();
//     $("#ownershipRecomputed").show();
//     $("#risk").show();
// });


var decimal_places = 2;
var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);



var percent_places = 8;
var percent_factor = percent_places === 0 ? 1 : Math.pow(10, percent_places);

function textOrAnimate(number){
    return number === undefined || isNaN(number) ? 0 : number;
}

function updateValues(unhide){


    var funding = toInteger($("#funding").val());
    var valuation = toInteger($('#valuation').val());
    var percentSold = funding / valuation * 100;
    // console.log("percentSold", funding, valuation, percentSold);


    $("#percentSold").animateNumber({ number: round(textOrAnimate(percentSold)) });
    $("#companyFunding").animateNumber({
                number: textOrAnimate(funding * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');
                    }
                    target.text('$' + MattMoneyFormat(floored_number));
                }
            });
    $("#totalValue").animateNumber({
                number: textOrAnimate(valuation * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');
                    }

                    target.text('$' + MattMoneyFormat(floored_number));
                }
            });

    var offeredShares = toInteger($('#offeredShares').val());
    var outstandingShares = toInteger($('#outstandingShares').val());

    var percentOwned = offeredShares / outstandingShares * 100;
    // console.log("offeredShares", offeredShares)

    // console.log("percentOwned", percentOwned)
    $(".percentOwned").animateNumber({
        number: textOrAnimate(percentOwned  * percent_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / percent_factor,
                        target = $(tween.elem);

                    if (percent_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(percent_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');
                    }

                    target.text(round3places(floored_number));
                }
    });
    var worth = round(percentOwned/100 * valuation);
    $("#worth").animateNumber({
                number: textOrAnimate(worth * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');
                    }

                    target.text('$' + MattMoneyFormat(floored_number));
                }
            });
    
    var moreFunding = toInteger($("#moreFunding").val());
    var secondValuation = toInteger($('#secondValuation').val()) ;

    var percentRevaluated = offeredShares / (outstandingShares * (1 + (moreFunding/secondValuation))) * 100 ;
    // console.log("percentRevaluated, percentOwned, outstandingShares, moreFunding, secondValuation", percentRevaluated, percentOwned, outstandingShares, moreFunding, secondValuation);

    var percentSoldRevaulated = percentSold / (outstandingShares * (1 + (moreFunding/secondValuation))) ;
    $(".percentRevaluated").animateNumber({
        number: textOrAnimate(percentRevaluated * percent_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / percent_factor,
                        target = $(tween.elem);

                    if (percent_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(percent_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');
                    }

                    target.text(round3places(floored_number));
                }
    });
    $(".newValuation").animateNumber({
                number: textOrAnimate(secondValuation * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');
                    }

                    target.text('$' + MattMoneyFormat(floored_number));
                }
            });

    var adjustedWorth = round(percentRevaluated/100 * secondValuation);
    $(".adjustedWorth").animateNumber(
        {
                number: textOrAnimate(adjustedWorth * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        function numberWithCommas(x) {
                            var parts = x.toString().split(".");
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            return parts.join(".");
                        }
                        floored_number = numberWithCommas(floored_number);

                    }

                    target.text('$' + MattMoneyFormat(floored_number));
                }
            });
    // console.log("adjustedWorth", secondValuation, percentRevaluated, adjustedWorth);


    var sellingChance = toInteger($('#sellingChance').val());
    var expectedEquity = round((sellingChance/100) * adjustedWorth);
    $("#expectedEquity").animateNumber({
                number: textOrAnimate(expectedEquity * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);

                    }

                    target.text('$' + MattMoneyFormat(floored_number));
                }
            });

    var timePayout = toInteger($("#timePayout").val());
    var yearlySalary = round(expectedEquity/timePayout);
    if(timePayout){
        $("#payoff").show();
        $("#payoff").addClass("grow");
    }
    if(toInteger($("#timePayout").val())){//form is filled out!
        $("#salary2").animateNumber(
            {
                number: textOrAnimate(yearlySalary * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');
                    }

                    target.text('$' + MattMoneyFormat(floored_number));
                }
            }
        );
        $("#salary").animateNumber(
            {
                number: textOrAnimate(yearlySalary * decimal_factor),

                numberStep: function(now, tween) {
                    var floored_number = Math.floor(now) / decimal_factor,
                        target = $(tween.elem);

                    if (decimal_places > 0) {
                        // force decimal places even if they are 0
                        floored_number = floored_number.toFixed(decimal_places);

                        // replace '.' separator with ','
                        floored_number = numberWithCommas(floored_number);//.toString().replace('.', ',');

                    }

                    target.text('$' + MattMoneyFormat(floored_number));
                }
            }
        );
    }

};

updateValues();

$("input").change( function() {
    updateValues(true);
});