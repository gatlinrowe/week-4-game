$(document).ready(function() {
	var drivers = new Array(4);
	drivers[0] = new Driver ('Fittipaldi', 'fittipaldi.jpg', 120, 16, 23);
	drivers[1] = new Driver ('Mass', 'mass.jpg', 130, 18, 24);
	drivers[2] = new Driver ('Senna', 'senna.jpg', 140, 20, 35);
	drivers[3] = new Driver ('Top Dog', 'top-dog.jpg', 150, 22, 59);
//
	var hitpoints = [120, 130, 140, 150];

	var player = -1;
	var opponent = -1;
	var pitRow = new Array;  // Array of defeated opponents
	var roundOver = false;
	var numWins = 0;

//	function Driver(name, image, health, attack, counter) {
		this.name = name;
		this.image = image;
		this.health = health;
		this.attack = attack;
		this.counter = counter;
		this.status = 'available';
	}

//	function showDriverPool() {
		$('#drivers').empty();
		for (ctr = 0; ctr < drivers.length; ctr++) {
			// Check to see if they have been selected to play first
			// Will also need to check if they have been eliminated
			if (drivers[ctr].status == 'available') {
				var $newDriver = $('<div>')
					.addClass('driver col-sm-3')
					.attr('driver-id', ctr)
					.html('<span class="name">'+ drivers[ctr].name + '</span><img src="assets/images/'+ drivers[ctr].image +'"><span class="points">('+ drivers[ctr].health + ')</span>');
					// $newDriver.on('click', selectDriver(ctr));
				$('#drivers').append($newDriver);				
			}
		}
		$('.driver').on('click', function() {
			selectDriver(this.getAttribute('driver-id'));
		});
	}

//	function showPlayer(index) {
		var $newPlayer = $('<div>')
			.addClass(' player col-sm-offset-1 col-sm-3 ')
			.html('<span class="name">'+ drivers[index].name + ' (' + drivers[index].health + ')</span><img src="assets/images/'+ drivers[index].image +'"><span class="points">'+ 'Attack ' + drivers[index].attack + ' | Counter ' +  + drivers[index].counter +'</span>');
		$('#player').html($newPlayer);
		$('#player-header').html('Player');
		$('#versus').html('<img src="assets/images/vs.png">');
	}
//	function showOpponent(index) {
		var $newOpponent = $('<div>')
			.addClass('opponent col-sm-offset-1 col-sm-3 ')
			.html('<span class="name">'+ drivers[index].name + ' (' + drivers[index].health + ')</span><img src="assets/images/'+ drivers[index].image +'"><span class="points">'+ 'Attack ' + drivers[index].attack + ' | Counter ' +  + drivers[index].counter +'</span>');
		$('#opponent').html($newOpponent);
		$('#opponent-header').html('Opponent');
		$('#versus').html('<img src="assets/images/gas.png"><h3>Go!<h3>');
	}
//	function race() {
//		drivers[opponent].health = drivers[opponent].health	- drivers[player].attack;
		drivers[player].health = drivers[player].health	- drivers[opponent].counter;		
		if (drivers[opponent].health < 1) {
			// Round over, player wins
			drivers[opponent].health = 0;
			drivers[opponent].status = 'lost';
			nextRound();
		} else if (drivers[player].health < 1) {
			// Round over, opponent wins
			drivers[player].health = 0;
			gameOver();
		}
		drivers[player].attack = drivers[player].attack + 5;
		refreshDisplay();
	}

	function nextRound() {
		pitRow.push(opponent);
		numWins++;
		if (numWins > 2) {
			playerWins();
		}
		opponent = -1;
		drivers[player].health = hitpoints[player];
		$('#opponent').empty();		
		refreshDisplay();
		$('#lost').empty();
		showPitRow();		
	}
	function gameOver() {
		$('#race').html("<h2>Game Over<h2>");
	}
	function playerWins() {
		$('#race').html('<h2>Winner, winner, chicken dinner!!<span class="name">'+ drivers[player].name + '</span><img src="assets/images/'+ drivers[player].image +'"><span class="points"> </span></h2>');
	}
//	function refreshDisplay () {
		showDriverPool();
		if (player != -1) {
			showPlayer(player);
			if (pitRow.length > 1) {
				$('#action').html("Final race");			
			} else if (pitRow.length > 0) {
				$('#action').html("Select your next opponent");			
			} else {
				$('#action').html("Select your opponent");			
			}
		}
		if (opponent != -1) {
			showOpponent(opponent);
			if (pitRow.length < 2) {
				// Don't show this for the final race
				$('#action').html("Start your engines!");	
			}
		}
	}
	function showPitRow() {
		for (ctr = 0; ctr < drivers.length; ctr++) {
			$('#lost').empty;
				if (drivers[ctr].status == 'lost') {
					var $lostDriver = $('<div>')
						.addClass('lostDriver col-sm-3 ')
						.html('<span class="name">'+ drivers[ctr].name + '</span><img src="assets/images/'+ drivers[ctr].image +'"><span> </span>');
					$('#lost').append($lostDriver);	
				}
		}
	}
	//function selectDriver(index) {
		if (player === -1 && opponent === -1 ) {
			// Nothing selected so this is the player
			player = index;
			drivers[player].status = 'player';
		} else if (opponent === -1) {
			// player already picked, so pick the opponent
			opponent = index;
			drivers[opponent].status = 'opponent';			
		}
		refreshDisplay();
	}

	$('#versus').on('click', function () {
		if (player > -1 && opponent > -1) {
			race();
		}
	});

	showDriverPool();

});