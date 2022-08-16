// validação campos e mascara do valor 
const input = document.getElementById("valor");
input.addEventListener("keyup", formatarMoeda); 

function formatarMoeda(e) { 
    var valor = e.target.value.replace(/\D/g,"");

    valor = (valor/100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");

    e.target.value = valor;

}




