let num = 0;
let peintureV = $('#peintureV')
let nombre = $('#nombre')
let victoireVar = false
let timer = $('#timer')
let chrono = 5;

function preload(){
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

peintureV.on('click',function() {
	num ++;
	nombre.html(num);

	if (num == 20){
        document.getElementById('imageVictoire').style.visibility = "visible";
        document.getElementById('main').remove();  
        victoireVar = true;
      // solution extrême pour afficher l'écran de victoire... Je n'ai réussi à faire la supperposition de l'image avec le bakground...
      // voici ce que j'ai voulu faire:
            //document.getElementById('imageVictoire').style.visibility = "visible";
            //document.getElementById('imageVictoire').style.position = "absolute";
            //document.getElementById('imageVictoire').style.zIndex= "100";
	}




})

