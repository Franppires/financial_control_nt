let produto = [
    {
        tipo: '-', 
        mercadoria: 'roupa',
        valor: 10
    }
]
// console.log(produto)

// function desenhaTabela() { 

    for(transacao in produto) { 
       document.querySelector("table.extrato-tabela thead").innerHTML += `
        <tr>
            <td>${produto[transacao].tipo}</td>
            <td>${produto[transacao].mercadoria}</td>
            <td>${produto[transacao].valor}</td>
        </tr>
    `

    }
        