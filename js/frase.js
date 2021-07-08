$('#troca-frase').on('click', fraseAleatoria);

function fraseAleatoria() {
    $.get(
        "http://localhost:3000/frases", 
        trocaFraseAleatoria
        ).fail(function () {
            $("#erro").toggle();
            setTimeout(() => {
                $("#erro").toggle();
            }, 2000);   
        });
}

function trocaFraseAleatoria(data) {  
    const frase = $('.frase');
    let numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

