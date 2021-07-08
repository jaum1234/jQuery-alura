let tempoInicial =  $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");
const botaoRemover = $(".botao-remover");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    reiniciaJogo();
})

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}

function atualizaTamanhoFrase() {  

    const frase = $(".frase").text();
    const numPalavras = frase.split(" ").length;
    const tamanhoFrase = $("#tamanho-frase");
    
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {  
    campo.on("input", function() {
        const conteudo = campo.val();
        const numPalavrasTextArea = conteudo.split(/\S+/).length -1;
    
        const contadorCaracteres = $("#contador-caracteres");
        contadorCaracteres.text(conteudo.length);
        
        const contadorPalavras = $("#contador-palavras");
        contadorPalavras.text(numPalavrasTextArea);
    });
}

function inicializaMarcadores() {
    campo.on('input', function () {
        const frase = $('.frase').text();
        const digitado = campo.val();
        const comparavel = frase.substr(0, digitado.length)
        
        if (digitado == comparavel) {
            campo.addClass('campo-correto');
            campo.removeClass('campo-errado');
            return;
        }
    
        campo.addClass('campo-errado');
        campo.removeClass('campo-correto');
    })
}



function inicializaCronometro () {  
    campo.one("focus", function() { 
        var tempo = $("#tempo-digitacao").text();
        //todo setInterval retorna seu proprio ID.
        const cronometro = setInterval(function () {
            tempo--;
            $("#tempo-digitacao").text(tempo);
    
            if (tempo < 1) {
                clearInterval(cronometro);
                finalizaJogo();
            }
        }, 1000)

    })
}

function finalizaJogo () {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desabilitado");
    inserePlacar();
}

function reiniciaJogo () {  
    //Eventos usuais tem a propria funcao de atalho.
    $("#botao-reiniciar").click(function() {
        campo.attr("disabled", false);
        campo.val("");
        campo.toggleClass("campo-desabilitado");
        campo.removeClass('campo-correto');
        campo.removeClass('campo-errado');
        
        inicializaCronometro();

        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);

    })
}




    
