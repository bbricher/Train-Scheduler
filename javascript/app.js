var config = {
    apiKey: "AIzaSyDeNXv67qC_lxnBv9tDNqtlRAniUvijdRA",
    authDomain: "train-scheduler-d6a4e.firebaseapp.com",
    databaseURL: "https://train-scheduler-d6a4e.firebaseio.com/",
    storageBucket: "train-scheduler-d6a4e.appspot.com"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
    
    // var trainTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");

    var newTrain = {
        name: trainName,
        des: trainDes,
        time: trainTime,
        freq: trainFreq
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.des);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});