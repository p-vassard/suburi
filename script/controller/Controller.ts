import {createSingleSuburi, createTraining} from "../training/TrainingFactory.js";
import {displaySuburiList} from "../display/DisplayTraining.js";
import {Save} from "../misc/Save.js";
import {displayAchievements} from "../display/DisplayAchievements.js";
import {Statistics} from "../statistics/Statistics.js";
import {Training} from "../training/Training.js";
import {Difficulty} from "../training/Difficulty.js";

$(function () {
    Save.load();
    displayAchievements();  // TODO : display only when needed
    Statistics.get().manageTime();

    let currentTraining: Training;

    // Tab management
    $('#create-training-tab, #select-suburi-tab').on('click', function() {
        $('#commencer').removeAttr('disabled');
    });
    $('#trophies-tab').on('click', function() {
        $('#commencer').attr('disabled', 'disabled');
    });

    // Start suburi
    $('#configModal #commencer').on('click', function () {
        const tabId = $('#creation-type .nav-item .active').prop('id');
        currentTraining = undefined;
        if (tabId === 'create-training-tab') {
            currentTraining = createTraining(
                new Difficulty(Number($('#difficulty').val())),
                Number($('#totalAmount').val()),
                ($('#pauseDuration').val() as number) * 1000,
                $('#displayTips').is(":checked")
            );
            displaySuburiList(currentTraining);
            currentTraining.execute();
        }

        if (tabId === 'select-suburi-tab') {
            currentTraining = createSingleSuburi(
                new Difficulty(Number($('#suburi-difficulty').val())),
                true,
                Number($('#suburi-quantity').val()),
                String($('#suburi-selection').val()),
            );
            displaySuburiList(currentTraining);
            currentTraining.execute();
        }
        $('#home-text, .logo-wrapper').hide();
        $('.navbar').slideUp();

        $('.pulser').css('visibility', 'visible');
        $('.toggle-sound-wrapper').css('visibility', 'visible');
        $('#configModal').modal('hide');
    });

    // Sound management
    $('#toggle-sound').on('change', function() {
        Sound.get().toggle($('#toggle-sound').prop('checked'));
    });
});

export function showNavbar() {
    $('.navbar').slideDown();
}