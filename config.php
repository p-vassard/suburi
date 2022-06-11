<div class="modal fade" data-bs-backdrop="static" id="configModal" tabindex="-1" role="dialog" aria-labelledby="Configuration" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Configurez votre session de Suburi</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ul class="nav nav-tabs" id="creation-type" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="select-suburi-tab" data-bs-toggle="tab" data-bs-target="#select-suburi"
                    type="button" role="tab" aria-controls="select-suburi" aria-selected="true">Suburi
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="create-training-tab" data-bs-toggle="tab"
                    data-bs-target="#create-training" type="button" role="tab" aria-controls="create-training"
                    aria-selected="false">Entraînement
            </button>
          </li>
        </ul>

        <div class="tab-content">

          <div class="tab-pane show active" id="select-suburi" role="tabpanel" aria-labelledby="select-suburi">
            <div class="mb-3">
              <label for="suburi-selection">Suburi : </label>
              <select class="form-select" aria-label="Suburi" id="suburi-selection">
                <?php print createSuburiList(); ?>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label" for="suburi-quantity">Quantité</label>
              <input type="number" id="suburi-quantity" class="form-control" value="100" min="10" max="10000  "/>
            </div>
            <div class="mb-3">
              <label for="difficulty">Niveau : </label>
              <select class="form-select" aria-label="Niveau" id="suburi-difficulty">
                <option selected value="1">< 1er dan</option>
                <option value="2">1er à 2ème dan</option>
                <option value="3">3ème dan et plus</option>
              </select>
            </div>
          </div>

          <div class="tab-pane fade" id="create-training" role="tabpanel" aria-labelledby="create-training">
            <div class="mb-3">
              <label for="difficulty">Niveau : </label>
              <select class="form-select" aria-label="Niveau" id="difficulty">
                <option selected value="1">< 1er dan</option>
                <option value="2">1er à 2ème dan</option>
                <option value="3">3ème dan et plus</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="totalAmount">Nombre total de suburi : </label>
              <select class="form-select" aria-label="Nombre total de suburi" id="totalAmount">
                <option value="50">50 (5x10)</option>
                <option selected value="100">100 (5x20)</option>
                <option value="200">200 (5x40)</option>
                <option value="300">300 (6x50)</option>
                <option value="500">500 (10x50)</option>
                <option value="1000">1000 (10x100)</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="pauseDuration" class="form-label">Temps de pause entre chaque série :
                <output for="pauseDuration" id="durationOutput">15</output>
                secondes</label>
              <input type="range" class="form-range" min="5" max="120" value="15" id="pauseDuration"
                     aria-label="Temps de pause entre chaque série"
                     oninput="document.getElementById('durationOutput').value = this.value">
            </div>

            <!--        <div class="mb-3">-->
            <!--          <input class="form-check-input" type="checkbox" value="" id="displayTips" checked aria-label="Afficher des conseils">-->
            <!--          <label class="form-check-label" for="displayTips">-->
            <!--            Afficher des conseils-->
            <!--          </label>-->
            <!--        </div>-->
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="submit" class="btn btn-primary" aria-label="Commencer" id="commencer">Hajime !</button>
      </div>
    </div>
  </div>
</div>

<?php

function createSuburiList()
{
  $list = [
    'HayaSuburi' => 'Haya Suburi',
    'JogeBuri' => 'Joge Buri',
    'NanameBuri' => 'Naname Buri',
    'NihoZenshinKotaiMen' => 'Niho Zenshin Kotai Men',
    'Shomen' => 'Shomen',
    'Kote' => 'Kote',
    'Do' => 'Do',
    'ZenshinKotaiMen' => 'Zenshin Kotai Men',
    'Shifts' => 'Déplacements',
    'Hits' => 'Frappes aléatoires'
  ];
  asort($list);

  $result = '';
  foreach ($list as $key => $value) {
    $result .= "<option value='$key'>$value</option>";
  }

  return $result;
}