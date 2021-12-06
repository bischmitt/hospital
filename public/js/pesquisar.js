/* Função para pesquisar médicos por nome e especialidade */
function pesquisarMedico() {
    // Variáveis
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("pesquisa");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabela");
    tr = table.getElementsByTagName("tr");
  
    //Comparar o campo do input com o campo da tabela
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      if (td[0]) {
        txtValue = td[0].textContent || td[0].innerText;
        espValue = td[1].textContent || td[1].innerText;
        /* Aqui nos preocupamos com a primeira e segunda coluna da tabela, pois é ali que se encontram o nome do médico e a especialidade */
        if ((txtValue.toUpperCase().indexOf(filter) > -1) || (espValue.toUpperCase().indexOf(filter) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}