import {Achievements} from "../achievements/Achievements.js";
import {Requirement} from "../achievements/Requirement.js";

export function displayAchievements() {
    const list = Achievements.get().list;

    let html = '<table class="achievements"><tbody>';
    for (const i in list) {
        const req: Requirement = list[i];
        html += `<tr>
        <td class="achievement-name">${req.name}<p>${req.hint}</p></td>
        <td class="achievement-progress">
                    <div class="progress"><div class="progress-bar ${req.checkIfAchieved() ? 'bg-success' : ''}"
                        role="progressbar"
                        style="width: ${req.getProgression() / req.count * 100}%"
                        aria-valuenow="${req.getProgression() / req.count * 100}"
                        aria-valuemin="0"
                        aria-valuemax="100">&nbsp;</div></div>
        <p>${req.getProgression()} / ${req.count}</p></td>
        </tr>`;
    }
    html += '</tbody></table>'

    $('.achievements-list').html(html);
}