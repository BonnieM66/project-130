song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songStatus1 = "";
songStatus2 = "";

function preload() {
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
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
    console.log("posenet is initialized!");
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    songStatus1 = song1.isPlaying();
    console.log(songStatus1);

    fill("#4d9e63");
    stroke("#4d9e63");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        song2.stop();

        if(songStatus1 == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "song playing: harry potter theme song";
        }
    }

    songStatus2 = song2.isPlaying();
    console.log(songStatus1);

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        song1.stop();

        if(songStatus2 == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "song playing: peter pan theme song";
        }
    }

}