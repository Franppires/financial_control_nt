var produto = [] // inicia vazio 

var produtoCru = localStorage.getItem('produto')  // armazenamento no localStorage
if (produtoCru != null) { 
    produto = JSON.parse(produtoCru)
} 

// função para enviar dados 
function enviarTransacao(e) { 
    e.preventDefault()

    // verifica se é diferente de vazio
    if (e.target.elements['selecionar-transacao'].selectedIndex == '') { 
        alert('Tipo de operação não selecionada, por favor selecione uma operação')
        return false
    }

    // verifica se é diferente de vazio
    if (e.target.elements['nome-mercadoria'].value == '') { 
        alert('Campo de mercadoria não preenchido, por favor digite o nome da mercadoria')
        return false
    }

    //verifica se só tem numero e considera somente os numeros
    numero = /[0-9]+/g
    if (!numero.test(e.target.elements['valor-mercadoria'].value)) { 
        alert('Campo de valor não preenchido corretamente, apenas números são permitidos!')
        return false
    }
    produto.push({     // envia dados para localStorage
        tipo: e.target.elements['selecionar-transacao'].selectedIndex == 1 ? '-' : '+', 
        mercadoria: e.target.elements['nome-mercadoria'].value,
        valor: parseFloat(e.target.elements['valor-mercadoria'].value.replaceAll('R$', '').replaceAll('.', '').replaceAll(',', '.'))
    })

    localStorage.setItem('produto', JSON.stringify(produto)) //salvando extrato no localstorage
    desenhaTabela() // chamando a tabela pra reescrever
}

function mascara(e) { 
    let valor = document.getElementById('valor-mercadoria')
    valor.value = valor.value.replace(/[^0-9]+/g, '') // pegar somente números

    if (valor.value.length <= 2) {
        valor.value = ('000' + valor.value).substring(-3) // centavos
    }

    valor.value = valor.value.replace(/([0-9]{2})$/g, '.$1') // milhar
    valor.value = parseFloat(valor.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) // transforma em string
}

function limparExtrato() { 
    let msg = 'Realmente deseja excluir transações? Esta ação vai excluir todas as transações'

    if(confirm(msg) == true) { 
        produto = []
        localStorage.clear()
        desenhaTabela()
    }
}

function desenhaTabela() { 
    let extrato = document.querySelector('tbody')
    extrato.innerHTML = ''// limpa extrato

    if (produto.length == 0) { // nenhuma transação
        extrato.innerHTML = `
        <tr>
            <td style="border: none;"></td>
            <td style="border: none; font-size:24px; text-align:center;"><strong>Nenhuma transação cadastrada!</strong></td>
            <td style="border: none;"></td>
        </tr>
        `
    }

    let total = 0 // total do valor de mercadoria

    for(transacao in produto) { 
        let dinheiro = produto[transacao].valor // coloca campo dentro de variavel para conversão
        let tipo = produto[transacao].tipo //tipo de operação positiva ou negativa 

        if (tipo == '+') { //seleciona tipo de operação
            total += parseFloat(dinheiro)
        } else { 
            total -= parseFloat(dinheiro)
        }
        // extrato da tabela
        extrato.innerHTML += ` 
        <tr class="conteudo-dinamico">
            <td>${tipo}</td>
            <td style="width: 50%;">${produto[transacao].mercadoria}</td>
            <td style="text-align:end;">
                <button onclick="excluirLinha(${transacao})"> <strong> Excluir </strong></button> </td>
            <td style="text-align:end;"> ${dinheiro.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
        </tr> `
    }

    lucroPrejuizo = document.querySelector('tfoot div')
    
    if (total > 0) { 
        lucroPrejuizo = '[LUCRO]'
    } else { 
        lucroPrejuizo = '[PREJUIZO]'
    }

    document.querySelector('tfoot').innerHTML =  `
    <tr style="border-top-style: double">
        <td style="border: none;"></td>
        <td style="border: none;"><strong>Total</strong></td>
        <td style="border: none;"></td>
        <td style="border: none; text-align:end;"><strong> ${total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>
            <div style="font-size:10px; text-align:end;"> ${total != 0 ? lucroPrejuizo : ''}</div>  </td>
    </tr> `
}   

function excluirLinha(e) { //excluir linha
    produto.splice(e, 1); 
    desenhaTabela();
    localStorage.setItem('produto', JSON.stringify(produto))
}

desenhaTabela()
        
// menu hamburguer
let menu = document.querySelector('.nav')
let menuItens = document.querySelector('.menu-texto')
let abrirMenu = document.querySelector('.menu-hamburguer')
let fechaMenu = document.querySelector('.fechar')
let menuIcon = document.querySelector('.menu-icon')

function toggleMenu() { 
    if(menu.classList.contains('ativo')) { 
        menu.classList.remove('ativo')
        abrirMenu.style.display = 'none'
        menuIcon.style.display = 'block'
    } else { 
        menu.classList.add('ativo')

        abrirMenu.style.display = 'block'
        menuIcon.style.display = 'none'
    }
}

abrirMenu.addEventListener('click', toggleMenu)
fechaMenu.addEventListener('click', toggleMenu)