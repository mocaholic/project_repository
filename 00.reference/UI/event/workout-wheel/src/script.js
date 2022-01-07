// set default degree (360 * 5)
var degree = 1800;

// number of clicks = 0
var clicks = 0;

$(document).ready(function() {

	// wheel spin
	$('#spin').click(function(){
		
		// add 1 every click
		clicks ++;
		// the wheel will spin five times + some random fraction of a full rotation
    // so multiply the degree of five rotations by the number of clicks
		var newDegree = degree * clicks;
    // generate a random number between 1–360
		var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    // add to the new degree
		totalDegree = newDegree + extraDegree;
    // whatever degree the wheel is at, how many degrees between 0–360 is it from it's original position.
    var remainderDegree = totalDegree % 360;
    
		// tilt the spinner every time the edge of the section hits the indicator
		$('#wheel .sec').each(function() {
			var t = $(this);
			var c = 0;
			var n = 700;
      
      // execute at an interval of 0.01 seconds
			var interval = setInterval(function () {
				c++;				
				if (c === n) { 
					clearInterval(interval);				
				}
				var sectionOffset = t.offset().top;
				
				/* 35.69 is the minumum distance from the top that each section can be. So, whenever the offset reaches near 35.69, we know that section has a side that is 90 degrees and is therefore exactly aligned with the spinner. */
				if(sectionOffset < 36) {
					console.log('--- spinner aligned ---');
					$('#spin').addClass('spin');
					setTimeout(function () { 
						$('#spin').removeClass('spin');
					}, 100);	
				}
        
      // 0.01 second
			}, 10);
     
      // culmulatively add to the wheel's rotation degree
			$('#inner-wheel').css({
				'transform' : 'rotate(' + totalDegree + 'deg)'			
			});
		 			
		});
    
    // remove name when wheel is spun
    $("#winner").html("");
    
    // display name when wheel finishes spinning
    function showName(name) {
      setTimeout(function () { 
        $("#winner").html("your challenge: " + name);
      }, 6000);
    }
    
    // display the cooresponding person's name    
    switch (true) {
      case (remainderDegree > 337.5 || remainderDegree <= 22.5):
        showName("plyo lunges");
        break;
      case (remainderDegree > 22.5 && remainderDegree <= 67.5):
        showName("reverse lunges");
        break;
      case (remainderDegree > 67.5 && remainderDegree <= 112.5):
        showName("mason twists");
        break;
      case (remainderDegree > 112.5 && remainderDegree <= 157.5):
        showName("leg raises");
        break;
      case (remainderDegree > 157.5 && remainderDegree <= 202.5):
        showName("mountain climbers");
        break;
      case (remainderDegree > 202.5 && remainderDegree <= 247.5):
        showName("push-ups");
        break;
      case (remainderDegree > 247.5 && remainderDegree <= 292.5):
        showName("squats");
        break;
      default:
        showName("burpees");
        break;
    }

    // log per click
    console.log('clicks = ' + clicks);
    console.log('newDegree = ' + newDegree);
    console.log('extraDegree = ' + extraDegree);
    console.log('totalDegree = ' + totalDegree);
    console.log('remainderDegree = ' + remainderDegree);
    
	});
	
});