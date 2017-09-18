//Funtion that erases all selected articles in the gear page
function eraseAll () {
  totalPriceUni = 0;
  $('#mBlancPack').prop('checked', false);
  $('#mBlancPackPrice').fadeOut();
  $('#mBlancPackPrice').text('');
  $('#shoeSizePack').fadeOut("slow");
  $('#sizePack').attr('required', false);
  $('#sizepack option').prop('selected', false);  

  $('#gaillandsPack').prop('checked', false);
  $('#gaillandsPackPrice').fadeOut();
  $('#gaillandsPackPrice').text('');

  $('#viaFerrataPack').prop('checked', false);
  $('#viaFerrataPackPrice').fadeOut();
  $('#viaFerrataPackPrice').text('');

  $('#alpinismShoes').prop('checked', false);
  $('#alpinismShoes').attr('disabled', false);
  $('#alpShoesPrice').fadeOut();
  $('#alpShoesPrice').text('');
  $('#shoeSize').fadeOut("slow");
  $('#size').attr('required', false);

  $('#crampons').prop('checked', false);
  $('#crampons').attr('disabled', false);
  $('#cramponsPrice').fadeOut();
  $('#cramponsPrice').text('');


  $('#cramponsHike').prop('checked', false);
  $('#cramponsHike').attr('disabled', false);
  $('#cramponsHikePrice').fadeOut();
  $('#cramponsHikePrice').text('');

  $('#piolet').prop('checked', false);
  $('#piolet').attr('disabled', false);
  $('#pioletPrice').fadeOut();
  $('#pioletPrice').text('');

  $('#casque').prop('checked', false);
  $('#casque').attr('disabled', false);
  $('#casquePrice').fadeOut();
  $('#casquePrice').text('');

  $('#casqueClimb').prop('checked', false);
  $('#casqueClimb').attr('disabled', false);
  $('#casqueClimbPrice').fadeOut();
  $('#casqueClimbPrice').text('');

  $('#harness').prop('checked', false);
  $('#harness').attr('disabled', false);
  $('#harnessPrice').fadeOut();
  $('#harnessPrice').text('');

  $('#harnessClimb').prop('checked', false);
  $('#harnessClimb').attr('disabled', false);
  $('#harnessClimbPrice').fadeOut();
  $('#harnessClimbPrice').text('');

  $('#gaiters').prop('checked', false);
  $('#gaiters').attr('disabled', false);
  $('#gaitersPrice').fadeOut();
  $('#gaitersPrice').text('');

  $('#poles').prop('checked', false);
  $('#poles').attr('disabled', false);
  $('#polesPrice').fadeOut();
  $('#polesPrice').text('');

  $('#polesHike').prop('checked', false);
  $('#polesHike').attr('disabled', false);
  $('#polesHikePrice').fadeOut();
  $('#polesHikePrice').text('');

  $('#backpack').prop('checked', false);
  $('#backpack').attr('disabled', false);
  $('#backpackPrice').fadeOut();
  $('#backpackPrice').text('');

  $('#backpackHike').prop('checked', false);
  $('#backpackHike').attr('disabled', false);
  $('#backpackHikePrice').fadeOut();
  $('#backpackHikePrice').text('');

  $('#climbingShoes').prop('checked', false);
  $('#climbingShoes').attr('disabled', false);
  $('#climbingShoesPrice').fadeOut();
  $('#climbingShoesPrice').text('');

  $('#kidClimbingShoes').prop('checked', false);
  $('#kidClimbingShoes').attr('disabled', false);
  $('#kidClimbingShoesPrice').fadeOut();
  $('#kidClimbingShoesPrice').text('');

  $('#shockAbsorber').prop('checked', false);
  $('#shockAbsorber').attr('disabled', false);
  $('#shockAbsorberPrice').fadeOut();
  $('#shockAbsorberPrice').text('');

  $('#crashpad').prop('checked', false);
  $('#crashpad').attr('disabled', false);
  $('#crashpadPrice').fadeOut();
  $('#crashpadPrice').text('');

  $('#slackline').prop('checked', false);
  $('#slackline').attr('disabled', false);
  $('#slacklinePrice').fadeOut();
  $('#slacklinePrice').text('');

  $('#hikingShoes').prop('checked', false);
  $('#hikingShoes').attr('disabled', false);
  $('#hikingShoesPrice').fadeOut();
  $('#hikingShoesPrice').text('');

  $('#babyCarrier').prop('checked', false);
  $('#babyCarrier').attr('disabled', false);
  $('#babyCarrierPrice').fadeOut();
  $('#babyCarrierPrice').text('');

  $('#babyStroller').prop('checked', false);
  $('#babyStroller').attr('disabled', false);
  $('#babyStrollerPrice').fadeOut();
  $('#babyStrollerPrice').text('');
};