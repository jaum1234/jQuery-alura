$('#troca-frase').on('click', fraseAleatoria);
$('#botao-frase-id').on('click', buscaFrase);
$('#botao-sync').on('click', sincronizaPlacar);


function fraseAleatoria() {
    $('#spinner').show();

    $.get(
        "http://localhost:3000/frases", 
        trocaFraseAleatoria
        ).fail(function () {
            $("#erro").toggle();
            setTimeout(() => {
                $("#erro").toggle();
            }, 2000);   
        }).always(function () {  
            $('#spinner').toggle();
        })
};

function trocaFraseAleatoria(data) {  
    const frase = $('.frase');
    let numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $('#spinner').toggle();
    const fraseId = $("#frase-id").val();
    console.log("Id da minha frase: " + fraseId);
    //precisa necessariamente ser um objeto JS
    const dados = {id: fraseId};

    $.get(
        "http://localhost:3000/frases", 
        dados, 
        trocaFrase
        ).fail(function () {  
            $("#erro").toggle();
            setTimeout(() => {
                $("#erro").toggle();
            }, 2000);  
        }).always(function () {
            $('#spinner').toggle();
        });
}

function trocaFrase(data) {
    const frase = $('.frase');  
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}


