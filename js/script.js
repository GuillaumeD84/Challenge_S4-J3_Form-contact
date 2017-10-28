var app = {
  init: function() {
    console.log('Début de l\'éxécution du script ...');
    app.addEventToForm();
  },
  // Créé les Events nécessaire à notre formulaire
  addEventToForm: function() {
    // Focus réagit lorsqu'un champ reçoit le focus, en gros ici lorsqu'on clique dessus
    $('input').on('focus', app.makeTextFieldActive);
    // Blur quand à lui réagit lorsque l'on perd le focus, ici, lorsque l'on clique ailleurs après avoir focus le champ
    $('input').on('blur', app.makeTextFieldInactive);

    $('textarea').on('focus', app.makeTextFieldActive);
    $('textarea').on('blur', app.makeTextFieldInactive);
    // Input réagit à chaque fois que l'on écrit un caractère dans le champ
    $('textarea').on('input', app.chattyUser);

    // Click réagit lorsque l'on appui sur le bouton
    $('button').on('click', app.testFormValidity);
  },
  // Test si les 3 champs ne sont pas vides
  testFormValidity: function(evt) {
    evt.preventDefault();

    var textFields = $('.textInput');
    var validity = true;

    // Si textFields récupérait un seul élément on éviterait d'utiliser textFields[0].value, on préferera textFields.val()
    // Exemple var inpName = $('#inputName'); console.log(inpName.val());

    // Ce code renvoi la même chose que le for en dessous mais on va utiliser .val()
    // for (var index = 0; index < textFields.length; index++) {
    //   if (textFields[index].value === '') validity = false;
    // }

    for (var index = 0; index < textFields.length; index++) {
      if ($(textFields[index]).val() === '') validity = false;
    }

    if (!validity) alert('Un des champs est vide noundidiou !');
    else app.executeSubmit();

    return validity;
  },
  executeSubmit: function() {
    console.log('Champs OK !');
  },
  // On passe le dataset 'state' à 'active' lorsqu'un champ reçoit le focus
  makeTextFieldActive: function(evt) {
    document.getElementById(evt.target.id).setAttribute('data-state', 'active');
  },
  // On passe le dataset 'state' à 'inactive' lorsqu'un champ perd le focus
  makeTextFieldInactive: function(evt) {
    document.getElementById(evt.target.id).setAttribute('data-state', 'inactive');

    // On va ajouter une bordure colorée après avoir perdu le focus dans le champ.
    app.addBorderOnBlur(evt.target.id);
  },
  // Ajoute une bordure colorée à un champ ayant perdu le focus. Verte si l'utilisateur à entré une valeur, rouge s'il le champ est vide
  addBorderOnBlur: function(eventTargetId) {
    var bluredTextField = $('#' + eventTargetId);

    if (bluredTextField[0].value === '') bluredTextField.css('border-color', '#e31e2a');
    else bluredTextField.css('border-color', '#5cb760');
  },
  // Un utilisateur est trop bavard ? Pas de soucis !
  chattyUser: function(evt) {
    var userMessageLength = $(evt.target).val().length;
    if (userMessageLength > 500) $('#chatty').show();
    else $('#chatty').hide();
  }
};

$(app.init);
