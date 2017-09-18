  var result;
  var user;
  var resa;

function loadDocAdmin2(ide){
  var resa_id = ide;
  $("#deleteResa").attr("href", "http://188.226.149.94/deleteAdmin/"+resa_id)
  $("#confirmResa").attr("href", "http://188.226.149.94/confirmAdmin/"+resa_id)
  $("#rejectResa").attr("href", "http://188.226.149.94/rejectAdmin/"+resa_id)
  $("#archiveResa").attr("href", "http://188.226.149.94/archiveAdmin/"+resa_id)
  $.ajax({url: "http://188.226.149.94/infoAdmin/"+resa_id,
   success: function(result){
    result = result;
  }});

  $.ajax({url: "http://188.226.149.94/infoUserAdmin/"+user_id,
  success: function(user){
    user = user;
  }});

  $.ajax({url: "http://188.226.149.94/infoResaAdmin/"+resa_id,
  success: function(resa){
    resa = resa;
  }});
    console.log(result);
    console.log(user);
    console.log(resa);

    var user_id = result[0].user_id;

    $("#resaUniTitleAdmin").html("Reservation #"+resa_id);
    $("#resaUniSubtitleAdmin").html("from "+moment(result[0].datestart).format('LLLL')+" to "+moment(result[0].dateend).format('LLLL'));

      $("#resaUniAdminContent").append("<p><b>Full Name:</b> "+user[0].fullname+"</p");
      $("#resaUniAdminContent").append("<p><b>Email:</b> "+user[0].email+"</p");
      $("#resaUniAdminContent").append("<p><b>Telephone:</b> "+user[0].telephone+"</p");

      $("#resaUniAdminContentRight").append("<p><b>Reservation made:</b> "+moment(resa[0].creationdate).fromNow()+"</p");
      $("#resaUniAdminContentRight").append("<p><b>Reservation Status:</b> ");
      $("#resaUniAdminContentLow").append("<p>"+resa[0].comment+"</p");
      $("#resaUniFootAdmin").append("<tr>");
      $("#resaUniFootAdmin").append("<td>TOTAL</td>");
      $("#resaUniFootAdmin").append("<td>"+resa[0].total+"€"+"</td>");
      $("#resaUniFootAdmin").append("</tr>");
      
      if (moment(resa[0].dateend).isAfter(moment()) ) {
        $("#archiveResa").show();
      } else {
        $("#archiveResa").hide();
        $("#confirmResa").hide();
        $("#rejectResa").hide();
        $("#deleteResa").hide();
      };
      if (resa[0].status =="1") {
      $("#resaUniAdminContentRight").append("Confirmation Pending</p>");
      $("#confirmResa").show();
      $("#rejectResa").show();
      $("#deleteResa").show();
      };
      if (resa[0].status =="2") {
      $("#resaUniAdminContentRight").append("Confirmed</p>");
      $("#confirmResa").hide();
      $("#rejectResa").hide();
      $("#deleteResa").show();
      $("#archiveResa").hide();
      };
      if (resa[0].status =="3") {
      $("#resaUniAdminContentRight").append("Reservation refused</p>");
      $("#confirmResa").show();
      $("#deleteResa").hide();
      };
      if (resa[0].status =="4") {
      $("#resaUniAdminContentRight").append("Cancelled</p>");
      $("#confirmResa").hide();
      $("#deleteResa").hide();
      $("#rejectResa").hide();
      $("#archiveResa").hide();
      };
      if (resa[0].status =="5") {
      $("#resaUniAdminContentRight").append("Archived</p>");
      $("#confirmResa").hide();
      $("#deleteResa").hide();
      $("#rejectResa").hide();
      $("#archiveResa").hide();
      };

      for (var i = 0; i < result.length; i++) {
        $("#resaUniBodyAdmin").append("<tr role='row'>");
        $("#resaUniBodyAdmin").append("<td>"+result[i].name+"</td>");
        $("#resaUniBodyAdmin").append("<td>"+result[i].price+"€"+"</td>");
        if (result[i].mbPack) {
          // Mont-Blanc Pack
          $("#resaUniBodyAdmin").append("<td>"+mbPack+"</td>");
          // Boots + Size
          $("#resaUniBodyAdmin").append("<td>"+boots+"</td>");
          $("#resaUniBodyAdmin").append("<td data-toggle='tooltip' title='Size'>"+result[i].alpBootSize+"</td>");
          // Crampons
          $("#resaUniBodyAdmin").append("<td>"+crampons+"</td>");
          // Piolet
          $("#resaUniBodyAdmin").append("<td>"+piolet+"</td>");
          //Helmet
          $("#resaUniBodyAdmin").append("<td>"+helmet+"</td>");
          //Harness
          $("#resaUniBodyAdmin").append("<td>"+harness+"</td>");
        } else if (result[i].viaFerrataKit) {
          $("#resaUniBodyAdmin").append("<td>"+evettes+"</td>");
          $("#resaUniBodyAdmin").append("<td>"+sAbsorber+"</td>");
          $("#resaUniBodyAdmin").append("<td>"+helmet+"</td>");
          $("#resaUniBodyAdmin").append("<td>"+harness+"</td>");
        } else if (result[i].gaillandKit) {
          $("#resaUniBodyAdmin").append("<td>"+gaillands+"</td>");
          $("#resaUniBodyAdmin").append("<td>"+kCShoes+"</td>");
          $("#resaUniBodyAdmin").append("<td>"+helmet+"</td>");
          $("#resaUniBodyAdmin").append("<td>"+harness+"</td>");
        };
        if (result[i].alpBoots) {
          $("#resaUniBodyAdmin").append("<td>"+boots+"</td>");
          $("#resaUniBodyAdmin").append("<td>"+result[i].alpBootSize+"</td>");
        }; 
        if (result[i].crampons) {
          $("#resaUniBodyAdmin").append("<td>"+crampons+"</td>");
        };
        if (result[i].iceAxe) {
          $("#resaUniBodyAdmin").append("<td>"+piolet+"</td>");
        };
        if (result[i].helmet) {
          $("#resaUniBodyAdmin").append("<td>"+helmet+"</td>");
        };
        if (result[i].harness) {
          $("#resaUniBodyAdmin").append("<td>"+harness+"</td>");
        };
        if (result[i].gaiters) {
          $("#resaUniBodyAdmin").append("<td>"+gaiters+"</td>");
        };
        if (result[i].poles) {
          $("#resaUniBodyAdmin").append("<td>"+poles+"</td>");
        };
        if (result[i].techIceAxes) {
          $("#resaUniBodyAdmin").append("<td>"+icePiolets+"</td>");
        };
        if (result[i].iceCrampons) {
          $("#resaUniBodyAdmin").append("<td>"+iceCrampons+"</td>");
        };
        if (result[i].backpack) {
          $("#resaUniBodyAdmin").append("<td>"+backpack+"</td>");
        };
        if (result[i].climbingShoes) {
          $("#resaUniBodyAdmin").append("<td>"+cShoes+"</td>");
        };
        if (result[i].kidClimbingShoes) {
          $("#resaUniBodyAdmin").append("<td>"+kCShoes+"</td>");
        };
        if (result[i].viaFerrataShock) {
          $("#resaUniBodyAdmin").append("<td>"+sAbsorber+"</td>");
        };
        if (result[i].crashpad) {
          $("#resaUniBodyAdmin").append("<td>"+crashpad+"</td>");
        };
        if (result[i].slackline) {
          $("#resaUniBodyAdmin").append("<td>"+slackline+"</td>");
        };
        if (result[i].hikingShoes) {
          $("#resaUniBodyAdmin").append("<td>"+hShoes+"</td>");
        };
        if (result[i].stroller) {
          $("#resaUniBodyAdmin").append("<td>"+stroller+"</td>");
        };
        if (result[i].babyCarrier) {
          $("#resaUniBodyAdmin").append("<td>"+bCarrier+"</td>");
        };
        $("#resaUniBodyAdmin").append("</tr>");
  };

};
