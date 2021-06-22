const tempoInicial =  $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    reiniciaJogo();
})

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
    const frase = $('.frase').text();
    campo.on('input', function () {
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

function inserePlacar () {
    const corpoTabela = $(".placar").find("tbody");
    const usuario = "Douglas";
    const numPalavras = $("#contador-palavras").text();

    const linha = "<tr>" + 
                    "<td>" + usuario + "</td>" +
                    "<td>" + numPalavras + "</td>" +
                  "</tr>";

    corpoTabela.append(linha);
    //corpoTabela.prepend adiciona antes
    
}

function inicializaCronometro () {  
    var tempo = $("#tempo-digitacao").text();
    campo.one("focus", function() { 
        //todo setInterval retorna seu proprio ID.
        const cronometro = setInterval(function() {
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
    
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);

        inicializaCronometro();
    })

}
    
