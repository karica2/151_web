
function setTerm(x, text) {

    document.getElementById("terminal_label").innerText = text.substring(0, x);
    var element = document.getElementById("terminal");
    element.scrollTop = element.scrollHeight;

}

// I did not write this setIntervalX code. It was taken from:
// https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
// from user Daniel Vassallo. all credit goes to the author

function setIntervalX(callback, delay, repetitions, t) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback(x, t);

       if (++x === repetitions) {
           window.clearInterval(intervalID);
           current = gameStates[currentGameState]

           document.getElementById("choice1").innerText = "[1] >  " + current.choice1Label
           document.getElementById("choice2").innerText = "[2] >  " + current.choice2Label  
           document.getElementById("choice1").disabled = false;
           document.getElementById("choice2").disabled = false;
       }
    }, delay);
}

let currentGameState = "prelude"

let money = 2.0


prelude = { 
    prompt: "You suddenly come to. It's 3PM on a warm, humid summer saturday. Your cilantro plug is out of town this week, so you bought your cilantro from a nearby wizard-like figure who offered you a sizeable discount. Only after you used the wizard cilantro did you realize you made a fatal mistake! That wizard selling cilantro was EVIL!\nLuckily, your hair didn't fall out as a result, but something feels off. No matter - You feel the primal urge to walk to the store and get snacks. ",
    choice1Label : "Walk to the store",
    choice1: function() { 
        currentGameState = "intro"
    }, 
    choice2Label : "Walk to the store",
    choice2: function() { 
        currentGameState = "intro"
    }
}

introGS = { 
    prompt: "You suddenly come to. It's 3PM on a warm, humid summer saturday. Your cilantro plug is out of town this week, so you bought your cilantro from a nearby wizard-like figure who offered you a sizeable discount. Only after you used the wizard cilantro did you realize you made a fatal mistake! That wizard selling cilantro was EVIL!\nLuckily, your hair didn't fall out as a result, but something feels off. No matter - You feel the primal urge to walk to the store and get snacks. ",
    choice1Label : "Walk to the store",
    choice1: function() { 
        currentGameState = "onWalk"
    }, 
    choice2Label : "Walk to the store",
    choice2: function() { 
        currentGameState = "onWalk"
    }
}
onWalkGS = { 
    prompt: "Leaving the house, you stroll through your neighborhood, lush with summer leaves and to the chirping of a thousand cicadas. On your way, you find a small anthill. You've seen many anthills before, but this one seems... magical. ",
    
    choice1Label : "Stare at the anthill",
    choice1: function() { 
        currentGameState = "anthillStare"
    }, 
    choice2Label : "Continue on your walk to the store",
    choice2: function() { 
        currentGameState = "outsideStore"
    }
}

anthillStareGS = { 
    prompt: "You stare at the anthill, entranced. The tiny little ants run around with an incredible order and flow. You hope that one day, you can be as efficient as an ant. ",
    choice1Label : "Keep staring at the anthill",
    choice1: function() { 
        console.log("choice 1 for anthill")
        currentGameState = "antKingRequest"
    }, 
    choice2Label : "Continue on your walk to the store",
    choice2: function() { 
        console.log("choice 2 for anthill")
        currentGameState = "outsideStore"
    }
}

antKingRequest = { 
    prompt: " \"Heed my request, titan!\", you hear in a very faint voice. You look even closer at the anthill, where the queen ant seems to be addressing you. \"We require the services of a titan your size, for something not even us ants can do\", says the queen. The queen beckons to a discarded wrapper for a Black N' Mild cigarillo. \"The last titan to cross this valley dropped this wrapper on our colony, but we cannot bear to move it because it smells terrible. If you could dispose of the wrapper far away from our colony, we will reward you with our titanic treasure.\" ",
    choice1Label : "Pick up the wrapper and throw it away",
    choice1: function() { 
        currentGameState = "antKingReward"
    }, 
    choice2Label : "Refuse their request and continue to the store",
    choice2: function() { 
        currentGameState = "outsideStore"
    }
}


