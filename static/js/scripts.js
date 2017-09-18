var diffDays;
var people;
var firstDay;
var lastDay;
var totalPriceUni = 0;
var days = 0;

var sizeHtml =  '<select id="size" name="alpinismShoeSize">'+
                  '<option value="00">I don\'t know</option>'+
                '<optgroup label="Women\'s">'+
                  '<option value="36.5" data-subtext="UK 4 US 6">EU 36.5</option>'+
                  '<option value="37" data-subtext="UK 4.5 US 6.5">EU 37</option>'+
                  '<option value="37.5" data-subtext="UK 5 US 7">EU 37.5</option>'+
                  '<option value="38" data-subtext="UK 5.5 US 7.5">EU 38</option>'+
                  '<option value="38.5" data-subtext="UK 6 US 8">EU 38.5</option>'+
                  '<option value="39" data-subtext="UK 6.5 US 8.5">EU 39</option>'+
                  '<option value="39.5" data-subtext="UK 7 US 9">EU 39.5</option>'+
                  '<option value="40" data-subtext="UK 7.5 US 9.5">EU 40</option>'+
                  '<option value="40.5" data-subtext="UK 8 US 10.5">EU 40.5</option>'+
                '</optgroup>'+
                '<optgroup label="Men\'s">'+
                  '<option value="41" data-subtext="UK 7.5 US 8">EU 41</option>'+
                  '<option value="41.5" data-subtext="UK 8 US 8.5">EU 41.5</option>'+
                  '<option value="42" data-subtext="UK 8.5 US 9">EU 42</option>'+
                  '<option value="42.5" data-subtext="UK 9 US 9.5">EU 42.5</option>'+
                  '<option value="43" data-subtext="UK 9.5 US 10">EU 43</option>'+
                  '<option value="43.5" data-subtext="UK 10 US 10.5">EU 43.5</option>'+
                  '<option value="44" data-subtext="UK 10.5 US 11">EU 44</option>'+
                  '<option value="44.5" data-subtext="UK 11 US 11.5">EU 44.5</option>'+
                  '<option value="45" data-subtext="UK 11.5 US 12">EU 45</option>'+
                  '<option value="45.5" data-subtext="UK 12 US 12.5">EU 45.5</option>'+
                  '<option value="46" data-subtext="UK 12.5 US 13">EU 46</option>'+
                  '<option value="46.5" data-subtext="UK 13 US 13.5">EU 46.5</option>'+
                  '<option value="47" data-subtext="UK 13.5 US 14">EU 47</option>'+
                  '<option value="47.5" data-subtext="UK 14 US 14.5">EU 47.5</option>'+
                  '<option value="48" data-subtext="UK 14.5 US 15">EU 48</option>'+
                  '<option value="48.5" data-subtext="UK 15 US 15.5">EU 48.5</option>'+
                  '<option value="49" data-subtext="UK 15.5 US 16">EU 49</option>'+
                  '<option value="50" data-subtext="UK 16.5 US 17">EU 50</option>'+
                '</optgroup>'+
              '</select>'
            

//Functions that change the background in the Gear page
function backgroundAlp() {
  document.body.style.backgroundImage = "url('../static/images/1.jpg'";
};

function backgroundClimb() {
  document.body.style.backgroundImage = "url('../static/images/climbi.jpg'";
};

function backgroundHike() {
  document.body.style.backgroundImage = "url('../static/images/hike.jpg'";
};

function backgroundOther() {
  document.body.style.backgroundImage = "url('../static/images/slack.jpg'";
};

// Handles Inserting a telephone number in the post page 
function countryCode(){
  var intlNumber = $("#demo").intlTelInput("getNumber");
  $('#telephone').val(intlNumber);
  $('#telephone').text(intlNumber);

};

function countryCodeAdmin(){
  var intlNumber = $("#phoneAdmin").intlTelInput("getNumber");
  $('#telephone').val(intlNumber);
  $('#telephone').text(intlNumber);
};




