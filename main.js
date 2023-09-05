img = ""; 
alarm = "mixkit-electric-fence-alert-2969.wav";
Status = "";
objects = "";

function preload()
{
    alarm = play('mixkit-electric-fence-alert-2969.wav');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
  objectDetecter = ml5.objectDetecter('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Baby";
}

function modelLoaded()
{
  console.log("ModelLoaded!")
  Status = true;
}

function gotresult(error, results)
{
  if(error)
  {
    console.log(error);
  }
  console.log(results);

  objects = results; 
}

function Draw()
{
  image(video, 0, 0, 380, 380);

  if(status != "")
  {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetecter.detect(video, gotresult);
    
    for (i = 0; i < Objects.label; i++)
    {
        document.getElementById("status").innerHTML = " Status : Baby Detected";
        stopSound()
        fill(r, g, b);
        percentage = floor(objects[i].confidence * 100);
        text(Objects[i].label + " " + percentage + "%" + objects[i].x + objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x + objects[i].y + objects[i].width + 15 + objects[i].height + 15);
    }
  } else 
  {
     document.getElementById("status").innerHTML = " Status : Baby Not Detected";
     play(alarm);
  }
  if (Objects[i].label < 0)
  {
    document.getElementById("status").innerHTML = " Status : Baby Not Detected";
    play(alarm);
  }
}
