/* CONSTANTS */
const MIN_DESKTOP_SIZE = document.getElementById("container").dataset.minDesktopSize; //legato al numero figli navbar 
const MIN_NAV_HEIGHT = '3rem';
const MOBILE_NAV_ANIM_DURATION = 600; //ms

let actual_mode = undefined;

/* button rotation */
let nav_btn_total_rot  = '90';
let nav_btn = $("#nav-btn");
/* to make navbar appear I'll set its maxHeight to numItemsContained * itemsHeight */
let itms_num = $('.mobile-nav-itm').length === 0 ? $('.desktop-nav-itm').length : $('.mobile-nav-itm').length;
let nav_starting_max_height = (itms_num-1) * 100; // idk 'cause it's itms_num -1 instead of itms_num but it works:)
let nav_actual_max_height = 0;

($(window).width() < MIN_DESKTOP_SIZE) ? enterMobileMode() : enterDesktopMode();
setInterval(checkWindowSize, 1000); //check every second
 
function checkWindowSize(){
    let actual = $(window).width();
    if (actual_mode !== 'mobile' && actual < MIN_DESKTOP_SIZE) enterMobileMode();
    if (actual_mode !== 'desktop' && actual >= MIN_DESKTOP_SIZE) enterDesktopMode();
}

function enterDesktopMode(){
    console.log("entering desktop mode..");
    actual_mode = 'desktop';

    $("#nav-btn").height(0);

    $("#nav").removeClass('mobile-nav');
    $("#nav").addClass('desktop-nav');
    let itms = $('.mobile-nav-itm');
    itms.removeClass('mobile-nav-itm');
    itms.addClass('desktop-nav-itm');

    $("#nav").removeClass('closed');
    $("#nav").css({maxHeight:nav_starting_max_height});
}
function enterMobileMode(){
    console.log("entering mobile mode..");
    actual_mode = 'mobile';

    $("#nav-btn").height('auto');
    $("#nav-btn").css({transform:'rotate(0)'});
    //there is a bug, if y go on desk mode with the nav opened, when back button doesn't work the 1st time, on the 2st work :/

    $("#nav").addClass('mobile-nav');
    $("#nav").removeClass('desktop-nav');
    let itms = $('.mobile-nav-itm');
    itms.addClass('mobile-nav-itm');
    itms.removeClass('desktop-nav-itm');

    $("#nav").addClass('closed');
    $("#nav").css({maxHeight:'0'});

}

nav_btn.click(function(){
    //button animation
    nav_btn_total_rot  = nav_btn_total_rot  === 90 ? 0 : 90;
    nav_btn.animate({deg: nav_btn_total_rot}, {
        duration: MOBILE_NAV_ANIM_DURATION,
        step: function(now) {
            nav_btn.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
    //nav (dis)appear
    $("#nav").removeClass('closed');
    nav_actual_max_height  = nav_actual_max_height  === nav_starting_max_height ? 0 : nav_starting_max_height;
    $("#nav").animate({maxHeight: nav_actual_max_height}, {
        duration: MOBILE_NAV_ANIM_DURATION,
        step: function(now) {
            nav_btn.css({
                maxHeight: now + '%'
            });
        }
    });
});
