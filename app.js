 

const express = require('express');
const { getColorFromURL } = require('color-thief-node');
 

const pictures = [{
    title: "Me gustaría estar en Dinamarca",
    url: "https://i.picsum.photos/id/41/200/200.jpg?hmac=aqB5SyMLH-ssCBN-7HaUvcDxXFFQB42WoqAHsLRIn74",
    date: "2022-06-06",
    color: ""
},{
    title: "Coche",
    url: "https://i.picsum.photos/id/1071/200/200.jpg?hmac=mb6el6MCnRCyFnuMcCPJppn1WISnV5OKFUqDFg82Joo",
    date: "2021-03-06",
    color: ""

}];

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
var revisor =  false ;


// Informamos que nuestro servidor va a utilizar el sistema de plantillas EJS
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
    // Le pasamos a la vista index.ejs una variable que se llama 'numPics' y cuyo es el número de elementos del array pictures
 

   
    for (var i=0; i<pictures.length; i++) { 
      const dominantColor = await getColorFromURL(pictures[i].url);

      
        pictures[i].color=dominantColor 
    
    }
  

    
    pictures.sort(function (a, b) {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        
      });   
      
 
      if(revisor==false){
         tagline =" ";

      }else{
        tagline ="l'URL ja existeix al nostre magatzem, i per tant, no la podem afegir " ;
      
      }
    res.render("index", {
      
        numPics: pictures.length,
        pictures: pictures,
        tagline: tagline
        
    });
 
     // Buscame la vista 'index.ejs' dentro de la carpeta 'views' y renderiza el contenido como HTML y enviáselo al cliente
});

app.get("/form", (req, res) => {
  //  res.send("Formulario de añadir imagen.");
  res.render("form");

}); 

app.post("/form",async (req, res) => {
    // 1. En el objeto req.body tienes toda la información que te ha enviado el formularo
    const{title,url,date}=req.body;
    

  if( pictures.some(picture => picture.url === url )){
    revisor=true
   // res.redirect('/')
  }  
 
    else{
      revisor=false

       pictures.push({
       title:title,
       url:url,
       date:date

   })
   }
    
   
    res.redirect('/')
    // 3. Mostrar un mensaje al usuario que diga "nueva imagne añadida" o redirigirle usando res.redirect a la página principal
}) 
// La función de callback se ejecutará en el caso que hayamos levantado con éxito el servidor.
app.listen(3000, () => {
    console.log("Servidor funcionando correctamente.");
});
 