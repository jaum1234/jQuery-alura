$("#botao-placar").on("click", mostraPlacar);

function inserePlacar () {
    const corpoTabela = $(".placar").find("tbody");
    const usuario = "Douglas";
    const numPalavras = $("#contador-palavras").text();

    const linha = novaLinha(usuario, numPalavras);
    linha.find('.botao-remover').on("click", removeLinha);

    corpoTabela.append(linha);
    //corpoTabela.prepend adiciona antes

    $('.placar').slideDown(400);
    scrollPlacar();
    
}

function scrollPlacar() {
    const posicaoPlacar = $('.placar').offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha (usuario, palavras) {
    const linha = $("<tr>");

    const colunaUsuario = $("<td>").text(usuario);
    const colunaPalavras = $("<td>").text(palavras);
    const colunaRemover = $("<td>");

    const iconeRemover = $("<i>").addClass("material-icons botao-remover").attr("style", "cursor: pointer; color: red;").text('delete');

    colunaRemover.append(iconeRemover);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;

}

function removeLinha(event) {  
    event.preventDefault();
    const linha = $(this).parent().parent();
    //linha.fadeIn();
    //linha.fadeToggle();
    linha.fadeOut(1000); 
    setTimeout(function () {
        linha.remove();
    }, 1000);
}

function mostraPlacar() {
    //$('.placar').Toggle();
    $('.placar').stop().slideToggle(600);

    //$('.placar').slideDown(600);
    //$('.placar').slideUp(500)
}

