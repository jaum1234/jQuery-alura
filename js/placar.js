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

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function () {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        
        const score = {
            usuario: usuario,
            pontos: palavras
        };
    
        placar.push(score);
    
        
    });

    const dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados,
        function () {
            console.log("Salvou o placar no servidor");
        },
    );
}

function atualizaPlacar() {  
    $.get("http://localhost:3000/placar", function (data) {
            $(data).each(function () {
                const linha = novaLinha(this.usuario, this.pontos);
                linha.find('.botao-remover').on("click", removeLinha);
                $("tbody").append(linha);
            })
        }
    );
}

