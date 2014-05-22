/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Trash(id, imgSrc, isRecyclable, success, failure){
    
    this.id = id;
    this.imgSrc = imgSrc;
    this.isRecyclable = isRecyclable;
    this.success = success;
    this.failure = failure;
    
    this.appendToElement = function(container){
        var element = $('<img>');
        element.data({
            id: this.id,
            color: this.color,
            isRecyclable: this.isRecyclable,
            success: this.success,
            failure: this.failure
        });
        element.attr('src', this.imgSrc);
        element.attr('id', this.id);
        element.addClass(this.color);
        element.addClass("trash-items");
        element.draggable({
            stack: ".trash-items",
            containment: $(".containment-block"),
            revert: true
        });
        container.append(element);
    };
}


function Recepticle( cssClass, imgSrc, blurb){
    this.cssClass = cssClass;
    this.imgSrc = imgSrc;
    this.blurb = blurb;
    this.defaultBlurb = "Hi, i'm a recepticle";
    
    this.appendToElement = function(container){
        var element = $('<img>');
        element.attr('id', this.id);
        element.attr('src', this.imgSrc);
        element.attr('draggable', "false");
        element.addClass(this.cssClass);
        element.data({
            blurb: this.blurb,
            wasteOrRecycle: this.cssClass
        });
        element.droppable({
             accept: ".trash-items",
             hoverClass: cssClass + "-hover",
             drop: function(event, ui){
                 var isRecyclable = ui.draggable.data().isRecyclable;
                 var draggableData = ui.draggable.data();
                 var droppableData = $(this).data();
                 if((isRecyclable && droppableData.wasteOrRecycle === "recycle") ||
                    (!isRecyclable && droppableData.wasteOrRecycle === "waste")){
                     $("#" + ui.draggable.context.id).remove();
                     if($("#feedback")) $("#feedback").remove();
                     $(".info-box").append('<p id="feedback">' + draggableData.success + '</p>');
                 } else {
                     if($("#feedback")) $("#feedback").remove();
                     $(".info-box").append('<p id="feedback">' + draggableData.failure + '</p>');
                 }
                 
                 
             }
        });
        container.append(element);
    };
}

//TODO top level window polution, break out into it's own "module"
$(document).ready(function(){
    var trashObjects = [
        {
            title: "can",
            imgSrc: "img/tincan.png",
            isRecyclable: true,
            success: "Great job! 13 Aircraft Carriers could be produced from the amount of Aluminum recycled in 2011",
            failure: "Oops! We can recycle that! We could power our TV for 3 hours from the energy saved by recycling 1 can"
        },
        {
            title: "sock",
            imgSrc: "img/old-sock.png",
            isRecyclable: false,
            success: "That's correct! But before you throw it away, check out <a href='http://www.wikihow.com/Recycle-Your-Socks' target='_blank'>these ideas</a>",
            failure: "Ewww!"
        },
        {
            title: "bottle",
            imgSrc: "img/Pet-bottle.svg",
            isRecyclable: true,
            success: "Thats right! Thank you! Because plastic water bottles are shielded from sunlight in landfills, they will not decompose for thousands of years!",
            failure: "You can recycle that! Americans use 2.5 million plastic bottles every hour! Most of them are thrown away!"
        },
        {
            title: "cereal",
            imgSrc: "img/cereal.png",
            isRecyclable: true,
            success: "Good Job! Did you know recycled cardboard only takes 75 percent of the energy needed to make new carboard!",
            failure: "Nope, we can recycle that! Recycling 1 ton of cardboard saves 9 cubic yards of landfill space and 46 gallons of oil!"
        },
        {
            title: "scraps",
            imgSrc: "img/scraps.png",
            isRecyclable: false,
            success: "That's correct! But don't forget that you could compost or put some of that in the yard waste! Check your local rules! ",
            failure: "You can't recycle that, but you could compost it!"
        }
    ];
    
    for(var trash in trashObjects){
        var item = trashObjects[trash];
        var trashObject = new Trash(item.title, item.imgSrc, item.isRecyclable, item.success, item.failure);
        trashObject.appendToElement($(".garbage-blocks"));
    }
    
      var recepticalObjects = [
        {
            cssClass: "waste",
            imgSrc: "img/trash-bin.png",
            blurb: "Waste Can"
        },
        {
            cssClass: "recycle",
            imgSrc: "img/recycle-icon.png",
            blurb: "Recycle Bin"
        }
    ];
    
    for(var receptical in recepticalObjects){
        var item = recepticalObjects[receptical];
        var recepticalObject = new Recepticle(item.cssClass, item.imgSrc, item.blurb);
        recepticalObject.appendToElement($(".garbage-recepticles"));
    }
});
