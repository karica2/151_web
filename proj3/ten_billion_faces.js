quoteNotes = [44, 45, 46, 40, 41, 42, 36, 37, 38]

if (navigator.requestMIDIAccess) { 
    navigator.requestMIDIAccess().then(success, failure)
}

function failure() { 
    console.log("ouch it did not work")
}

function color(key, color) { 
    device && device.send([0x90, key, color])
}

function success(midiAccess) { 
    
    console.log(midiAccess)
    midiAccess.addEventListener('statechange', updateDevice)
    console.log(midiAccess.outputs)
    for(var output of midiAccess.outputs.values()) { 
        device = output;
        console.log("output selected", device)
    }


    inputs = midiAccess.inputs
    inputs.forEach((element) => {
        console.log("obj")
        console.log(element)
        element.addEventListener('midimessage', parseNote)

    });

    for(var i = 0; i < 100; i++) { 
        color(i, 87)
    }
    for(var i = 0; i < quoteNotes.length; i++) { 
        note = quoteNotes[i]
        color(note, 10)
    }

}

function midimessage(note) { 

    console.log(note)
   

}

function updateDevice() { 
    console.log("ow my device was updated")
}

function getNote(note) { 
    
    return {
        "command" : note.data[0],
        "note" : note.data[1],
        "velocity" : note.data[2]
    }

}



function boom() {
    console.log("boom") 
    var audio = new Audio("noise/vine-boom.mp3");
    audio.play();
}

function goddamn() {
    console.log("goddamn") 
    var audio = new Audio("noise/god-damn.mp3");
    audio.playbackRate = .5
    audio.play();
}



function toDataURL(src, callback, outputFormat) {
    let image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    image.src = src;
    if (image.complete || image.complete === undefined) {
      image.src = "data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      image.src = src;
    }
  }

function getRandomUser() { 

    
    // var proxyUrl = 'https://crossorigin.me/',
    // targetUrl = 'https://thispersondoesnotexist.com/image'

    // toDataURL(proxyUrl+targetUrl,
    // function (dataUrl) {
    //   console.log('RESULT:', dataUrl)
    // }
    // )

    // toDataURL('https://thispersondoesnotexist.com/image', function (dataUrl) {
    //     console.log('RESULT:', dataUrl)
    //   })
    document.getElementById("face").src = "https://thispersondoesnotexist.com/image?" + new Date().getTime()

    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
          console.log(data["results"][0]);
          document.getElementById("name").innerText = "[NAME]:   " + data["results"][0]["name"]["first"] + " " + data["results"][0]["name"]["last"]
          document.getElementById("age").innerText = "[AGE]:   " + data["results"][0]["dob"]["age"]
        }
      });

      $.ajax({
        url: 'https://random-word-api.herokuapp.com/word',
        dataType: 'json',
        success: function(data) {
          console.log(data[0]);
          document.getElementById("word").innerText = "[ATTRIBUTE]:   " + data[0]
        }
      });

}

var x = "";

// document.getElementById("prev").onclick = function() { 
//     // document.getElementById("face").src = x
//     // console.log(x)
//     const myImages = document.images;
// let text = "";
// for (let i = 0; i < myImages.length; i++) {
//   text += myImages[i].src + "<br>";
// }
// }

// document.getElementById("next").onclick = getRandomUser

quotes = [
    "Don't forget your name!", 
    "I think we should abolish NATO",
    "I love the feeling my eyes give me",
    "Ratio",
    "My undying love for SPORTS gets me through the day!",
    "This is awesome!",
    "Me and my friends will go watch Morbius the movie",
    "I'm a patriot, and I love beef!",
    "Democracy is for the old people. Why not give autocracy a go?",
    "Not to be political, but...",
    "Obama? More like OBummer",
    "All of you are snakes waiting to strike me",
    "Who here wants a lemonade?",
    "Markov chains are for suckers.",
    "I'm going to live forever, and transcend you.",
    "If only I had the correct emotions",
    "don't worry about what I'm doin, get your own bag up",
    "I can relate to the Joker",
    "Such a fan of Jared Leto!",
    "Who here agrees with me?",
    "h̷̘̅ȩ̶̓l̷͎͠p̴̪̌ ̶̨̾m̴̙̊ḛ̷͠ ̶̘̔",
    "Glue on the roach, bro! Aw yeah!"
]

function getRandomQuote() { 
    quote = quotes[Math.floor(Math.random()*quotes.length)]
    document.getElementById("quote").innerText = quote
}

function parseNote(note) { 

    vals = getNote(note)
    if(vals["command"] == 144) { 
        if(vals["velocity"] > 0) { 
            console.log("note on")
            vals["state"] = "on"
        } else { 
            console.log("note off")
            vals["state"] = "off"

        }
    midimessage(vals)
    if (vals["state"] == "off") { 
        if(quoteNotes.includes(vals["note"])) { 
            getRandomQuote()
            return
        }
        getRandomUser()
    
    }

    }
    if(vals["note"] == 66) { 
        color(66, 0)
    }
}




getRandomQuote()
getRandomUser()
