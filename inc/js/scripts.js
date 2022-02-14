// ======================================================================================================================================================================================================================================================================================================================================================================================================================
//   SSS   TTTTT  EEEEE  PPPP    00    1         00    222         00   33333       BBB     OOO   N   N  U   U   SSS
//  S        T    E      P   P  0  0  11        0  0  2   2       0  0     3        B  B   O   O  NN  N  U   U  S
//   SSS     T    EEE    P   P  0  0   1        0  0     2        0  0    33        BBBB   O   O  N N N  U   U   SSS
//      S    T    E      PPPP   0  0   1   ---  0  0    2    ---  0  0      3  ---  B   B  O   O  N  NN  U   U      S
//      S    T    E      P      0  0   1        0  0   2          0  0  3   3       B   B  O   O  N   N  U   U      S
//  SSSS     T    EEEEE  P       00   111        00   22222        00    333        BBBB    OOO   N   N   UUU   SSSS
// ======================================================================================================================================================================================================================================================================================================================================================================================================================
// * * * STEP01-02-03-BONUS
$(document).ready(function () {
  // ----------------------------------------Fonction météo extraction des data de chaques api et affichage du temps
  function weather() {
    // ----------------------------------------Récuperation des paramètres dans l'URL
    const urlLocate = window.location.search;
    const args = new URLSearchParams(urlLocate);
    const search = args.get("search");
    // ----------------------------------------L'ajouts de l'argument dans l'url de l'API
    let params = { q: search };
    $.param(params);
    let url =
      "https://api.opencagedata.com/geocode/v1/json?key=04be54ef00c64b8ab3cfaef30d922509&pretty=1&no_annotations=1&" +
      $.param(params);
    // ----------------------------------------Extraction de tous les eléments provenant de l'API OPENCAGEDATA Localisation
    $.get(url, { cache: true }, function (data) {
      var lat = data["results"][0]["geometry"]["lat"]; //------------------Récupération de la latitude
      var lng = data["results"][0]["geometry"]["lng"]; //------------------Récupération de la longitude
      // ----------------------------------------Transformer les elements récupérer de l'api en paramétre
      var params2 = { lat: lat, lon: lng };
      var params3 = $.param(params2);
      let urlw =
        "https://api.openweathermap.org/data/2.5/onecall?appid=17921b3bd1a68e070203ebb500a2b329&" +
        params3;
      // ----------------------------------------Extraction de tous les eléments provenant de l'API OPENWEATHERMAP météo
      $.get(urlw, { cache: true }, function (data) {
        var bigdata = data["daily"]; //------------------Récupération à partir de la data de l'API la section "DAILY"
        var listDay = [];
        $.each(bigdata, function (index, element) {
          const nbrDay = args.get("days"); //------------Ajouts du nombre de jours demandé
          if (index < nbrDay) {
            //------------La condition sera automatiquement ajouter en fonction du nombre de jours demandé
            // ----------------------------------------Extraction du dt du temps du jours dans la section data->daily->dt
            var dt = element["dt"];
            const date = new Date(dt * 1000);
            var days = date.getDay();
            var journey = new Array(
              "Dimanche",
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi"
            );
            // ----------------------------------------Extraction de l'id du temps du jours dans la section data->daily->weather->0->id
            var id = element["weather"][0]["id"];
            listDay.push({
              key: journey[days], // ----------------------------------------Création d'un dictionnaire pour relier le jour et le temps qu'il fait
              value: id,
            });
          }
        });
        // ----------------------------------------Boucle pour extraire les élements du dictionnaire
        $.each(listDay, function (key, value) {
          var jDay = value["key"];
          var id = value["value"];
          updateIdDays(jDay, id); // ---------------------------------------- Utilisation de la fonction updateIdDays avec comme arguments le jour et le temps
        });
        // ------------------------------ Appel de la fonction jour ou nuit avec comme argument la data de l'API OPENWEATHERMAP météo
        jourOuNuit(data);
      });
    });
  }
  // ----------------------------------------Fonction pour créer la partie conception de la div container qui permettra d'afficher la partie météo
  function updateIdDays(element, id) {
    if (
      (200 <= id && id <= 232) ||
      (300 <= id && id <= 321) ||
      (500 <= id && id <= 531)
    ) {
      // ----------------------------------------Partie création de la div container HTML
      $(".containerp").append('<div class="container"></div>');
      $("div:last-child").append('<span id="days">' + element + "</span>");
      $("div:last-child").append(
        '<img src="/inc/img/rain.svg" alt="icon" id="rain" class="icon" />'
      );

      // ----------------------------------------Partie affichage de l'icone qui correspond au temps à partir de la date du jours
      $("#rain").show(); // ----------------------------------------Show fait apparaître l'élément
      $("#snow").hide(); // ----------------------------------------Hide fait disparaître l'élément
      $("#sun").hide();
      $("#cloudy").hide();
      $("#clouds").hide();
    }
    if (600 <= id && id <= 622) {
      $(".containerp").append('<div class="container"></div>');
      $("div:last-child").append('<span id="days">' + element + "</span>");
      $("div:last-child").append(
        '<img src="/inc/img/snow.svg" alt="icon" id="snow" class="icon" />'
      );
      $("#snow").show();
      $("#rain").hide();
      $("#sun").hide();
      $("#cloudy").hide();
      $("#clouds").hide();
    }
    if (id == 800) {
      $(".containerp").append('<div class="container"></div>');
      $("div:last-child").append('<span id="days">' + element + "</span>");
      $("div:last-child").append(
        '<img src="/inc/img/sun.svg" alt="icon" id="sun" class="icon" />'
      );
      $("#sun").show();
      $("#rain").hide();
      $("#snow").hide();
      $("#cloudy").hide();
      $("#clouds").hide();
    }
    if (id == 801 || id == 802) {
      $(".containerp").append('<div class="container"></div>');
      $("div:last-child").append('<span id="days">' + element + "</span>");
      $("div:last-child").append(
        '<img src="/inc/img/cloudy.svg" alt="icon" id="cloudy" class="icon" />'
      );
      $("#cloudy").show();
      $("#rain").hide();
      $("#snow").hide();
      $("#sun").hide();
      $("#clouds").hide();
    }
    if (id == 803 || id == 804) {
      $(".containerp").append('<div class="container"></div>');
      $("div:last-child").append('<span id="days">' + element + "</span>");
      $("div:last-child").append(
        '<img src="/inc/img/clouds.svg" alt="icon" id="clouds" class="icon" />'
      );
      $("#clouds").show();
      $("#rain").hide();
      $("#snow").hide();
      $("#sun").hide();
      $("#cloudy").hide();
    }
  }
  // ------------------------------fonction jour ou nuit avec comme argument la data de l'API OPENWEATHERMAP météo
  function jourOuNuit(data) {
    var dtTime = new Date(data["current"]["dt"] * 1000); // ------------ Récupération de la date pour le temps en cours
    var dtSunrise = new Date(data["current"]["sunrise"] * 1000); // ------------ Récupération de la date du lever de soleil
    var dtSunset = new Date(data["current"]["sunset"] * 1000); // ------------ Récupération de la date du coucher du soleil
    var time = dtTime.getTime(); // ------------ Transformer la date en milliseconde du temps en cours
    var sunset = dtSunset.getTime(); // ------------ Transformer la date en milliseconde du lever de soleil
    var sunrise = dtSunrise.getTime(); // ------------ Transformer la date en milliseconde du coucher du soleil
    // ------------ Condition pour dire que si le temps est compris entres le lever et le coucher du soleil, il fait jours
    if (sunrise <= time && time < sunset) {
      $("body").css(
        "background",
        'url("/inc/img/jours.jpg") no-repeat center center fixed'
      );
      $("body").css("display", "flex");
      $("body").css("align-items", "center");
      $("body").css("justify-content", "space-around");
      $("body").css("flex-direction", "column");
      $("body").css("width", "100vw");
      $("body").css("height", "auto");
    }
    // ------------ Condition pour dire que si le temps est supérieur au coucher du soleil, il fait nuits
    if (time >= sunset) {
      $("body").css(
        "background",
        'url("/inc/img/nuits.jpg") no-repeat center center fixed'
      );
      $("body").css("display", "flex");
      $("body").css("align-items", "center");
      $("body").css("justify-content", "space-around");
      $("body").css("flex-direction", "column");
      $("body").css("width", "100vw");
      $("body").css("height", "auto");
    }
  }
  // ----------------------------------------J'appel la fonction princpal météo
  weather();
});