antKingReward = { 
    prompt: "The ants cheer and flourish as you move the Black N' Mild wrapper away from their territory into a nearby trash can. Upon your return, the queen presents you with their greatest boon: two shiny quarters. Your value has gone up! You have $2.50 for snacks instead of just $2.",
    choice1Label : "Take their bounty and continue to the store",
    choice1: function() {
        money += .5
        document.getElementById("money").innerText = " [$] You have: $" + money
        currentGameState = "outsideStore"
    }, 
    choice2Label : "Take their bounty and continue to the store",
    choice2: function() { 
        currentGameState = "outsideStore"
    }
}

outsideOfStoreGS = { 
    prompt: "Finally, you've arrived at Özgür's Sustenance, a convienience store in your neighborhood. Outside of the store stands a rust-colored goblin, standing as tall as the door handle, playing with a yo-yo. When it spots you, it blurts out the only three words it knows: ROCK PAPER SCISSORS?!?!?!?!? Unfazed, you look at the goblin. ",
    choice1Label : "Play rock-paper-scissors with the goblin",
    choice1: function() { 
        console.log("choice 1 for outsideOfStore")
        currentGameState = "goblinRPS"
    }, 
    choice2Label : "Ignore the goblin and enter the store",
    choice2: function() {
        currentGameState = "storeSelectItem" 
        console.log("choice 2 for outsideOfStore")
    }
}

goblinRPS = { 
    prompt: "You've agreed to a rock-paper-scissors game with the goblin, and the stakes have never been higher. You notice that as it attempts to form the word 'GO!', it's primary hand makes a flattening motion, closely resembling the signal for Paper. Is he bluffing? If he is, you can go for rock, but if he's not, you can beat him with scissors. Is this goblin smart enough for a feint, or is he just too excited to play properly? ",
    choice1Label : "Play Rock ◼ ",
    choice1: function() {
        currentGameState = "goblinLose" 
    }, 
    choice2Label : "Play Scissors ✂️ ",
    choice2: function() {
        money += .25
        document.getElementById("money").innerText = "  [$] You have: $" + money
        currentGameState = "goblinWin"
    }
}

goblinLose = { 
    prompt: "\"ROCK! PAPER! SCISSORS!\", you both chant as you play Rock and the goblin plays... paper. Did you seriously just get beaten by a goblin that can say 3 words, at max? Damn. Luckily, he seems to live for the thrill of the game, and doesn't want anything for winning. ",
    choice1Label : "Go into the store (You just got beaten by a goblin)",
    choice1: function() {
        currentGameState = "storeSelectItem" 
    }, 
    choice2Label : "Go into the store (You still got beaten by a goblin)",
    choice2: function() { 
        currentGameState = "storeSelectItem" 

    }
}

goblinWin = { 
    prompt: `\"ROCK! PAPER! SCISSORS!\", you both chant as you play Rock and the goblin plays... paper! Right, there's no way that creature was smart enough to pull off a feint. The goblin yelps in excitement, even in loss. What a good sportsman. He hands you his prize, a quarter! Now you have $.25 more to spend on snacks. ` ,
    choice1Label : "Go into the store, victorious. ",
    choice1: function() {
        currentGameState = "storeSelectItem" 

    }, 
    choice2Label : "Go into the store, victorious. ",
    choice2: function() { 
        currentGameState = "storeSelectItem" 

    }
}

