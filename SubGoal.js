//Code based on @annedorko's work
// MINI SUB GOAL BAR
var fields;
var totalSubs = 0; // The total number of subs
var dynamicGoal = 0; // The goal changing everytime it is reached
var steps = 15; // The steps between each levels
var percent = doPercent(totalSubs, dynamicGoal, steps); // Percentage of subs out of a current goal segment
var data;
//** LOAD IN INITIAL WIDGET DATA
//*
//*
window.addEventListener('onWidgetLoad', function(obj) {
    // Get base data
    data = obj["detail"]["session"]["data"];
    const fieldData = obj["detail"]["fieldData"];
    fields = fieldData;
    // Set initial goal data
    steps = fieldData["num_steps"];
    totalSubs = data["subscriber-total"]["count"];
    if (steps <= 0) {
        steps = 1;
    }
    dynamicGoal = setInitialGoal(totalSubs, steps);
    // Set goal live
    reloadGoal();
});

//** UPDATE INFO WIDGET INFORMATION
//
//
window.addEventListener('onEventReceived', function(obj) {
    const listener = obj.detail.listener;
    const event = obj["detail"]["event"];
    if (listener == 'subscriber-latest') {
        totalSubs++;
        // Sub bar
        reloadGoal();
        //wait so if we hit 100% it's shown for 5 sec before changing the dynamicSubGoal
        setTimeout(function() {
            dynamicGoal = setInitialGoal(totalSubs, steps);
            reloadGoal();
        }, 1000);
    }
});


//** CALCULATION FUNCTIONS FOR MINI SUB GOAL BAR
//
//
function reloadGoal() {
    // Set levels
    // Get goal segment amount*/
    $('#progress .endgame .amount').text(dynamicGoal);
    // Set percent
    percent = doPercent(totalSubs, dynamicGoal, steps);
    // Update goal bar
    $('#progress .loading .amount').text(totalSubs);
    $('#progress .loading').css({
        'width': percent + '%'
    });
}

function setInitialGoal(totalSubs, steps) {
    var modulo = totalSubs % steps;
    var dynamicGoal = totalSubs + (steps - modulo);
    return dynamicGoal;
}

function doPercent(totalSubs, dynamicGoal, steps) {
    var perc = (totalSubs % steps) / steps;
    if (totalSubs >= dynamicGoal) {
        var perc = 100;
    }
    var amount = perc * 100;
    if (amount < 0) {
        amount = 0;
    }
    if (amount > 100) {
        amount = 100;
    }
    return amount;
}