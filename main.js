function check(){

	var question1 = document.quiz.question1.value;
	var question2 = document.quiz.question2.value;
	var question3 = document.quiz.question3.value;
	var question4 = document.quiz.question4.value;
	var question5 = document.quiz.question5.value;
	
	var correct = 0;


	if (question1 == "Purple") {
		correct++;
   }
	if (question2 == "The Force") {
		correct++;
   }	
	if (question3 == "Grogu") {
		correct++;
	}
	if (question4 == "1977") {
		correct++;
	}
	if (question5 == "Carbonite") {
		correct++;
	}
	
	
	var messages = ["The Force is strong with this one!", "Don't underestimate the Force.", "I find your lack of faith disturbing!"];
	var score;

	if (correct == 0) {
		score = 2;
	}

	if (correct > 0 && correct < 3) {
		score = 2;
	}

	if (correct > 2 && correct < 5) {
		score = 1;
	}

	if (correct == 5) {
		score = 0;
	}
	document.getElementById("after_submit").style.visibility = "visible";

	document.getElementById("message").innerHTML = messages[score];
	document.getElementById("number_correct").innerHTML = "You got " + correct + " correct.";
	}