$(function()
{

    moment.updateLocale('en', {
    longDateFormat : {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "MM/DD/YYYY",
        l: "M/D/YYYY",
        LL: "MMMM Do YYYY",
        ll: "MMM D YYYY",
        LLL: "MMMM Do YYYY LT",
        lll: "MMM D YYYY LT",
        LLLL: "dddd, MMMM Do YYYY",
        llll: "ddd, MMM D YYYY LT"
    }
});

    $('#resaUniModalAdmin').on('hidden.bs.modal', function () {
      $(".modalAdminInfo").empty();    
});      
    $('#resaUniModal').on('hidden.bs.modal', function () {
      $(".modalAdminInfo").empty();
});
// Initialises the country code selector for the telephone input
    $("#demo").intlTelInput(
    {
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode)})},
      autoPlaceholder: "polite",
      separateDialCode: true,
      formatOnDisplay: true,
      nationalMode: true,
      utilsScript: "url('../static/js/utils.js'",
    },
      );

    $("#phoneAdmin").intlTelInput(
    {
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode)})},
      autoPlaceholder: "polite",
      separateDialCode: true,
      formatOnDisplay: true,
      nationalMode: true,
      utilsScript: "url('../static/js/utils.js'",
    },
      );

    
// Initialises the datefilter extension to select the duration of the stay
    $('input[name="datefilter"]').daterangepicker(
    {
       
    	autoUpdateInput: false,
        timePicker: false,

        minDate: moment().add(2, 'days'),
        locale: {
        	cancelLabel: 'Clear',
            format: 'DD/MM/YYYY',
        	
          firstDay: 1
        },

    },
    function(start, end, label) 
    {
      firstDay = moment(start, 'YY-MM-DD');
      lastDay = moment(end,'YY-MM-DD');
    diffDays = lastDay.diff(firstDay, 'days')+1;
    });


    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('D MMMM YYYY') + ' - ' + picker.endDate.format('D MMMM YYYY'));
      $("#pInfo").slideDown('slow');
      $("#goGear").slideDown('slow');
      $("#startDate").val(firstDay.format('YY-MM-DD'));
      $("#endDate").val(lastDay.format('YY-MM-DD'));
      $("#days").val(diffDays);

      if (diffDays === 1) {
       $("#pInfo").html('<strong>Success! </strong>');
       $("#pInfo").append("Reserving for " + diffDays + " day</p>");
    } else {
       $("#pInfo").html('<strong>Success! </strong>');
       $("#pInfo").append("Reserving for " + diffDays + " days</p>");
    };
      

  });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
      $("#startDate").val('');
      $("#endDate").val('');
      $("#pInfo").slideUp('fast');
      $("#goGear").slideUp('slow');
      $("#pInfo").html('<strong>Success! </strong>');
  });

});
















