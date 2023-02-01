const number=document.querySelectorAll('.number');
const operator=document.querySelectorAll('.operator')
const result=document.querySelector('.result')
const reset=document.querySelector('.reset')
const del=document.querySelector('.delBtn')
let decimal=document.querySelector('.float')

let body=document.querySelector('body');
let frame=document.querySelector('.frame');
let titleColor=document.querySelector('.changeTheme')
let toggle=document.querySelector('#toggle')

let ecran= document.querySelector('.view');

let enter=0;

//variable intermédiaire pour réaliser le calcul entré
let simpleCalculation;
//je part d'une string généré par les différentes entrer
let allEnter="";

// touche numéroté
number.forEach(num => {
    num.addEventListener('click',()=>{
        
        enter=num.value;
        allEnter+=enter.toString(); 
        ecran.innerHTML=allEnter


    })
});

//touche oppérateur

operator.forEach(op => {
    
    op.addEventListener('click',()=>{
        enter=op.value;
        allEnter+=enter.toString();  

        ecran.innerHTML=allEnter

    })
});

//reload la page
reset.addEventListener('click',()=>{
    // window.location.reload(); // autre méthode mais le thème 
    allEnter="0";
    enter=0;
    ecran.innerHTML=allEnter
    allEnter=" "
})


del.addEventListener('click',()=>{
    //remplacement du dernier caractère par un espace pour pouvoir le supprimmer grâce à trimEnd
   allEnter=allEnter.replace(allEnter[(allEnter.length)-1],' ');
    
    allEnter=allEnter.trimEnd();
    
    ecran.innerHTML=allEnter;
})

// les decimal sont faite par concaténation 
decimal.addEventListener('click',()=>{
   
        enter=decimal.value;
        allEnter+=enter.toString(); 
        ecran.innerHTML=allEnter;

})

//calcul test: 10/2x5+3.2-1=3.2
result.addEventListener('click',()=>{

    
    //je découpe le calcul en commençant par l'ordre de priorité multiplication puis division etc
    let tab =splitMulti(allEnter,["+","-","/"]) 
    // j'élimine les autres opérateurs pour isoler la mutiplication grâce à split 
    // pour générer un tableau tab à partir du quel je récupère l'opération de multiplication grâce ma fonction searchOperation
    
    if(searchOperation(tab,"x")){
        // je place ma fonction en condition pour vérifier si le calcul entré présente une multiplication sinon cela n'empèche pas la suite de la vérification
        let total=multiplication(simpleCalculation)
        // je déclare une variable total qui détermine le résultat final affiché à partir du calcul simple isolé
        allEnter=allEnter.replace(simpleCalculation,total)
    }
    
    tab =splitMulti(allEnter,["+","-"])    
  
    if (searchOperation(tab,"/")) {
        total=division(simpleCalculation)
        allEnter=allEnter.replace(simpleCalculation,total)
        
    }
    
    
    tab=allEnter.split("+");
   
    if (searchOperation(tab,"-")) {
        total=substraction(simpleCalculation)
        allEnter=allEnter.replace(simpleCalculation,total)
        
    }
    

    if (allEnter.indexOf("+")) {
        // après élminition de toutes les autres opérations un simple index0f en condition permet de vérifier si il y a bien une addition entré
        total=sum(allEnter)
    }

    
    ecran.innerHTML=total;
    
})


function searchOperation(tab,typeOperation) {
    simpleCalculation=""; // je vide sytématiquement ma variable 
    for (let index = 0; index < tab.length; index++) {
        if (typeOperation=="x") {
            
            if (tab[index].search("x")>=1){
            
                simpleCalculation+=tab[index]
                
            } 
            
        } else if (typeOperation=="/") {
            
            if (tab[index].search("/")>=1){
            
                simpleCalculation+=tab[index]
                
            } 
            
        }else if (typeOperation=="-") {
            if (tab[index].search("-")>=1){
            
                simpleCalculation+=tab[index]
                
            } 
        }
       
         
    }

    return simpleCalculation;
}

function splitMulti(allEnter, tabOperators){
    let separator = tabOperators[0]; // on garde le premier opérateur entré comme séparateur
    for(let i = 1; i < tabOperators.length; i++){
        // la boucle permet de séparer au fur et à mesure les élément de la string allEnter et de les joindre avec le premier operateur
        allEnter = allEnter.split(tabOperators[i]).join(separator);
    }
    //ici le séparateur vas permettre de séparer tout les éléments comme souhaité
    allEnter = allEnter.split(separator);
    return allEnter;
}


function sum(simpleCalculation) {
   let tab= simpleCalculation.split("+");
   //à partir du calcul simple isolé je sépare de nouveau le calcul pour isoler les nombres dont les floats 
   let res=0; // je déclare un varible qui contiendra le résultat du calcul
   tab.forEach(element => {
    // chaque nombre est initialement considérer comme une string que je transforme en float
    let num=parseFloat(element);
    res+=num; 
   
})


return simpleCalculation , res

}


function substraction(simpleCalculation) {
    let tab= simpleCalculation.split("-");
    let element = tab[0];
    let num=parseFloat(element);
    let res=num;
    
    for (let index = 1; index < tab.length; index++) {
        let el=tab[index];
        res-=el;

        
    }
     

 return simpleCalculation,res
}


function multiplication(simpleCalculation) {
    let tab= simpleCalculation.split("x");

    let element = tab[0];
    let num=parseFloat(element);
    let res=num;
    
    for (let index = 1; index < tab.length; index++) {
        let el=tab[index];
        res*=el;

    }
     


 return simpleCalculation,res }

 function division(simpleCalculation) {
    let tab= simpleCalculation.split("/");
    let element = tab[0];
    let num=parseFloat(element);
    let res=num;
    
    for (let index = 1; index < tab.length; index++) {
        let el=tab[index];
        res/=el;

        
    }
      

 return simpleCalculation,res }



// bouton changement de thème
function changeTheme (e){
    //ciblage de l'événement d'activation du bouton thème
    if(e.target.checked){
            document.querySelector('#theme').innerHTML="sombre";//ajout des termes clair et sombre en fonction de l'activation où non de l'input
            //modification des background color et couleru des textes
            body.style.backgroundColor='#3B4664'
            titleColor.style.color='whitesmoke'
            frame.style.backgroundColor='#252D44'
            ecran.style.backgroundColor='#181F32'
            
        }else{
            document.querySelector('#theme').innerHTML="clair";
            body.style.backgroundColor='#b5bdd4'
            titleColor.style.color='#484D60'
            frame.style.backgroundColor='#4E5F8F'
            ecran.style.backgroundColor='#4E5F8F'
          
            
        }
    }

    toggle.addEventListener('click',(e)=>{
        changeTheme(e)

    })
