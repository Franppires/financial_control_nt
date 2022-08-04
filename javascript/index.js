// lista de transação 
const transacao = [ 
    {
        tipo: '-',
        mercadoria: 'blusa',
        valor: 15.00,

    },
    {
        tipo: '+' ,
        mercadoria: 'calça',
        valor: 50.00,

    }
]

for(operacao in transacao) {
    document.querySelector('table.tabela thead').innerHTML +=
        `
        <tr>
            <td>
            ${(transacao[operacao] == 'Compra' ? '-' : '+')}
            </td>
            <td>
            ${transacao[operacao].mercadoria}
            </td>
            <td>
            ${transacao[operacao].valor}
            </td>
        </tr>
    
        ` 
}


