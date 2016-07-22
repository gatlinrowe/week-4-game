$(document).ready(function() {
	var characters = new Array(4);
	characters[0] = new Character ("Tracer", "tracer.png", 100, 10, 20);
	characters[1] = new Character ("Soldier 76", "soldier76.png", 130, 20, 30);
	characters[2] = new Character ("Winston", "winston.png", 200, 30, 40);
	characters[3] = new Character ("Pharah", "pharah.png", 130, 40, 50);

	var healthpoints = [100, 130, 200, 130];

	var blue = -1;
	var red = -1;
	var spawn = new Array;
	var gameOver = false;
	var wins = 0;

	function Character(name, image, health, attack, counter) {
		this.name = name;
		this.image = image;
		this.health = health;
		this.attack = attack;
		this.counter = counter;
		this.status = "ready";
	}

	function showCharacters() {
		$('#characters').empty();
		for (i =0; i < characters.length; i++) {
			if (characters[i].status == "ready") {
				var $newCharacter = $('<div>')
					.addClass("character col-sm-3")
					.attr("character-id", i)
					.html("<span class='name'>"+ characters[i].name + "</span><img src='images/" + characters[i].image +"'><span class='health'>("+ characters[i].health + ")</span>");
				$("#characters").append($newCharacter);
				console.log($newCharacter);
			}
		}
		$(".character").on("click", function(){ 
			selectCharacter(this.getAttribute("character-id"));
			console.log(this.getAttribute("character-id"));
		});
	}
	function selectCharacter(index) {
		if (blue === -1 && red === -1) {
			blue = index;
			characters[blue].status = "blue";
		} else if (red === -1) {
			red = index;
			characters[red].status = "red";
		}
		refresh();
	}
	function refresh() {
		showCharacters();
		if (blue != -1) {
			showBlue(blue);
			if (spawn.length > 1) {
				$("#action").html('Final Round');
			} else if (spawn.length > 0) {
				$("#action").html('Round 2');
			} else {
				$("#action").html("Round 1");
			}
		}
		if (red != -1) {
			showRed(red);
			if (spawn.length < 2) {
				$("#action").html('Fight!');
			}
		}
	}
	function showBlue(index) {
		var $newBlue = $("<div>")
			.addClass(" character col-sm-offset-1 col-sm-3")
			.html("<span class='name'>"+ characters[index].name + " (" + characters[index].health + ")</span><img src='images/"+ characters[index].image +"'><span class='health'>"+ "Attack "+characters[index].attack +"</span>");
			$("#blue").html($newBlue);
			$("#blue-header").html('Blue Team');
			$("#vs").html("<img src='images/vs.png'>");
	}
	function showRed(index) {
		var $newRed = $("<div>")
			.addClass("red col-sm-offset-1 col-sm-3")
			.html("<span class-'name'>"+ characters[index].name + " (" + characters[index].health + ")</span><img src='images/" + characters[index].image +"'><span class='health'>" + "Attack "+characters[index].attack + "</span>");
		$("#red").html($newRed);
		$("#red-header").html("Red Team");
		$("#vs").html("<img src='images/vs.png'>");
	}
	function fight() {
		characters[red].health = characters[red].health - characters[blue].attach;
		characters[blue].health = characters[blue].health - characters[red].counter;
		if (characters[red].health < 1) {
			characters[red].health = 0;
			characters[red].status = "dead";
			nextRound();
		} else if (characters[blue].health < 1) {
			characters[blue].health = 0;
			gameOver();
		}
	}
	$('#vs').on("click", function() {
		if (blue > -1 && red > -1) {
			fight()
		}
	})
showCharacters();
});