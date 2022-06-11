import {Training} from "../training/Training.js";
import {Suburi} from "../training/Suburi.js";

/**
 * @param {Training} training
 */
export function displaySuburiList(training)
{
    let output = '<ul class="list-group">';
    for(let count in training.suburiList)
    {
        output += `<li class="list-group-item" id="suburi-${count}">${training.suburiList[count].suburi.name} x${training.suburiList[count].count}</li>`;
    }
    output += '</ul>';
    $('#suburi-list').html(output);
}