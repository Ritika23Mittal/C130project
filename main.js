hp = "";
pp = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

songstatusleftWrist = "";
songstatusrightWrist = "";

function preload() {
	hp = loadSound("music.mp3");
	pp = loadSound("music2.mp3");
}

function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
	if (results.length > 0) {

		scoreLeftWrist = results[0].pose.keypoints[10].score;
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		console.log(" scorerightWrist = " + scorerightWrist+" scoreLeftWrist = " + scoreleftWrist);

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

	}
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	function isPlaying() {
		songstatusleftWrist = hp.isPlaying();
	
	}

	if (scoreleftWrist > 0.2) {
		circle(leftWristX, leftWristY, 20);
		pp.stop();

		if (songstatusleftWrist == false) {
			hp.play();

			document.getElementById("song_name").innerHTML = "Playing: Harry Potter Remix"
		}
	}

	function isPlaying() {
		songstatusrightWrist = pp.isPlaying();
	}

	if (scorerightWrist > 0.2) {
		circle(rightWristX, rightWristY, 20);
		hp.stop();

		if (songstatusrightWrist == false) {
			pp.play();

			document.getElementById("song_name").innerHTML = "Playing: Peter Pan"
		}
	}
}