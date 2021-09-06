
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage=(src,callback)=>{
let img = document.createElement("img");
img.onload=()=>callback(img);
img.src=src;
};

let imagePath =(frameNumber,animation)=>{
return "Images/"+animation+"/" + frameNumber+".png";
};

let frames={
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7]
};

let loadImages =(callback)=>{
    let images={idle:[],kick:[],punch:[]};
    let imagesToLoad =0;
    // call back with array of images 
     ["idle","kick","punch"].forEach((animation)=>{ 
         let animationFrames = frames[animation];
         imagesToLoad = imagesToLoad+ animationFrames.length;
         animationFrames.forEach((frameNumber)=>{
            let path = imagePath(frameNumber,animation);


    loadImage(path,(image)=>{
    
    images[animation][frameNumber-1]=image;
    imagesToLoad = imagesToLoad-1;
    
    if(imagesToLoad===0){
        callback(images);
    }
    });
    });
 });

};
let animate=(ctx,images,animation, callback)=>{
    images[animation].forEach((image,index)=> {
        setTimeout (()=> {
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,500,500); 
        },index *100);
       
        } );
setTimeout(callback,images[animation].length*100);

};
 loadImages((images)=> {
   let queuedAnimations=[];
   let aux=()=>{
   let selectedAnimation;

   if(queuedAnimations.length===0){
       selectedAnimation="idle"
   }
   else {
       selectedAnimation=queuedAnimations.shift();

   }
        animate(ctx,images,selectedAnimation,aux);
     };
aux();
document.getElementById("kick").onclick=()=>{
   queuedAnimations.push("kick");
};
document.getElementById("punch").onclick=()=>{
    queuedAnimations.push("punch");
};
 });
