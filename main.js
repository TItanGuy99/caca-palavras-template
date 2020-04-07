/// Marca/desmarca elemento clicado 
function clickElement() {
    if (event.target.classList.contains("unmarkBackground")) {
        event.target.classList.remove("unmarkBackground");
        event.target.classList.add("markBackground");
    } else {
        event.target.classList.add("unmarkBackground");
        event.target.classList.remove("markBackground");
    }
}

/// Randomiza letras nas caixas 
function getLetter() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
}

/// Verifica resposta final
function checkAnswers() {
    let total_answers = document.querySelectorAll("[isanswer='true']").length;
    let my_answers = document.querySelectorAll(".markBackground").length;

    if (total_answers === my_answers) {
        console.log("Sucesso!");
    } else {
        console.log("Errado!");
    }
}

/// Carrega Json e atribui valores corretos nas caixas
function loadJson() {
    fetch('http://localhost:3000/configuracoes')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            let html = "";
            let i, j = 0;

            for (i = 0; i < data[0].linhas; i++) {
                html += "<tr>";

                for (j = 0; j < data[0].colunas; j++) {
                    html += "<td onclick='clickElement()' class='unmarkBackground' id='" + i + "-" + j + "' isanswer='false'>" + getLetter() + "</td>";
                }

                html += "</tr>";
            }

            document.getElementById("MainTable").innerHTML = html;

            for (i = 1; i < data.length; i++) {
                let wordLength = data[i].palavra.length;
                let startPosition = data[i].coluna;
                let endPosition = startPosition + wordLength;
                let currentElement;
                let count = 0;

                for (j = startPosition; j < endPosition; j++) {

                    if (data[i].posicao === "horizontal") {
                        currentElement = document.getElementById(data[i].linha + "-" + j);
                        currentElement.innerHTML = data[i].palavra[count];
                        currentElement.setAttribute("isanswer", "true");
                        console.log(currentElement);
                    } else {
                        currentElement = document.getElementById(j + "-" + startPosition);
                        currentElement.innerHTML = data[i].palavra[count];
                        currentElement.setAttribute("isanswer", "true");
                        console.log(currentElement);
                    }

                    count++;
                }
            }
        })
}

/// Carrega Json
loadJson();