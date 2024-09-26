const pantalla = document.querySelector(".pantalla");
const pantalla1 = document.querySelector(".pantalla1");
const botones = document.querySelectorAll(".btn");
let igual = false; 

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if(boton.id === "c"){
            pantalla.textContent = "0";
            pantalla1.textContent = " ";
            return;
        }
        if(boton.id === "ce"){
            pantalla.textContent = "0";
            if(igual === true){
                pantalla1.textContent = " ";
            }
            igual = false;
            return;
        }
        if(boton.id === "borrar" ){
            if(pantalla.textContent.length === 1 || pantalla.textContent === "Error!"){
                pantalla.textContent = "0";
            }else{
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            if(igual){
                pantalla1.textContent = " "
            }
            igual = false;
            return;
        }

        if(boton.id === "suma"){
            if(igual){
                pantalla1.textContent = pantalla.textContent + "+";
                igual = false;
            }else{
                pantalla1.textContent = eval(pantalla1.textContent + pantalla.textContent) + "+"; 
            }
            pantalla.textContent = "0";
            return;
        }

        if(boton.id === "resta"){
            if(igual){
                pantalla1.textContent = pantalla.textContent + "-";
                igual = false;
            }else{
                pantalla1.textContent = eval(pantalla1.textContent + pantalla.textContent) + "-"; 
            }
            pantalla.textContent = "0";
            return;
        }

        if(boton.id === "multi"){
            if(igual){
                pantalla1.textContent = pantalla.textContent + "*";
                igual = false;
            }else{
                pantalla1.textContent = eval(pantalla1.textContent + pantalla.textContent) + "*"; 
            }
            pantalla.textContent = "0";
            return;
        }

        if(boton.id === "multi"){
            if(igual){
                pantalla1.textContent = pantalla.textContent + "*";
                igual = false;
            }else{
                pantalla1.textContent = eval(pantalla1.textContent + pantalla.textContent) + "*"; 
            }
            pantalla.textContent = "0";
            return;
        }

        if(boton.id === "div"){
            if(pantalla.textContent === "0"){
                return; // Evita división por cero
            }
            if(igual){
                pantalla1.textContent = pantalla.textContent + "÷";
                igual = false;
            }else{
                pantalla1.textContent = eval(pantalla1.textContent + pantalla.textContent) + "÷"; 
            }
            pantalla.textContent = "0";
            return;
        }

        if(boton.id === "mod"){
            if(pantalla1.textContent !== ""){ // Solo si ya hay algo en pantalla1
                pantalla.textContent = parseFloat(pantalla.textContent) / 100;
            }else{
                pantalla.textContent = "0";
                pantalla1.textContent = "0";
            }
            return;
        }
        

        if(boton.id === "igual"){
            try {
                igual = true;
                let num = pantalla.textContent;
                pantalla.textContent = eval(pantalla1.textContent.replace(/÷/g, "/") + num);
                pantalla1.textContent = pantalla1.textContent + num + "=";
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }

        if(boton.id === "punto"){
            if(!pantalla.textContent.includes(".")){ // Verifica si ya hay un punto
                pantalla.textContent += ".";
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            pantalla.textContent = botonApretado;
        } else if(igual){
            pantalla1.textContent = "";
            pantalla.textContent = botonApretado;
            igual = false;
        }else {
            pantalla.textContent += botonApretado;
        }
        
    });
});
