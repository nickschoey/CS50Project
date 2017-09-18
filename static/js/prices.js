var mbpPrice, cramponsPrice, alpShoePrice, iceAxePrice, harnessPrice, helmetPrice, 
    cramponIcePrice, trekShoePrice, backpackPrice, polesPrice, climbShoesPrice,
    gaillandPrice, gaitersPrice, kidClimbShoePrice, strollerPrice, crashPadPrice, slacklinePrice, 
    shockAbsPrice, viaFerrataPrice;


function Price(article, days) {
  if (article === "Mont-Blanc PackT") {
    if (days > 7) {
        mbpPrice = 165 + ((days-7)*15);
    } else {
    switch (days) {
      case 1:
        mbpPrice = 37;
        break;
      case 2:
        mbpPrice = 63;
        break;
      case 3:
        mbpPrice = 90;
        break;
      case 4:
        mbpPrice = 115;
        break;
      case 5:
        mbpPrice = 135;
        break;
      case 6:
        mbpPrice = 150;
        break;
      case 7:
        mbpPrice = 165;
        break;
    }
  	};

  } else if (article === "alpinismShoes") {
		if (days > 7) {
	    alpShoePrice = 64 + ((days-7)*7);
    } else {
    switch (days) {
      case 1:
        alpShoePrice = 12;
        break;
      case 2:
        alpShoePrice = 24;
        break;
      case 3:
        alpShoePrice = 32;
        break;
      case 4:
        alpShoePrice = 40;
        break;
      case 5:
        alpShoePrice = 48;
        break;
      case 6:
        alpShoePrice = 56;
        break;
      case 7:
        alpShoePrice = 64;
        break;
    }
	};

  } else if (article === "Crampons") {
		if (days > 7) {
	    cramponsPrice = 62 + ((days-7)*7);
    } else {
    switch (days) {
      case 1:
        cramponsPrice = 11;
        break;
      case 2:
        cramponsPrice = 21;
        break;
      case 3:
        cramponsPrice = 30;
        break;
      case 4:
        cramponsPrice = 38;
        break;
      case 5:
        cramponsPrice = 46;
        break;
      case 6:
        cramponsPrice = 56;
        break;
      case 7:
        cramponsPrice = 62;
        break;
    }
	};
} else if (article === "iceAxe") {
    if (days > 7) {
      iceAxePrice = 45 + ((days-7)*5);
    } else {
    switch (days) {
      case 1:
        iceAxePrice = 8;
        break;
      case 2:
        iceAxePrice = 16;
        break;
      case 3:
        iceAxePrice = 23;
        break;
      case 4:
        iceAxePrice = 29;
        break;
      case 5:
        iceAxePrice = 35;
        break;
      case 6:
        iceAxePrice = 40;
        break;
      case 7:
        iceAxePrice = 45;
        break;
    }
  };
} else if (article === "techIceAxes") {
    if (days > 7) {
      techIceAxesPrice = 105 + ((days-7)*10);
    } else {
    switch (days) {
      case 1:
        techIceAxesPrice = 18;
        break;
      case 2:
        techIceAxesPrice = 36;
        break;
      case 3:
        techIceAxesPrice = 51;
        break;
      case 4:
        techIceAxesPrice = 65;
        break;
      case 5:
        techIceAxesPrice = 80;
        break;
      case 6:
        techIceAxesPrice = 93;
        break;
      case 7:
        techIceAxesPrice = 105;
        break;
    }
  };
} else if (article === "harness") {
    if (days > 7) {
      harnessPrice = 41 + ((days-7)*4);
    } else {
    switch (days) {
      case 1:
        harnessPrice = 8;
        break;
      case 2:
        harnessPrice = 15;
        break;
      case 3:
        harnessPrice = 21;
        break;
      case 4:
        harnessPrice = 26;
        break;
      case 5:
        harnessPrice = 31;
        break;
      case 6:
        harnessPrice = 36;
        break;
      case 7:
        harnessPrice = 41;
        break;
    }
  };
} else if (article === "gaiters") {
    if (days > 7) {
      gaitersPrice = 12 + ((days-7)*1);
    } else {
    switch (days) {
      case 1:
        gaitersPrice = 2.5;
        break;
      case 2:
        gaitersPrice = 5;
        break;
      case 3:
        gaitersPrice = 7;
        break;
      case 4:
        gaitersPrice = 8.5;
        break;
      case 5:
        gaitersPrice = 10;
        break;
      case 6:
        gaitersPrice = 11;
        break;
      case 7:
        gaitersPrice = 12;
        break;
    }
  };
} else if (article === "helmet") {
    if (days > 7) {
      helmetPrice = 31 + ((days-7)*5);
    } else {
    switch (days) {
      case 1:
        helmetPrice = 7;
        break;
      case 2:
        helmetPrice = 11;
        break;
      case 3:
        helmetPrice = 15;
        break;
      case 4:
        helmetPrice = 19;
        break;
      case 5:
        helmetPrice = 23;
        break;
      case 6:
        helmetPrice = 27;
        break;
      case 7:
        helmetPrice = 31;
        break;
    }
  };
} else if (article === "cramponIce") {
    if (days > 7) {
      cramponIcePrice = 85 + ((days-7)*10);
    } else {
    switch (days) {
      case 1:
        cramponIcePrice = 15;
        break;
      case 2:
        cramponIcePrice = 30;
        break;
      case 3:
        cramponIcePrice = 43;
        break;
      case 4:
        cramponIcePrice = 54;
        break;
      case 5:
        cramponIcePrice = 65;
        break;
      case 6:
        cramponIcePrice = 75;
        break;
      case 7:
        cramponIcePrice = 85;
        break;
    }
  };
} else if (article === "trekShoe") {
    if (days > 7) {
      trekShoePrice = 50 + ((days-7)*5);
    } else {
    switch (days) {
      case 1:
        trekShoePrice = 10;
        break;
      case 2:
        trekShoePrice = 20;
        break;
      case 3:
        trekShoePrice = 26;
        break;
      case 4:
        trekShoePrice = 32;
        break;
      case 5:
        trekShoePrice = 38;
        break;
      case 6:
        trekShoePrice = 44;
        break;
      case 7:
        trekShoePrice = 50;
        break;
    }
  };
} else if (article === "backpack") {
    if (days > 7) {
      backpackPrice = 57 + ((days-7)*6);
    } else {
    switch (days) {
      case 1:
        backpackPrice = 10;
        break;
      case 2:
        backpackPrice = 20;
        break;
      case 3:
        backpackPrice = 29;
        break;
      case 4:
        backpackPrice = 36;
        break;
      case 5:
        backpackPrice = 43;
        break;
      case 6:
        backpackPrice = 50;
        break;
      case 7:
        backpackPrice = 57;
        break;
    }
  };
} else if (article === "poles") {
    if (days > 7) {
      polesPrice = 41 + ((days-7)*4);
    } else {
    switch (days) {
      case 1:
        polesPrice = 9;
        break;
      case 2:
        polesPrice = 17;
        break;
      case 3:
        polesPrice = 22;
        break;
      case 4:
        polesPrice = 27;
        break;
      case 5:
        polesPrice = 32;
        break;
      case 6:
        polesPrice = 36;
        break;
      case 7:
        polesPrice = 41;
        break;
    }
  };
} else if (article === "climbShoes") {
    if (days > 7) {
      climbShoesPrice = 52 + ((days-7)*5);
    } else {
    switch (days) {
      case 1:
        climbShoesPrice = 10;
        break;
      case 2:
        climbShoesPrice = 20;
        break;
      case 3:
        climbShoesPrice = 27;
        break;
      case 4:
        climbShoesPrice = 34;
        break;
      case 5:
        climbShoesPrice = 40;
        break;
      case 6:
        climbShoesPrice = 46;
        break;
      case 7:
        climbShoesPrice = 52;
        break;
    }
  };
} else if (article === "gailland") {
    if (days > 7) {
      gaillandPrice = 74 + ((days-7)*10);
    } else {
    switch (days) {
      case 1:
        gaillandPrice = 13;
        break;
      case 2:
        gaillandPrice = 26;
        break;
      case 3:
        gaillandPrice = 36;
        break;
      case 4:
        gaillandPrice = 47;
        break;
      case 5:
        gaillandPrice = 56;
        break;
      case 6:
        gaillandPrice = 65;
        break;
      case 7:
        gaillandPrice = 74;
        break;
    }
  };
} else if (article === "kidClimbShoe") {
    if (days > 7) {
      kidClimbShoePrice = 33 + ((days-7)*4);
    } else {
    switch (days) {
      case 1:
        kidClimbShoePrice = 6;
        break;
      case 2:
        kidClimbShoePrice = 12;
        break;
      case 3:
        kidClimbShoePrice = 16;
        break;
      case 4:
        kidClimbShoePrice = 21;
        break;
      case 5:
        kidClimbShoePrice = 25;
        break;
      case 6:
        kidClimbShoePrice = 29;
        break;
      case 7:
        kidClimbShoePrice = 33;
        break;
    }
  };
} else if (article === "stroller") {
    if (days > 7) {
      strollerPrice = 59 + ((days-7)*6);
    } else {
    switch (days) {
      case 1:
        strollerPrice = 11;
        break;
      case 2:
        strollerPrice = 21;
        break;
      case 3:
        strollerPrice = 29;
        break;
      case 4:
        strollerPrice = 37;
        break;
      case 5:
        strollerPrice = 45;
        break;
      case 6:
        strollerPrice = 52;
        break;
      case 7:
        strollerPrice = 59;
        break;
    }
  };
}  else if (article === "crashPad") {
    if (days > 7) {
      crashPadPrice = 76 + ((days-7)*8);
    } else {
    switch (days) {
      case 1:
        crashPadPrice = 12;
        break;
      case 2:
        crashPadPrice = 24;
        break;
      case 3:
        crashPadPrice = 36;
        break;
      case 4:
        crashPadPrice = 47;
        break;
      case 5:
        crashPadPrice = 58;
        break;
      case 6:
        crashPadPrice = 68;
        break;
      case 7:
        crashPadPrice = 76;
        break;
    }
  };
} else if (article === "slackline") {
    if (days > 7) {
      slacklinePrice = 50 + ((days-7)*5);
    } else {
    switch (days) {
      case 1:
        slacklinePrice = 10;
        break;
      case 2:
        slacklinePrice = 19;
        break;
      case 3:
        slacklinePrice = 27;
        break;
      case 4:
        slacklinePrice = 35;
        break;
      case 5:
        slacklinePrice = 40;
        break;
      case 6:
        slacklinePrice = 45;
        break;
      case 7:
        slacklinePrice = 50;
        break;
    }
  };
} else if (article === "shockAbs") {
    if (days > 7) {
      shockAbsPrice = 50 + ((days-7)*5);
    } else {
    switch (days) {
      case 1:
        shockAbsPrice = 10;
        break;
      case 2:
        shockAbsPrice = 20;
        break;
      case 3:
        shockAbsPrice = 26;
        break;
      case 4:
        shockAbsPrice = 32;
        break;
      case 5:
        shockAbsPrice = 38;
        break;
      case 6:
        shockAbsPrice = 44;
        break;
      case 7:
        shockAbsPrice = 50;
        break;
    }
  };
} else if (article === "viaFerrata") {
    if (days > 7) {
      viaFerrataPrice = 100 + ((days-7)*5);
    } else {
    switch (days) {
      case 1:
        viaFerrataPrice = 22;
        break;
      case 2:
        viaFerrataPrice = 40;
        break;
      case 3:
        viaFerrataPrice = 57;
        break;
      case 4:
        viaFerrataPrice = 70;
        break;
      case 5:
        viaFerrataPrice = 82;
        break;
      case 6:
        viaFerrataPrice = 93;
        break;
      case 7:
        viaFerrataPrice = 100;
        break;
    }
  };
} 

}; //function Price end

