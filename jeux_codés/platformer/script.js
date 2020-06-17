var config = {
	type: Phaser.AUTO,
	width: 720,
	height: 1280,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },  
            debug: true 
        }
    },
	scene: {
		preload: preload,
		create: create,
		update: update
	}

};

var game = new Phaser.Game(config);

	var platforms;
	var player;
	var cursor;
	var peintureC;
	var victoire;
	var defaite;

// aller chercher les assets dans le dossier

function preload(){
	this.load.image('background','asset/platformerBackground.png');
	this.load.image('platform1','asset/platform1.png');
	this.load.image('platform2','asset/platform2.png');	
	this.load.image('objectif','asset/peintureC.png');
	this.load.spritesheet('perso','asset/majSprite.png',{frameWidth: 119.4, frameHeight: 182});
	this.load.image('victoire','asset/victoire.png');
	this.load.image('defaite','asset/defaite.png');

	
}

//charger les assets 

function create(){
	this.add.image(0, 0, 'background').setOrigin(0, 0);

    //emplacement des platforms
	platforms = this.physics.add.staticGroup();
	platforms.create(150,1150,'platform1').setScale(1).refreshBody();       //refreshbody: permet de régler la hitbox par rapport à l'asset
	platforms.create(575,1100,'platform2').setScale(1).refreshBody();

	//emplacement de l'objectif peintureC
	peintureC = this.physics.add.sprite(650,745,'objectif'); 
	this.physics.add.collider(peintureC,platforms);    //permet à l'objet de ne pas traverser
    
    //emplacement du personnage 
    player = this.physics.add.sprite(45,870,'perso'); //endroit ou le personnage spawn
	player.setCollideWorldBounds(true);
	player.setBounce(0);   //pas de rebondissement
	player.body.setGravityY(100);
	this.physics.add.collider(player,platforms);
	cursor = this.input.keyboard.createCursorKeys();
	this.physics.add.collider(player, peintureC, hitpeintureC, null, this);

	//fram du personnage selon la direction
	this.anims.create({
		key:'right',        //Input 1
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 5}),
		frameRate: 10,
		repeat: -1
	});

    this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 6, end: 6}),
		frameRate: 20,
		repeat: -1
	});

	this.anims.create({
		key:'jump',       //Input 2
		frames: this.anims.generateFrameNumbers('perso', {start: 1, end: 1}),
		frameRate: 20,
		repeat: -1
	});
 

}

function hitpeintureC (player, peintureC){             
   this.add.image(0, 0, 'victoire').setOrigin(0, 0);
}


function update (){

    //animation du déplacement
	if (player.body.touching.down)
	    {
	        if(cursor.left.isDown){
	            player.anims.play('right',true);
	            player.setVelocityX(-350);                    //if-Else "soit je vais à droite, 
	            player.setFlipX(true);                       //soit à gauche ou je stop".
	        }
	        else if(cursor.right.isDown) {
	            player.anims.play('right',true);
	            player.setVelocityX(350);
	            player.setFlipX(false);
	        }
	        else {
	            player.anims.play('stop',true);                        //x: coordonées hori
	            player.setVelocityX(0);                                //y: coordonées verti
	        } 
	    }

	    else
	    {
	        if(cursor.left.isDown){          //En l'air, changer de direction
	            player.setVelocityX(-350);   // sans changer l'animation du saut                 
	            player.setFlipX(true);                       
	        }
	        else if(cursor.right.isDown) {
	            player.setVelocityX(350);
	            player.setFlipX(false);
	        }
	        else {
	            player.setVelocityX(0);
	        } 
	    }

        //animation du saut
        if(cursor.up.isDown && player.body.touching.down){
	        player.setVelocityY(-350);  //hauteur du saut, plus les chiffres sont petits, moins le perso sautera haut
	        player.anims.play('jump',true);    //animation du saut
	    }

	    if(cursor.down.isDown){
	        player.setVelocityY(500); //vitesse à laquelle le perso retombe avec la touche du bas
	    }
    
	
}