storeSelectItem = { 
    prompt: "You enter Özgür's Sustenance, and the shopkeep, Özgür, greets you. \"Hello, Hubert. Long time no see!\". You manage to mumble back a response while shambling over to the snacks. You can't help but think thoughts like, \"Why am I named Hubert?\", and \"My life sure would be better if I wasn't named Hubert\". Even though you have a fair bit of money(the economy is good right now), you are limited to either one big snack or two small snacks. ",
    choice1Label : "One big snack ",
    choice1: function() {
        currentGameState = "oneBigSnack" 
    }, 
    choice2Label : "Two small snacks ",
    choice2: function() { 
        currentGameState = "twoSmallSnacks"
    }
}
oneBigSnack = { 
    prompt: "A big snack sounds good. Özgür is not known for his well-stocked store, however -- he only has 4 large snack types available, divided into Chips and Baked Goods. ",
    choice1Label : "Get a bag of chips ",
    choice1: function() {
        currentGameState = "bagOfChips" 
    }, 
    choice2Label : "Get a baked good ",
    choice2: function() { 
        currentGameState = "bakedGood"
    }
}
bagOfChips = { 
    prompt: "Özgür's chip selection includes Geist-Blessed Crisps and Takis. Those Geist-Blessed Crisps look pretty good, but Takis are just so addicting for some reason. That red dye they use probably will give cancer eventually, but it's so worth it. ",
    choice1Label : "Get Geist-Blessed Crisps ",
    choice1: function() {
        currentGameState = "checkoutItems" 
        if(money > 2) { 
            currentGameState = "checkoutRich"
        }
    }, 
    choice2Label : "Get Takis ",
    choice2: function() { 
        currentGameState = "checkoutItems"
        if(money > 2) { 
            currentGameState = "checkoutRich"
        }
    }
}

bakedGood = { 
    prompt: "Özgür's baked goods selection includes Blueberry muffins and Trapped-Soul Tiramisu. Both are freshly baked. Thank you, Özgür! ",
    choice1Label : "Get Blueberry Muffin ",
    choice1: function() {
        currentGameState = "checkoutItems" 
        if(money > 2) { 
            currentGameState = "checkoutRich"
        }
    }, 
    choice2Label : "Get Trapped-Soul Tiramisu ",
    choice2: function() { 
        currentGameState = "checkoutItems"
        if(money > 2) { 
            currentGameState = "checkoutRich"
        }
    }
}



twoSmallSnacks = { 
    prompt: "Two small snacks sound good. Özgür is not known for his well-stocked store, however -- he only has 4 small snack types available, divided into Candies and Chocolates. ",
    choice1Label : "Get first snack ",
    choice1: function() {
        currentGameState = "candies" 
    }, 
    choice2Label : "Get first snack ",
    choice2: function() { 
        currentGameState = "candies"
    }
}

candies = { 
    prompt: "Özgür keeps two types of candies on the shelf- Butterscotch and Dragon Scale Taffy. The Dragon Scale Taffy is good, but terrible for your teeth. They probably don't use real dragon scales. ",
    choice1Label : "Butterscotch ",
    choice1: function() {
        currentGameState = "chocolates" 
    }, 
    choice2Label : "Dragon Scale taffy ",
    choice2: function() { 
        currentGameState = "chocolates"
    }
}

chocolates = { 
    prompt: "What Özgür lacks in variety, he makes up in rare items. His chocolate selection includes Heath bars and M&M's (Lost-Soul flavored). How come you can only find Heath bars come halloween? Sigh. ",
    choice1Label : "Get Heath bar ",
    choice1: function() {
        currentGameState = "checkoutItems" 
        if(money > 2) { 
            currentGameState = "checkoutRich"
        }
    }, 
    choice2Label : "Get M&M's (Lost-Soul flavored)",
    choice2: function() { 
        currentGameState = "checkoutItems"
        if(money > 2) { 
            currentGameState = "checkoutRich"
        }
    }
}

checkoutRich = { 
    prompt: "You make your way up to the checkout counter. \"Would you like to donate 25 cents to the Özgür relief fund? It's not a noble cause. I just want a vacation.\" You hand him your item(s) and ponder. ",
    choice1Label : "Donate $0.25",
    choice1: function() {
        currentGameState = "donate" 
        money -= 2.25
    }, 
    choice2Label : "Yeah I'm still gonna donate $0.25 because Özgür is awesome ",
    choice2: function() { 
        currentGameState = "donate"
        money -= 2.25
    }
}
checkoutItems = { 
    prompt: "You make your way up to the checkout counter. You hand him your item(s) and watch him scan. Today wasn't too bad of a day. ",
    choice1Label : "Take your items and leave",
    choice1: function() {
        currentGameState = "bounce" 
        money -= 2
    }, 
    choice2Label : "Take your items and leave ",
    choice2: function() { 
        currentGameState = "bounce"
        money -= 2
    }
}

