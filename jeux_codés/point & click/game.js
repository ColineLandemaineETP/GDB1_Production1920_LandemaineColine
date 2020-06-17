let peintureV2 = $('#peintureV2')
let victoireVar = false
let timer = $('#timer')
let chrono = 5;


function preaload(){
this.load.image('victoire','asset/victoire.png');
this.load.image('defaite','asset/defaite.png');
}

document.getElementById('imageVictoire').style.visibility = "hidden"; //l'élément par son id est récupéré dnas la page (document = page)
document.getElementById('imageDefaite').style.visibility = "hidden";

setInterval(fonctionTimer, 1000);
function fonctionTimer(){
 chrono --;
 timer.html(chrono); 
}

setTimeout(fonctionDefaite, 5000); //en milisecondes

function fonctionDefaite(){
  if (victoireVar == false ){
      document.getElementById('imageDefaite').style.visibility = "visible";
      document.getElementById('main').remove();
      document.getElementById('imageVictoire').remove();
  }
}

peintureV2.on('click',function() {
    document.getElementById('imageVictoire').style.visibility = "visible";
    document.getElementById('main').remove();  
      // solution extrême pour afficher l'écran de victoire... Je n'ai réussi à faire la supperposition de l'image avec le bakground...
      // voici ce que j'ai voulu faire:
            //document.getElementById('imageVictoire').style.visibility = "visible";
            //document.getElementById('imageVictoire').style.position = "absolute";
            //document.getElementById('imageVictoire').style.zIndex= "100";
	})

