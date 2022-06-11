<nav class="navbar navbar-expand-lg navbar-light bg-secondary text-white sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">J'aime les suburi</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu"
            aria-controls="menu" aria-expanded="false" aria-label="Afficher le menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="menu">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link new-training text-white" aria-current="page" href="#" onclick="">Nouveau suburi</a>
        </li>
        <li class="nav-item">
          <a class="nav-link achievements text-white" href="#">Trophées</a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item me-2">
          <a class="nav-link about text-white" href="#">A propos</a>
        </li>
      </ul>
  </div>
</nav>

<script type="module">
  import {displayAchievements} from "./script/display/DisplayAchievements";

  $('.new-training').on('click', function() {
    new bootstrap.Modal(document.getElementById('configModal')).toggle();
    $(".navbar-collapse").collapse('hide');
  });
  $('.achievements').on('click', function() {
    displayAchievements();
    new bootstrap.Modal(document.getElementById('achievementsModal')).toggle();
    $(".navbar-collapse").collapse('hide');
  });
  $('.about').on('click', function() {
    new bootstrap.Modal(document.getElementById('aboutModal')).toggle();
    $(".navbar-collapse").collapse('hide');
  });
</script>