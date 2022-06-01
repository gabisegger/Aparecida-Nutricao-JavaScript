// Adicionar um novo paciente na tabela
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    //Pegando os valores preenchidos no form
    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form);

    //Criando mais uma linha que armazena os dados preenchidos no form
    var pacienteTr = montaTr(paciente);
   
    //Validando paciente
    var erro = validaPaciente(paciente);
    
    if(erro.length > 0){
        var mensagemErro = document.getElementById("mensagem-erro")
        mensagemErro.textContent = erro;
        
        return;
    }

    //Adicionando a nova linha com o preenchimento do form na tabela
    var tabela = document.querySelector("#tabela-pacientes");

    tabela.appendChild(pacienteTr);

    //Reseta as informações preenchidas no form referentes ao paciente anterior já adicionado na tabela
    form.reset();
})

function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaIMC(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
 
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){
    var erros = []
    
    if(!validaPeso(paciente.peso)) erros.push("Peso inválido!");
    
    if(!validaAltura(paciente.altura)) erros.push("Altura inválida!");

    return erros;
}