console.log("hi")

// $.ajax({
//     type: "GET",
//     url: "http://api.kanye.rest",
//     dataType: "json",
//     crossDomain: "true",
//     success: function (response) {
//         console.log("it worked")
//         console.log(response)
//         document.getElementById("quote").innerText = response["quote"]
    
//     }
// });

// https://api.wheretheiss.at/v1/satellites/25544
$.ajax({
    type: "GET",
    url: "https://api.wheretheiss.at/v1/satellites/25544",
    dataType: "json",
    crossDomain: "true",
    success: function (response) {
        console.log("it worked")
        console.log(response)
        document.getElementById("quote").innerText = `${response["latitude"]} ${response["longitude"]} `
    
    }
});