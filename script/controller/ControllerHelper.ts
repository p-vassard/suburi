function setInstruction(text: string) {
    $('#current-suburi .instructions').html(text);
}

function setTips(text: string) {
    $('.tips').html(text);
}

function setSuburiProgressBar(percent: number, text: string) {
    const $selector: JQuery = $('#current-suburi .progress .progress-bar');
    $selector.css('width', percent + '%');
    $selector.text(text);
}