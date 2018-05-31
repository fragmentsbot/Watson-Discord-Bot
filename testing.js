//Testing the watson facial recognition api
var watson = require('watson-developer-cloud');
var credentials = require('./credentials');

let ir = new watson.VisualRecognitionV3({
    url: credentials.WatsonKey.url,
    version: credentials.WatsonKey.version,
    iam_apikey: credentials.WatsonKey.iam_apikey
});

//check if food group or people group is in the array:  
function inArr(arr){
    for(item of arr){
        //if this is true then it will ... 
        if(item.class === 'people'){
            console.log("This is a person")
         }
         else if (item.class === 'food'){
             console.log("this is a food")
         }
         else{
             console.log("This is neither a person or a food")
         }
    }
}

//Call back function that executes (main code)
function callback(error, responce){
    let arrObj = [] // array of objects containing class name and score values
    //constructor for objects
    let obj = function(className, score ){
        this.className = className;
        this.score = score;
    }
    if(error){
        console.log(error);
    }
    else{
        //console.log(JSON.stringify(responce, null, 2));
        for(items of responce.images[0].classifiers[0].classes){ 
            //console.log('Things that I see:')
            //console.log(items.class + ' has a score of ' + items.score);
            tempObj = new obj(items.class , items.score);
            arrObj.push(tempObj);
            

        }
        inArr(arrObj);
    }      
}
let detectFaceParam = {
    url: 'https://cdn.discordapp.com/attachments/451094577059987458/451246845256269834/trump.jpg' 
}
//Take url as parameter 
let classifyParam = {
    url: 'https://cdn.discordapp.com/attachments/451094577059987458/451246845256269834/trump.jpg',
    classifier_ids: 'default',
    threshhold: 0.2
}
//function that returns parameter as object
function getParam(link){
    let parameter = {
        url: link,
        classifier_ids: 'default',
        threshhold: 0.2
    }
    
    return parameter; 
}
//make image classifier return a single value, then use that value for the discord.js. 
function imageClassify(link){
    ir.classify(getParam(link) , callback); //function that takes the link as a parameter and performs the callback
    let threshValue = []; // An empty array that will contain the data of the classify function and determing if the keyword people or food exists
    //Do something here with data.If they meet the parameter
    if(true){
        //run second classifier
    }
    else {
        //just print to the screen
    }
}


//ir.detectFaces(detectFaceParam , callback);
imageClassify('http://schwartzplumbingandheating.com/communities/7/000/001/365/787//images/3591705.png');

ir.classify({
    url: 'http://schwartzplumbingandheating.com/communities/7/000/001/365/787//images/3591705.png',
    classifier_ids: 'default',
    threshhold: 0.2

}, function(error, responce){
    if(error){
        console.log(error);
    }else{
        console.log(JSON.stringify(responce, null, 2));
    }
});