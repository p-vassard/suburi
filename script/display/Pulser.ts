const pulser = $('.pulser');

export function pulse(duration = 500) {
    pulser.addClass('animatePulse');
    pulser.css('animation', `$(duration)ms`);
    pulser.on("animationend", function() {
        $(this).removeClass('animatePulse');
    });
}