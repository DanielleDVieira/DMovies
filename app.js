const TMDB_ENDPOINT_BASE = "https://api.themoviedb.org/3";

//Função que cria os cards dos filmes
function MostraFilmesEmCartaz() {
  //Executar requisição AJAX

  $.ajax({
    //Passar a URL ENDPOINT BASE + /movie/now_playing
    url: TMDB_ENDPOINT_BASE + "/movie/now_playing?language=pt-BR&page=1",
    data: {
      api_key: "7a0c9e357411651e94a8de997d760bca",
    },
  })
    //Receber o JSON
    .done(function (data) {
      let codigo_html = "";

      //Montar os cards
      for (i = 0; i < data.results.length; i++) {
        //Concatenar o código do Card com os dados do JSON
        titulo = data.results[i].title;
        imagem =
          "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
        descricao = data.results[i].overview;
        id = data.results[i].id;
        lancamento = data.results[i].release_date;

        codigo_html += `<div class="card" style="width: 18rem;">
                        <img src="${imagem}" class="card-img-top" alt="${titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <p class="card-text">${descricao}</p>
                            <p>Data de Lançamento: ${lancamento}</p>
                            <a href="https://www.themoviedb.org/movie/${id}" class="btn btn-primary">Acesse</a>
                        </div>
                        </div>`;
      }

      //Repassar os cards para a página
      $("#lista_filmes").html(codigo_html);
    });
}

function PesquisaFilmes(e) {
  e.preventDefault();
  value = document.getElementById("search_pesquisa").value;
  console.log(value);
  //Executar requisição AJAX

  $.ajax({
    //Passar a URL ENDPOINT BASE + /search/movie
    url: TMDB_ENDPOINT_BASE + "/search/movie?language=pt-BR",
    data: {
      api_key: "7a0c9e357411651e94a8de997d760bca",
      query: `${value}`,
    },
  }).done(function (data) {
    let codigo_html = "";

    //Montar os cards
    for (i = 0; i < data.results.length; i++) {
      //Concatenar o código do Card com os dados do JSON
      titulo = data.results[i].title;
      imagem = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path;
      descricao = data.results[i].overview;
      id = data.results[i].id;
      lancamento = data.results[i].release_date;

      codigo_html += `<div class="card" style="width: 18rem;">
                        <img src="${imagem}" class="card-img-top" alt="${titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5>
                            <p class="card-text">${descricao}</p>
                            <p>Data de Lançamento: ${lancamento}</p>
                            <a href="https://www.themoviedb.org/movie/${id}" class="btn btn-primary">Acesse</a>
                        </div>
                        </div>`;
    }

    //Repassar os cards para a página
    $("#lista_filmes").html(codigo_html);
  });
}

$(document).ready(function () {
  MostraFilmesEmCartaz();
  $("#btn_Pesquisar").click(PesquisaFilmes);
});
