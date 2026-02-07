document.addEventListener('DOMContentLoaded', function () {
   
    const chaveStorage = "painel_recados";
    const maxNotas = 20;

    const noteInput = document.getElementById('noteInput');

    const bAddNote = document.getElementById('addNoteButton');

    const quadroRecados = document.getElementById('notesContainer');

    carregarNotas();

    function carregarNotas() {
        const notas = JSON.parse(localStorage.getItem(chaveStorage)) || [];
        quadroRecados.innerHTML = "";

        notas.forEach((texto, index) => {
            const nota = document.createElement("div");
            nota.className = "note";

            nota.innerHTML = `
                <span class="note-text">${texto}</span>
                <button class="remove-note" title="Remover recado">✖</button>
            `;

            nota.querySelector(".remove-note").addEventListener("click", () => {
                deletarNota(index);
            });

            quadroRecados.appendChild(nota);
        })
    }

    function adicionarNota() {

        const notaDoInput = noteInput.value.trim();
        if (!notaDoInput) return;

        const notas = JSON.parse(localStorage.getItem(chaveStorage)) || [];

        if (notas.length >= maxNotas) {
            alert("Limite de recados atingido. Remova algum antes de adicionar outro.");
            return;
        }

        notas.push(notaDoInput);
        localStorage.setItem(chaveStorage, JSON.stringify(notas));

        noteInput.value = "";
        carregarNotas();
    }

    function deletarNota(index) {

        const notas = JSON.parse(localStorage.getItem(chaveStorage)) || [];

        notas.splice(index, 1);
        localStorage.setItem(chaveStorage, JSON.stringify(notas));

        carregarNotas();
    }

    bAddNote.addEventListener("click", adicionarNota);

    noteInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            adicionarNota();
        }
    });

    // Atualização da data contábil

    const dataContabil = document.getElementById('dataContabilExibida');
    const dataContabilAtual = document.getElementById('dataContabil');
    const atualizacao = document.getElementById('ultimaAtualizacao');

    const bSalvarData = document.getElementById("save-button");

    dataContabil.textContent = localStorage.getItem('dataContabil');
    atualizacao.value = localStorage.getItem('dataAtualizacao');

    function dataHoje() {
        const hoje = new Date();

        const dia = hoje.getDate();
        const mes = hoje.getMonth() + 1;
        const ano = hoje.getFullYear();

        const hora = hoje.getHours();
        const minutos = hoje.getMinutes();
        const segundos = hoje.getSeconds();

        return `${dia}/${mes}/${ano}, às ${hora}:${minutos}:${segundos}`;
    }

    function salvarData(dataAtual, ultimaAtualizacao) {
        localStorage.setItem('dataContabil', dataAtual);
        localStorage.setItem('dataAtualizacao', ultimaAtualizacao);
    }
    
    bSalvarData.addEventListener("click", function() {
        
        const dataAtual = dataContabilAtual.value;
        const dataAgora = dataHoje();

        salvarData(dataAtual, dataAgora)

        dataContabil.textContent = dataAtual;
        atualizacao.value = dataAgora;

    })

})
/*
    function dataHoje() {
        const hoje = new Date();

        const dia = hoje.getDate();
        const mes = hoje.getMonth() + 1;
        const ano = hoje.getFullYear();

        const hora = hoje.getHours();
        const minutos = hoje.getMinutes();
        const segundos = hoje.getSeconds();

        return `${dia}/${mes}/${ano}, às ${hora}:${minutos}:${segundos}`;
    }

    function atualizarData() {

        const dataContabilAtual = document.getElementById('dataContabil');

        const dataAtual = dataContabilAtual.innerText;
        const dataAgora = dataHoje();

        salvarData(dataAtual, dataAgora)

        dataContabil.textContent = dataAtual;
        atualizacao.textContent = dataAgora;

    }

    function salvarData(dataAtual, ultimaAtualizacao) {
        localStorage.setItem('dataContabil', dataAtual);
        localStorage.setItem('dataAtualizacao', ultimaAtualizacao);
    }
*/