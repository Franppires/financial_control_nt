

//campo de valor formatado para receber somente numero
function formatarMoeda() { 
    var elemento = document.getElementById('valor');
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


// const lista = [
//     {
//         tipoTransacao: '-',
//         nomeMercadoria: 'blusa',
//         valorMercadoria: 1
//     }
// ] 


function adicionarTransacao() { 
    const tipoTransacao = document.getElementById('tipo-transacao'); 
    const nomeTransacao = document.getElementById('nome-transacao'); 
    const valorTransacao = document.getElementById('valor-transacao');

    let dados = localStorage.getItem('dadosTransacao');

    if(dados == null) { 
        localStorage.setItem('dadosTransacao', '[]');
        dados = [];
    }

    const registroTransacao = { 
        selecao: tipoTransacao.value,
        nome: nomeTransacao.value,
        valor: valorTransacao.value
    }

    dados.push(registroTransacao);

    localStorage.setItem('dadosTransacao', JSON.stringify(dados));
}
