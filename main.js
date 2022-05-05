cradles = "";
faded = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = "";
song = "";
song1 = "";
song2 = "";

function preload() {
    cradles = loadSound("Cradles.mp3");
    faded = loadSound("Faded.mp3");
}

function setup(){
    canvas = createCanvas(550,550);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotposes);
}

function gotposes(results){
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreleftWrist = results[0].pose.keypoints[9].score;
    }
}

function modelLoaded(){
    console.log("model is working neat and fine");
}

function draw(){
    image(video,0,0,560,550);

    fill("red");
    stroke("black");
    circle(leftWristX,leftWristY,20);
    
    song1 = cradles.isPlaying();
    song2 = faded.isPlaying();
    console.log(scoreleftwrist);
    if (scoreleftwrist > 0.2) {
       
        song2.stop();
        if (song1 == false) {
            console.log("song1 is playing");
            cradles.play();
            document.getElementById("songNames").innerHtml = "playing crad";
        }
    }
   
}