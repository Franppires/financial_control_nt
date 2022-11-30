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
        alert('Apenas números são permitidos no campo de valor!')
        return false
    }
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

function mascara(e) { 
    valor = document.getElementById('valor-mercadoria')
    valor.value = valor.value.replace(/[^0-9]+/g, '') // pegar somente números

    if (valor.value.length <= 2) {
        valor.value = ('000' + valor.value).substring(-3) // centavos
    }
    
    valor.value = valor.value.replace(/([0-9]{2})$/g, '.$1') // milhar
    valor.value = parseFloat(valor.value).toLocaleString('pt-BR') // transforma em string
}

function limparExtrato() { 
    let msg = 'Realmente deseja excluir transações? Esta ação vai excluir todas as transações'

    if(confirm(msg) == true) { 
        produto = []
        document.querySelector('tfoot').innerHTML = ''
        localStorage.clear()
        desenhaTabela()
    }
}

function desenhaTabela() { 
    document.querySelector('tbody').innerHTML = '' // limpa extrato
    resultado = ''

    // começo tabela
    document.querySelector('thead').innerHTML = `
    <tr>
        <th></th>
        <th style="text-align:start;">Mercadoria</th>
        <th style="text-align:end;">Ações</th>
        <th style="text-align:end;">Valor</th>
        
    </tr>`

    // nenhuma transação
    if (produto.length == 0) { 
        document.querySelector('tbody').innerHTML = `
        <tr>
            <td style="border: none;"></td>
            <td style="border: none; font-size:24px; text-align:center;"><strong>Nenhuma transação cadastrada!</strong></td>
            <td style="border: none;"></td>
        </tr>
        `
    }

    let total = 0 // total do valor de mercadoria

    console.log(document.querySelectorAll('tbody .conteudo-dinamico'))

    for(transacao in produto) { 

        if (produto[transacao].tipo == '+') { //seleciona tipo de operação
            total += parseFloat((produto[transacao].valor))
        } else { 
            total -= parseFloat((produto[transacao].valor))
        }

        let dinheiro = produto[transacao].valor // coloca campo dentro de variavel para conversão

        // extraato da tabela
        document.querySelector('tbody').innerHTML += ` 
        <tr class="conteudo-dinamico">
            <td>${produto[transacao].tipo}</td>
            <td style="width: 50%;">${produto[transacao].mercadoria}</td>
            <td style="text-align:end;">
                <button onclick="excluirLinha(${transacao})"> <strong> Excluir </strong></button> 
            </td>
            <td style="text-align:end;"> ${parseFloat(dinheiro).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
            
        </tr> 
        `
    }

    // resultado positivo ou negativo
    resultado = document.querySelector('tfoot').innerHTML 

    if (total > 0) { 
        resultado = '[LUCRO]'
    } else if (total < 0) { 
        resultado = '[PREJUIZO]'
    }

    if (resultado == 0) { 
        document.querySelector('tfoot').innerHTML = ''
    } else { 
        document.querySelector('tfoot').innerHTML = `
        <tr style="border-top-style: double">
            <td style="border: none;"></td>
            <td style="border: none;"><strong>Total</strong></td>
            <td style="border: none;"></td>
            <td style="border: none; text-align:end;"><strong> ${parseFloat(total).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>
                <div style="font-size:10px; text-align:end;" > ${resultado}</div>
            </td>
        </tr>
         `
    }
}   

function excluirLinha(e) { 
    produto.splice(e, 1); 
    desenhaTabela();
    localStorage.setItem('produto', JSON.stringify(produto))

    if (produto.length == 0) { 
        document.querySelector('tfoot').innerHTML = ''
    }
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
        fechaMenu.style.display = 'none'
        menuIcon.style.display = 'block'
    } else { 
        menu.classList.add('ativo')
        fechaMenu.style.display = 'block'
        menuIcon.style.display = 'none'
    }
}

abrirMenu.addEventListener('click', toggleMenu)
fechaMenu.addEventListener('click', toggleMenu)