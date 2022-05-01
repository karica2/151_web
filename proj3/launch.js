console.log("launch.js teehee")

console.log(navigator)

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

    // for(var i = 0; i < 128; i++) { 
    //     color(i, i)
    // }
    color(64, 124)
}

function midimessage(note) { 

    console.log(note)
    document.getElementById("num1").innerText = note["command"]
    document.getElementById("num2").innerText = note["note"]
    document.getElementById("num3").innerText = note["state"]

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
    if (vals["note"] == 64 && vals["state"] == "off") { 
        boom()
    }
    if (vals["note"] == 65 && vals["state"] == "off") { 
        goddamn()
    }
    }
    if(vals["note"] == 66) { 
        color(66, 0)
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


getRandomUser()