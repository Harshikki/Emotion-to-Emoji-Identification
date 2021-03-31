prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 350,
    image_format: "jpg",
    jpg_quality: 90
});

camera = document.getElementById("camera").innerHTML;
Webcam.attach('#camera');

function takeEmotion(){
    Webcam.snap(function(data_uri) { 
    document.getElementById("emojiResult").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
    });
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1;
    speak_data2 = "The second prediction is" + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function identifyEmotion(){
img = document.getElementById("captured_image");
classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
    if(results[0].label == "happy"){
        document.getElementById("update_emoji").innerHTML = "&#128522";
    }
    if(results[0].label == "sad"){
        document.getElementById("update_emoji").innerHTML = "&#128532";
    }
    if(results[0].label == "angry"){
        document.getElementById("update_emoji").innerHTML = "&#128545";
    }
    if(results[1].label == "happy"){
        document.getElementById("update_emoji2").innerHTML = "&#128522";
    }
    if(results[1].label == "sad"){
        document.getElementById("update_emoji2").innerHTML = "&#128532";
    }
    if(results[1].label == "angry"){
        document.getElementById("update_emoji2").innerHTML = "&#128545";
    }
    }
}