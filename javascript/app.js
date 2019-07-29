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
    var trainTime = moment($("#time-input").val().trim(), "LT").format("X");
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

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val()); 

    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().des;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName);
    console.log(trainDes);
    console.log(trainTime);
    console.log(trainFreq);


    var now = moment();
    console.log(now);

    var trainTimeMoment = moment(trainTime, "X");

    var trainMin = now.diff((trainTimeMoment), "minutes");

    if (trainTime === now){
        var trainTime = "";
        var trainTime = trainTime + trainFreq;
    } else {
        var trainTime = trainTime;
    };


    console.log(trainMin);

    var trainTimePretty = moment.unix(trainTime).format("LT");
    console.log(trainTimePretty);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDes),
        $("<td>").text(trainFreq),
        $("<td>").text(trainTimePretty),
        $("<td>").text(trainMin),
      );
    
    $("#train-table > tbody").append(newRow);



});