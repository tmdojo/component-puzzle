var data;
var group;
var n_panels = 9;
var checkboxes = [];
var imgs = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function startGame(jsondata){
    data = jsondata;

    // select target group
    var groups = Object.keys(data);
    var group_i = getRandomInt(groups.length);
    group = groups[group_i];
    $("#group").text(group);

    // load panels
    for (var i=0; i < n_panels; i++){
        var group_idx = getRandomInt(groups.length);
        var group_name = groups[group_idx];
        var products = data[group_name];
        var product_idx = getRandomInt(products.length);
        imgs[i].attr('src', products[product_idx]['img']);
        var tip = "<a href='" + products[product_idx]['url'] + "' target='_blank'>find out more</a>";
        imgs[i].tooltip({
            html: true,
            title: tip,
            delay: {"hide": 500}
        }).tooltip("disable");
        checkboxes[i].attr('group', group_name);
    }
}

function verify(){
    var n_correct = 0;
    var n_wrong = 0;
    var n_missed = 0;
    for (var i=0; i < n_panels; i++){
        var ck = checkboxes[i];
        if (ck.prop('checked')) {
            if (ck.attr('group') == group){
                n_correct++;
            }
            else {
                n_wrong++;
            }
        } else {
            if (ck.attr('group') == group){
                n_missed++;
            }
        }
    }
    $("#correct").text(n_correct);
    $("#wrong").text(n_wrong);
    $("#missed").text(n_missed);
    if (n_wrong == 0 && n_missed == 0){
        $("#message").text("Congraturations!");
    } else {
        $("#message").text("Try again!");
    }
    const myModal = new bootstrap.Modal('#resultModal', {
        keyboard: false
    }).show();
}

$( document ).ready(function() {
    console.log( "Let's rock!" );
    for (var i=0; i < n_panels; i++){
        var target = "#part" + i.toString();
        checkboxes.push($(target));
        target = "#img" + i.toString();
        imgs.push($(target));
    }
    $('#btn_reload').click(function(){
        location.reload();
    });
    $('#btn_headphones').click(function(){
        window.open("https://www.tdk.com/en/index.html", '_blank');
    });
    $('#btn_info').click(function(){
        $('.hint').tooltip('enable').tooltip('show');
    });
    $('#verify').click(verify);
    $.getJSON("data.json", startGame);
});