$(document).ready(function() {
  $('#popoverSize').popover({title: "Shoe Size", 
                            content: sizeHtml, 
                            html: true, 
                            trigger: "manual",
                            placement: "left"}); 

  $('[data-toggle="tooltip"]').tooltip();

  var table = $('#userList').DataTable( {
    "ajax": {
      "url": "http://188.226.149.94/getUserList/",
      "dataSrc": "" 
    },

    "columns": [
        { "data": "user_id"},
        { "data": "username"},
        { "data": "fullname"},
        { "data": "telephone"},
        { "data": "email"},
        { }

        ],

    "columnDefs": [ {
        "targets": -1,
        "data": null,
        "defaultContent": "<button>Click!</button>"
    }],

  });

  $('#userList tbody').on('click', 'button', function() {
    var data = table.row( $(this).parents('tr')).data();
    alert("User ID #" + data.user_id + " name's is "+data.fullname);
  });


//Sorts the history in descending order depending on when the reservation was created
  $('#history').DataTable( {
    "paging" : false,
    "info": false,
    "searching": false,
    "order": [[ 1, "desc"]]
  });

  $('#historyAdmin').DataTable( {

    "paging" : false,
    "info": false,
    "searching": true,
    "order": [[ 3, "desc"]],
  });

  $('.filter').on('click', function () {
    var $target = $(this).data('target');
    if ($target != 'all') {
      $('.table tr').css('display', 'none');
      $('.table thead tr').fadeIn('slow');
      $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
    } else {
      $('.table tr').css('display', 'none').fadeIn('slow');
    }
   });

  $("#today").attr("data-target", moment().format("ll"))
  $("#tomorrow").attr("data-target", moment().add(1, "days").format("ll"))
  $("#dayafter").attr("data-target", moment().add(2, "days").format("ll"))

  $('.filterdate').on('click', function () {
    var $target = $(this).data('target');
    if ($target != 'all') {
      $('.table tr').css('display', 'none');
      $('.table thead tr').fadeIn('slow');
      $('.table tr[data-time="' + $target + '"]').fadeIn('slow');
    } else {
      $('.table tr').css('display', 'none').fadeIn('slow');
    }
   });

 

  // THESE TWO LINES CALCULATE THE FARES EVERYTIME THE DOCUMENT LOADS!!
  days = parseInt($('#days').val());
  calPrice();

  // When New Reservation is selected in the dashboard, this hides the dashboard and opens the date selection
  $('#newResa').click(function(){
    $('#jumboDash').fadeOut('fast');
    setTimeout(function(){

    $('#jumboResa').fadeIn('slow');
    }, 500);
    $('#pickDate').slideDown('fast');
  });
     

  $('#backDash').click(function(){
    $('#jumboResa').fadeOut('fast');
    $('#pickDate').slideUp('fast');
    setTimeout(function(){
    $('#jumboDash').fadeIn('slow');
    }, 500);
  });


  $('#newResaAdmin').click(function(){
    $('#jumboDash').fadeOut('fast');
    setTimeout(function(){

    $('#jumboResaUserMenu').fadeIn('slow');
    }, 500);
  });

  $('#newUser').click(function(){
    $('#jumboResaUserMenu').fadeOut('fast');
    setTimeout(function(){

    $('#newUserAdmin').fadeIn('slow');
    }, 500);
  });


  $('#backDashAdmin').click(function(){
    $('#jumboResaUserMenu').fadeOut('fast');
    setTimeout(function(){
    $('#jumboDash').fadeIn('slow');
    }, 500);
  });

  $('#backDashUser').click(function(){
    $('#newUserAdmin').fadeOut('fast');
    setTimeout(function(){
    $('#jumboResaUserMenu').fadeIn('slow');
    }, 500);
  });



  // Handles the clicking of the MB Pack button
   $('#mBlancPack').click(function(){

    if (this.checked) {
        eraseAll();
        totalPriceUni += mbpPrice;
        $('#mBlancPack').prop('checked', true);
        $('#mBlancPackPrice').text(parseFloat(mbpPrice).toFixed(2) + '€');
        $('#mBlancPackPrice').fadeIn();
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#shoeSizePack').fadeIn("slow");
        $('#sizePack').attr('required', true);
        
        // Alp shoe
        $('#alpinismShoes').prop('checked', true);
        $('#alpinismShoes').attr('disabled', "disabled");

        // Crampons
        $('#crampons').prop('checked', true);
        $('#crampons').attr('disabled', "disabled");
        $('#cramponsHike').prop('checked', true);
        $('#cramponsHike').attr('disabled', "disabled");

        //Ice Axe
        $('#piolet').prop('checked', true);
        $('#piolet').attr('disabled', "disabled");
        
        //Helmet
        $('#casque').prop('checked', true);
        $('#casque').attr('disabled', "disabled");
        $('#casqueClimb').prop('checked', true);
        $('#casqueClimb').attr('disabled', "disabled"); 

        //Harness
        $('#harness').prop('checked', true);
        $('#harness').attr('disabled', "disabled");
        $('#harnessClimb').prop('checked', true);
        $('#harnessClimb').attr('disabled', "disabled");

        
    } else {
        eraseAll();
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
      }
    });

  // Handles the clicking of the les Gaillands Pack button
   $('#gaillandsPack').click(function(){
    if (this.checked) {
        eraseAll();
        $('#gaillandsPack').prop('checked', true);
        $('#gaillandsPackPrice').text(parseFloat(gaillandPrice).toFixed(2) + '€');
        $('#gaillandsPackPrice').fadeIn();
        totalPriceUni += gaillandPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        // Kid shoes
        $('#kidClimbingShoes').prop('checked', true);
        $('#kidClimbingShoes').attr('disabled', "disabled");

        //Helmet
        $('#casqueClimb').prop('checked', true);
        $('#casqueClimb').attr('disabled', "disabled");        
        $('#casque').prop('checked', true);
        $('#casque').attr('disabled', "disabled");

        //Harness
        $('#harnessClimb').prop('checked', true);
        $('#harnessClimb').attr('disabled', "disabled");
        $('#harness').prop('checked', true);
        $('#harness').attr('disabled', "disabled");

    } else {
        eraseAll();
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
          }
      });
  // Handles the clicking of the les Evettes Pack button
   $('#viaFerrataPack').click(function(){
    if (this.checked) {
        eraseAll();
        $('#viaFerrataPack').prop('checked', true);
        $('#viaFerrataPackPrice').text(parseFloat(viaFerrataPrice).toFixed(2) + '€');
        $('#viaFerrataPackPrice').fadeIn();
        totalPriceUni += viaFerrataPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');

        // Shock Absorber
        $('#shockAbsorber').prop('checked', true);
        $('#shockAbsorber').attr('disabled', "disabled");

        //Helmet
        $('#casqueClimb').prop('checked', true);
        $('#casqueClimb').attr('disabled', "disabled");        
        $('#casque').prop('checked', true);
        $('#casque').attr('disabled', "disabled");

        //Harness
        $('#harnessClimb').prop('checked', true);
        $('#harnessClimb').attr('disabled', "disabled");
        $('#harness').prop('checked', true);
        $('#harness').attr('disabled', "disabled");

    } else {
        eraseAll();
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
          }
      });


   $('#alpinismShoes').click(function(){
    if (this.checked) {
        $('#shoeSize').fadeIn("slow");
        $('#popoverSize').popover('show');
        $('#alpShoesPrice').text(parseFloat(alpShoePrice).toFixed(2) + '€');
        $('#alpShoesPrice').fadeIn();

        totalPriceUni += alpShoePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
    } else {
        totalPriceUni -= alpShoePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#alpShoesPrice').fadeOut();
        $('#alpShoesPrice').text('');        
        $('#shoeSize').fadeOut("slow");
        $('#popoverSize').popover('hide');
      }

   });

   $('#crampons').click(function(){
    if (this.checked) {
        totalPriceUni += cramponsPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#cramponsPrice').text(parseFloat(cramponsPrice).toFixed(2) + '€');
        $('#cramponsPrice').fadeIn();
        $('#cramponsHike').prop('checked', true);
        $('#cramponsHike').attr('disabled', true);
    } else {
        totalPriceUni -= cramponsPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#cramponsPrice').fadeOut();
        $('#cramponsPrice').text('');
        $('#cramponsHike').prop('checked', false);
        $('#cramponsHike').attr('disabled', false); 
      }

   });

   $('#cramponsHike').click(function(){
    if (this.checked) {
        totalPriceUni += cramponsPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#cramponsHikePrice').text(parseFloat(cramponsPrice).toFixed(2) + '€');
        $('#cramponsHikePrice').fadeIn();
        $('#crampons').prop('checked', true);
        $('#crampons').attr('disabled', true);
    } else {
        totalPriceUni -= cramponsPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#cramponsHikePrice').fadeOut();
        $('#cramponsHikePrice').text('');
        $('#crampons').prop('checked', false);
        $('#crampons').attr('disabled', false); 
      }

   });

   $('#piolet').click(function(){
    if (this.checked) {
        totalPriceUni += iceAxePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#pioletPrice').text(parseFloat(iceAxePrice).toFixed(2) + '€');
        $('#pioletPrice').fadeIn();
    } else {
        totalPriceUni -= iceAxePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#pioletPrice').fadeOut();
        $('#pioletPrice').text('');
      }

   });

   $('#casque').click(function(){
    if (this.checked) {
        totalPriceUni += helmetPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#casquePrice').text(parseFloat(helmetPrice).toFixed(2) + '€');
        $('#casquePrice').fadeIn();
        $('#casqueClimb').prop('checked', true);
        $('#casqueClimb').attr('disabled', true);
    } else {
        totalPriceUni -= helmetPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#casquePrice').fadeOut();
        $('#casquePrice').text('');
        $('#casqueClimb').prop('checked', false);
        $('#casqueClimb').attr('disabled', false);      
      }

   });

   $('#casqueClimb').click(function(){
    if (this.checked) {
        totalPriceUni += helmetPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#casqueClimbPrice').text(parseFloat(helmetPrice).toFixed(2) + '€');
        $('#casqueClimbPrice').fadeIn();
        $('#casque').prop('checked', true);
        $('#casque').attr('disabled', true);
    } else {
        totalPriceUni -= helmetPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#casqueClimbPrice').fadeOut();
        $('#casqueClimbPrice').text('');      
        $('#casque').prop('checked', false);
        $('#casque').attr('disabled', false); 
      }

   });

   $('#harness').click(function(){
    if (this.checked) {
        totalPriceUni += harnessPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#harnessPrice').text(parseFloat(harnessPrice).toFixed(2) + '€');
        $('#harnessPrice').fadeIn();
        $('#harnessClimb').prop('checked', true);
        $('#harnessClimb').attr('disabled', true);
    } else {
        totalPriceUni -= harnessPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#harnessPrice').fadeOut();
        $('#harnessPrice').text('');
        $('#harnessClimb').prop('checked', false);
        $('#harnessClimb').attr('disabled', false); 
      }

   });

   $('#harnessClimb').click(function(){
    if (this.checked) {
        totalPriceUni += harnessPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#harnessClimbPrice').text(parseFloat(harnessPrice).toFixed(2) + '€');
        $('#harnessClimbPrice').fadeIn();
        $('#harness').prop('checked', true);
        $('#harness').attr('disabled', true);
    } else {
        totalPriceUni -= harnessPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#harnessClimbPrice').fadeOut();
        $('#harnessClimbPrice').text('');
        $('#harness').prop('checked', false);
        $('#harness').attr('disabled', false); 
      }

   });

   $('#gaiters').click(function(){
    if (this.checked) {
        totalPriceUni += gaitersPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#gaitersPrice').text(parseFloat(gaitersPrice).toFixed(2) + '€');
        $('#gaitersPrice').fadeIn();
    } else {
        totalPriceUni -= gaitersPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#gaitersPrice').fadeOut();
        $('#gaitersPrice').text('');
      }

   });
   $('#poles').click(function(){
    if (this.checked) {
        totalPriceUni += polesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#polesPrice').text(parseFloat(polesPrice).toFixed(2) + '€');
        $('#polesPrice').fadeIn();
        $('#polesHike').prop('checked', true);
        $('#polesHike').attr('disabled', true);

    } else {
        totalPriceUni -= polesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#polesPrice').fadeOut();
        $('#polesPrice').text('');
        $('#polesHike').prop('checked', false);
        $('#polesHike').attr('disabled', false); 
      }

   });

   $('#polesHike').click(function(){
    if (this.checked) {
        totalPriceUni += polesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#polesHikePrice').text(parseFloat(polesPrice).toFixed(2) + '€');
        $('#polesHikePrice').fadeIn();
        $('#poles').prop('checked', true);
        $('#poles').attr('disabled', true);

    } else {
        totalPriceUni -= polesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#polesHikePrice').fadeOut();
        $('#polesHikePrice').text('');
        $('#poles').prop('checked', false);
        $('#poles').attr('disabled', false); 
      }

   });

   $('#pioletGlace').click(function(){
    if (this.checked) {
        totalPriceUni += techIceAxesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#pioletGlacePrice').text(parseFloat(techIceAxesPrice).toFixed(2) + '€');
        $('#pioletGlacePrice').fadeIn();
    } else {
        totalPriceUni -= techIceAxesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#pioletGlacePrice').fadeOut();
        $('#pioletGlacePrice').text('');
      }

   });

   $('#cramponGlace').click(function(){
    if (this.checked) {
        totalPriceUni += cramponIcePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#cramponGlacePrice').text(parseFloat(cramponIcePrice).toFixed(2) + '€');
        $('#cramponGlacePrice').fadeIn();
    } else {
        totalPriceUni -= cramponIcePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#cramponGlacePrice').fadeOut();
        $('#cramponGlacePrice').text('');
      }

   });

   $('#backpack').click(function(){
    if (this.checked) {
        totalPriceUni += backpackPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#backpackPrice').text(parseFloat(backpackPrice).toFixed(2) + '€');
        $('#backpackPrice').fadeIn();
        $('#backpackHike').prop('checked', true);
        $('#backpackHike').attr('disabled', true);

    } else {
        totalPriceUni -= backpackPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#backpackPrice').fadeOut();
        $('#backpackPrice').text('');
        $('#backpackHike').prop('checked', false);
        $('#backpackHike').attr('disabled', false); 

      }

   });

    $('#backpackHike').click(function(){
    if (this.checked) {
        totalPriceUni += backpackPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#backpackHikePrice').text(parseFloat(backpackPrice).toFixed(2) + '€');
        $('#backpackHikePrice').fadeIn();
        $('#backpack').prop('checked', true);
        $('#backpack').attr('disabled', true);

    } else {
        totalPriceUni -= backpackPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#backpackHikePrice').fadeOut();
        $('#backpackHikePrice').text('');
        $('#backpack').prop('checked', false);
        $('#backpack').attr('disabled', false); 

      }

   });

    $('#climbingShoes').click(function(){
    if (this.checked) {
        totalPriceUni += climbShoesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#climbingShoesPrice').text(parseFloat(climbShoesPrice).toFixed(2) + '€');
        $('#climbingShoesPrice').fadeIn();
    } else {
        totalPriceUni -= climbShoesPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#climbingShoesPrice').fadeOut();
        $('#climbingShoesPrice').text('');
      }

   });

    $('#kidClimbingShoes').click(function(){
    if (this.checked) {
        totalPriceUni += kidClimbShoePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#kidClimbingShoesPrice').text(parseFloat(kidClimbShoePrice).toFixed(2) + '€');
        $('#kidClimbingShoesPrice').fadeIn();
    } else {
        totalPriceUni -= kidClimbShoePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#kidClimbingShoesPrice').fadeOut();
        $('#kidClimbingShoesPrice').text('');
      }

   });

    $('#shockAbsorber').click(function(){
    if (this.checked) {
        totalPriceUni += shockAbsPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#shockAbsorberPrice').text(parseFloat(shockAbsPrice).toFixed(2) + '€');
        $('#shockAbsorberPrice').fadeIn();
    } else {
        totalPriceUni -= shockAbsPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#shockAbsorberPrice').fadeOut();
        $('#shockAbsorberPrice').text('');
      }

   });

    $('#crashpad').click(function(){
    if (this.checked) {
        totalPriceUni += crashPadPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#crashpadPrice').text(parseFloat(crashPadPrice).toFixed(2) + '€');
        $('#crashpadPrice').fadeIn();
    } else {
        totalPriceUni -= crashPadPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#crashpadPrice').fadeOut();
        $('#crashpadPrice').text('');
      }

   });

    $('#slackline').click(function(){
    if (this.checked) {
        totalPriceUni += slacklinePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#slacklinePrice').text(parseFloat(slacklinePrice).toFixed(2) + '€');
        $('#slacklinePrice').fadeIn();
    } else {
        totalPriceUni -= slacklinePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#slacklinePrice').fadeOut();
        $('#slacklinePrice').text('');
      }

   });

    $('#hikingShoes').click(function(){
    if (this.checked) {
        totalPriceUni += trekShoePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#hikingShoesPrice').text(parseFloat(trekShoePrice).toFixed(2) + '€');
        $('#hikingShoesPrice').fadeIn();
    } else {
        totalPriceUni -= trekShoePrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#hikingShoesPrice').fadeOut();
        $('#hikingShoesPrice').text('');
      }

   });

    $('#babyCarrier').click(function(){
    if (this.checked) {
        totalPriceUni += strollerPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#babyCarrierPrice').text(parseFloat(strollerPrice).toFixed(2) + '€');
        $('#babyCarrierPrice').fadeIn();
    } else {
        totalPriceUni -= strollerPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#babyCarrierPrice').fadeOut();
        $('#babyCarrierPrice').text('');
      }

   });

    $('#babyStroller').click(function(){
    if (this.checked) {
        totalPriceUni += strollerPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#babyStrollerPrice').text(parseFloat(strollerPrice).toFixed(2) + '€');
        $('#babyStrollerPrice').fadeIn();
    } else {
        totalPriceUni -= strollerPrice;
        $('#totalPrice').val(parseFloat(totalPriceUni).toFixed(2));
        $('#totalLabel').text(parseFloat(totalPriceUni).toFixed(2) + '€');
        $('#babyStrollerPrice').fadeOut();
        $('#babyStrollerPrice').text('');
      }

   });

    $('#size').change(function(){

      if ($("#size").val() !==0) {
          $('#infoSize').fadeOut('slow');    
    };

  });

    $('#sizePack').change(function(){

      if ($("#sizePack").val() !==0) {
          $('#infoSizePack').fadeOut('slow');
    };

  });

});