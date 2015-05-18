window.addEventListener("load", function(){
$("#button").on("click", function(){
  $("#button img").hide();
  var round = new Round();
  round.blink();
});
var Round = function() {
  this.round = 0;
  this.showingArray = [];
  this.$arrayColors = $(".colors div");
  this.clickedArray = [];
  this.matched = false;
  this.$arrayColors.on("click",this.click.bind(this));
};
Round.prototype.blink = function() {
  this.round += 1;
  $("#round h3").text("Round");
  $("#round p").text(this.round);
  $("#round").appendTo("#button");
  $("#round").show();
  $(".message").empty();
  this.randomNumber = Math.floor(Math.random()*4);
  this.showingArray.push(this.$arrayColors[this.randomNumber]);
  var shine = function(randomColor, i){
    setTimeout(function(){
      highlight(randomColor);
    }, (600*i));
  };
  for (var i = 0; i < this.showingArray.length; i++){
    var randomColor = this.showingArray[i];
    shine(randomColor, i);
  }
};
Round.prototype.click = function(event) {
  var pressed = event.target;
  press(pressed);
  this.clickedArray.push(event.target);
  this.check();
  if (this.matched) {
    this.next();
  }
 };

Round.prototype.check = function() {
  for (var i = 0; i < this.clickedArray.length; i++) {
    this.matched = false;
    if (this.showingArray[i] !== this.clickedArray[i]) {
      this.matched = false;
      this.showingArray = [];
      this.lost();
      this.round = 1;
      $("#round h3").empty();
      $("#round p").empty();
      break;
    }
    else if (this.showingArray.length === this.clickedArray.length && this.showingArray[(this.showingArray.length-1)] === this.clickedArray[(this.clickedArray.length-1)]) {
      this.clickedArray = [];
      this.matched = true;
    }
  }
};
Round.prototype.next = function() {
  var boundBlink = this.blink.bind(this);
    setTimeout(boundBlink, 1000);
};
Round.prototype.lost = function() {
  var roundCompleteness = "\n You completed " + this.round + " round(s)";
  $(".message").append("Oops, you lost" + "<br>"+ roundCompleteness);
  this.$arrayColors.off("click");
  $("#blur").show("fast");
  $("#message").show("slow");
  $(".close").on("click", function() {
    $("#message").hide("slow");
    $("#blur").hide("fast");
  });
  $("#round").hide();
  $("#button img").show();
};

var highlight = function(randomColor){
  if ($(randomColor).is("#green")) {
    $("#green").animate({"marginLeft" : "-=10px", "marginTop" : "-=10px"}, "fast");
    $("#green").animate({"marginLeft" : "+=10px", "marginTop" : "+=10px"}, "fast");
  }
  else if ($(randomColor).is("#blue")) {
    $("#blue").animate({"left" : "+=10px", "marginTop" : "-=10px"}, "fast");
    $("#blue").animate({"left" : "-=10px", "marginTop" : "+=10px"}, "fast");
    }
  else if ($(randomColor).is("#red")) {
    $("#red").animate({"marginLeft" : "-=10px", "top" : "+=10px"}, "fast");
    $("#red").animate({"marginLeft" : "+=10px", "top" : "-=10px"}, "fast");
  }
  else if ($(randomColor).is("#yellow")){
    $("#yellow").animate({"left" : "+=10px", "top" : "+=10px"}, "fast");
    $("#yellow").animate({"left" : "-=10px", "top" : "-=10px"}, "fast");
  }
};
var press = function(pressed) {
  $(pressed).animate({boxShadow: "-3px 3px 3px -1px rgba(100,100,100,1)"},50);
  $(pressed).animate({boxShadow: "-3px 3px 6px 3px rgba(100,100,100,1)"}, 50);
};

$("#button").on("click",function(){
  $("button").animate({boxShadow: "box-shadow: inset 0px 0px 18px 5px rgba(179,175,179,1);"});
});
});




