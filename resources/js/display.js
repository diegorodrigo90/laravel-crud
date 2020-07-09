$(document).ready(function() {

    $('.mostra-modal-excluir').on('click', function(){
        $('#excluirFornecedor').attr('action', $(this).attr('data-link'));

        $('#fornecedorNome').html('<b>' + $(this).attr('data-nome') + '</b>');

        $('#modalExcluirFornecedor').modal('show');

    });

    $('[data-toggle="tooltip"]').tooltip();
});
