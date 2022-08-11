
//permitir somente numeros
function formatarMoeda() {
    var elemento = document.querySelector('#valor');
        var valor = elemento.value;

        valor = valor + ''; 
        valor = parseInt(valor.replace(/[\D]+/g, '')); 
        valor = valor + ''; 
        valor = valor.replace(/([0-9]{2})$/g, ",$1"); 

        if (valor.length > 6) { 
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2"); 
        }

        elemento.value = valor; 
        if (valor == 'NaN') elemento.value = '';
}

function adicionarTransacao(e) { 
    e.preventDefault();    

    //usando localStorage para armazenar dados 
    var extratoCru = localStorage.getItem('extrato')

    if (extratoCru == null) { 
        var extrato = JSON.parse(extratoCru)
    } else { 
        var extrato = [];
    }

    // está indo pro localstorage, mas não aparece na tabela 
    extrato.push({
        selecionarTransacao: e.target.elements['selecionar-transacao'].value,
        nomeMercadoria: e.target.elements['nome-mercadoria'].value,
        valor: e.target.elements['valor'].value
    });

    localStorage.setItem('extrato', JSON.stringify(extrato));

    //tem que alterar na tabela //
    console.log(extrato)
}


// não está aparecendo no extrato//


//contatenação de array para realizar a limpeza do extrato, usando limpar extrato 
function limparExtrato() {

    linhasExistentes = [...document.querySelectorAll('table.tabela tbody .conteudo-dinamico')];
    linhasExistentes.forEach(element => {
    element.remove()
});
}

//chamando alista estatica para a tabela 
function desenhaTabela() { 
    for (operacao in extrato) {
    document.querySelector('table.tabela tbody').innerHTML +=
    `
        <tr class="conteudo-dinamico">
            <td>
                ${elements.extrato.selecionarTransacao == 'Compra' ? '-' : '+'}
            </td>
            <td>
                ${elements.extrato.nomeMercadoria}
            </td>
            <td>
                ${formatarMoeda(valor)}
            </td>
        </td>
    ` 
}
}
// como chamar, pois está dando undef
//desenhaTabela()

