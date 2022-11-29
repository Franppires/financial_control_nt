var produto = [] // inicia vazio 

var produtoCru = localStorage.getItem('produto')  // armazenamento no localStorage
if (produtoCru != null) { 
    var produto = JSON.parse(produtoCru)
} else { 
    var produto = []
}

// função para enviar dados 
function enviarTransacao(e) { 
    e.preventDefault()

    produto.push({     // envia dados para localStorage
        tipo: e.target.elements['selecionar-transacao'].selectedIndex == 1 ? '-' : '+', 
        mercadoria: e.target.elements['nome-mercadoria'].value,
        valor: e.target.elements['valor-mercadoria'].value
        .replace('.', '')
        .replace(',', '.'),
    })

    localStorage.setItem('produto', JSON.stringify(produto)) //salvando extrato no localstorage
    desenhaTabela() // chamando a tabela pra reescrever
}


function desenhaTabela() { 
    document.querySelector('body').innerHTML = ''

    document.querySelector('thead').innerHTML = `
    <tr>
        <th></th>
        <th style="text-align:start;">Mercadoria</th>
        <th style="text-align:end;">Valor</th>
    </tr>`

    if (produto.length == 0) { 
        document.querySelector('tbody').innerHTML = `
        <tr>
        <h2 style="text-align:center">Nenhuma transação cadastrada!</h2>
        </tr>
        `
    }

    for(transacao in produto) { 

       document.querySelector('tbody').innerHTML +=
       ` <tr class="conteudo-dinamico">
            <td>${produto[transacao].tipo}</td>
            <td>${produto[transacao].mercadoria}</td>
            <td style="text-align:end; ">${produto[transacao].valor}</td>
        </tr> `
    }
}

desenhaTabela()
        