donate = { 
    prompt: "\"Thank you, my friend!\" Bellows Özgür. As a token of his appreciation for your continued patronage, he hands you a small piece of Baklava from behind the counter. He smiles. \"On the house.\".  ",
    choice1Label : "Thank you, Özgür! <Take items and leave>",
    choice1: function() {
        currentGameState = "bounce" 
    }, 
    choice2Label : "Thank you, Özgür! <Take items and leave>",
    choice2: function() { 
        currentGameState = "bounce"
    }
}

bounce = { 
    prompt: "You take your items and leave, and even say goodbye to the goblin outside, happily playing with his Yo-Yo. On your walk home, you smile, knowing that had an alright day. That Evil Wizard Cilantro you used turned out to be pretty benign. You eat your snacks and enjoy the rest of your summer day. ",
    choice1Label : "thanks for playing!",
    choice1: function() {
        currentGameState = "bounce" 
    }, 
    choice2Label : "made by kenan arica for ART151",
    choice2: function() { 
        currentGameState = "bounce"
    }
}



gameStates  = {
    "prelude" : prelude,
    "intro" : introGS,
    "onWalk" : onWalkGS,
    "anthillStare" : anthillStareGS,
    "antKingRequest" : antKingRequest,
    "antKingReward" : antKingReward,
    "outsideStore": outsideOfStoreGS,
    "storeSelectItem" : storeSelectItem,
    "goblinRPS" : goblinRPS,
    "goblinWin" : goblinWin,
    "goblinLose" : goblinLose,
    "oneBigSnack" : oneBigSnack,
    "twoSmallSnacks" : twoSmallSnacks,
    "bagOfChips" : bagOfChips,
    "bakedGood" : bakedGood,
    "candies" : candies,
    "chocolates" : chocolates,
    "checkoutItems" : checkoutItems,
    "checkoutRich" : checkoutRich,
    "donate" : donate,
    "bounce" : bounce
}


// setIntervalX(setTerm, 10, lorem.length, lorem)
// gameloop()

function applyGameState(choiceNum) { 
    console.log("current gameState: " +  currentGameState)

    current = gameStates[currentGameState]


    if (choiceNum == 1) { 
        console.log("running choice1 for " + currentGameState)
        current.choice1()
        // set next gamestate key here
    }
    else if (choiceNum == 2) { 
        // set next gamestate key here
        console.log("running choice2 for " + currentGameState)
        current.choice2()
    }
    document.getElementById("money").innerText = "[$] You have: $" + money
    current = gameStates[currentGameState]
    setIntervalX(setTerm, 30, current.prompt.length, current.prompt)
    
    // document.getElementById("choice1").innerText = "[1] >  " + current.choice1Label
    // document.getElementById("choice2").innerText = "[2] >  " + current.choice2Label   
    
}

document.getElementById("choice1").addEventListener("click", function() {
    console.log("CHOICE1 button press")
    applyGameState(1)

    document.getElementById("choice1").innerText = ""
    document.getElementById("choice2").innerText = ""
    document.getElementById("choice1").disabled = true;
    document.getElementById("choice2").disabled = true;
  
});

  document.getElementById("choice2").addEventListener("click", function() {
    console.log("CHOICE2 button press")
    applyGameState(2)
  
    document.getElementById("choice1").innerText = ""
    document.getElementById("choice2").innerText = ""
    document.getElementById("choice1").disabled = true;
    document.getElementById("choice2").disabled = true;

     
  
});

applyGameState(1)


// for some reason, onWalkGS always defaults to anthillStare. I can't figure out why