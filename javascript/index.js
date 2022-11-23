let produto = [
    {
        tipo: '-', 
        mercadoria: 'roupa',
        valor: 10
    }
]
// console.log(produto)


function enviarFormulario(e) { 
    e.preventDefault()

    produto.push({ 
        tipo: e.target.elements['selecionar-transacao'].selectedIndex == 1 ? '-' : '+', 
        mercadoria: e.target.elements["nome-mercadoria"].value,
        valor: e.target.elements["valor-mercadoria"].value,
    })

}


function desenhaTabela() { 

    for(transacao in produto) { 
       document.querySelector("table.extrato-tabela thead").innerHTML +=
       ` <tr>
            <td>${produto[transacao].tipo}</td>
            <td>${produto[transacao].mercadoria}</td>
            <td>${produto[transacao].valor}</td>
        </tr> `
    }
}

desenhaTabela()
        