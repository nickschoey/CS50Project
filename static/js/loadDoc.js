function loadDoc(ide){
  $("#resaUniBody").empty();
  $.ajax({url: "http://188.226.149.94/info/"+ide,
   success: function(result){
    $("#resaUniTitle").html("Reservation #"+ide+ " from "+result[0].datestart+" to "+result[0].dateend);
      for (var i = 0; i < result.length; i++) {
        $("#resaUniBody").append("<tr role='row'>");
        $("#resaUniBody").append("<td>"+result[i].name+"</td>");
        $("#resaUniBody").append("<td>"+result[i].price+"€"+"</td>");
        if (result[i].mbPack) {
          // Mont-Blanc Pack
          $("#resaUniBody").append("<td>"+mbPack+"</td>");
          // Boots + Size
          $("#resaUniBody").append("<td>"+boots+"</td>");
          $("#resaUniBody").append("<td>"+result[i].alpBootSize+"</td>");
          // Crampons
          $("#resaUniBody").append("<td>"+crampons+"</td>");
          // Piolet
          $("#resaUniBody").append("<td>"+piolet+"</td>");
          //Helmet
          $("#resaUniBody").append("<td>"+helmet+"</td>");
          //Harness
          $("#resaUniBody").append("<td>"+harness+"</td>");
        } else if (result[i].viaFerrataKit) {
          $("#resaUniBody").append("<td>"+evettes+"</td>");
          $("#resaUniBody").append("<td>"+sAbsorber+"</td>");
          $("#resaUniBody").append("<td>"+helmet+"</td>");
          $("#resaUniBody").append("<td>"+harness+"</td>");
        } else if (result[i].gaillandKit) {
          $("#resaUniBody").append("<td>"+gaillands+"</td>");
          $("#resaUniBody").append("<td>"+kCShoes+"</td>");
          $("#resaUniBody").append("<td>"+helmet+"</td>");
          $("#resaUniBody").append("<td>"+harness+"</td>");
        };
        if (result[i].alpBoots) {
          $("#resaUniBody").append("<td>"+boots+"</td>");
          $("#resaUniBody").append("<td>"+result[i].alpBootSize+"</td>");
        }; 
        if (result[i].crampons) {
          $("#resaUniBody").append("<td>"+crampons+"</td>");
        };
        if (result[i].iceAxe) {
          $("#resaUniBody").append("<td>"+piolet+"</td>");
        };
        if (result[i].helmet) {
          $("#resaUniBody").append("<td>"+helmet+"</td>");
        };
        if (result[i].harness) {
          $("#resaUniBody").append("<td>"+harness+"</td>");
        };
        if (result[i].gaiters) {
          $("#resaUniBody").append("<td>"+gaiters+"</td>");
        };
        if (result[i].poles) {
          $("#resaUniBody").append("<td>"+poles+"</td>");
        };
        if (result[i].techIceAxes) {
          $("#resaUniBody").append("<td>"+icePiolets+"</td>");
        };
        if (result[i].iceCrampons) {
          $("#resaUniBody").append("<td>"+iceCrampons+"</td>");
        };
        if (result[i].backpack) {
          $("#resaUniBody").append("<td>"+backpack+"</td>");
        };
        if (result[i].climbingShoes) {
          $("#resaUniBody").append("<td>"+cShoes+"</td>");
        };
        if (result[i].kidClimbingShoes) {
          $("#resaUniBody").append("<td>"+kCShoes+"</td>");
        };
        if (result[i].viaFerrataShock) {
          $("#resaUniBody").append("<td>"+sAbsorber+"</td>");
        };
        if (result[i].crashpad) {
          $("#resaUniBody").append("<td>"+crashpad+"</td>");
        };
        if (result[i].slackline) {
          $("#resaUniBody").append("<td>"+slackline+"</td>");
        };
        if (result[i].hikingShoes) {
          $("#resaUniBody").append("<td>"+hShoes+"</td>");
        };
        if (result[i].stroller) {
          $("#resaUniBody").append("<td>"+stroller+"</td>");
        };
        if (result[i].babyCarrier) {
          $("#resaUniBody").append("<td>"+bCarrier+"</td>");
        };
  }}});
};