$(document).ready(function () {
    $('.mostra-modal-excluir').on('click', function () {
        $('#excluirFornecedor').attr('action', $(this).attr('data-link'));
        $('#fornecedorNome').html('<b>' + $(this).attr('data-nome') + '</b>');
        $('#modalExcluirFornecedor').modal('show');
    });


    $('#fornecedoresTable').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
            }
        }

    );
    $('[data-toggle="tooltip"]').tooltip();
});
