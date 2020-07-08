<?php

namespace App\Http\Controllers;

use App\Models\State;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class FornecedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('fornecedor.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $states = State::all();

        return view('fornecedor.create', compact('states'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // return response()->json($request);

        $fornecedor = [
            'tipo' => 'juridica',
            'ativo' => $request->ativo,
            'observacao' => $request->observacao,
        ];

        switch ($fornecedor['tipo']) {
            case 'juridica':

                $pessoa_juridica = [
                    'cnpj' => $request->cnpj,
                    'razao_social' => $request->razaoSocial,
                    'nome_fantasia' => $request->nomeFantasia,
                    'indicador_inscricao_estadual' => $request->indicadorInscricaoEstadual,
                    'inscricao_municipal' => $request->inscricaoMunicipal,
                    'recolhimento' => $request->recolhimento,
                ];

                break;

            case 'fisica':

                $pessoa_fisica = [
                    'cpf' => $request->cpf,
                    'nome' => $request->nome,
                    'apelido' => $request->apelido,
                    'rg' => $request->rg,
                ];

                break;
        }

        $contato = [
            'telefones' =>
            [
                'telefone' => $request->telefone,
                'tipo' => $request->telefoneTipo,
            ],
            'emails' =>
            [
                'email' => $request->email,
                'tipo' => $request->emailTipo,
            ],

        ];

        $endereco = [
            'cep' => $request->cep,
            'logradouro' => $request->logradouro,
            'numero' => $request->numero,
            'complemento' => $request->complemento,
            'bairro' => $request->bairro,
            'ponto_referencia' => $request->pontoReferencia,
            'uf' => $request->uf,
            'cidade' => $request->cidade,
            'is_condominio' => ($request->isCondominio == 'Sim' ? true : false),
            'endereco_condominio' => $request->enderecoCondominio,
            'numero_condominio' => $request->numeroCondominio,
        ];

        if ($request->{'telefone-adicional'}) {
            foreach ($request->{'telefone-adicional'} as $key => $telefone) {
                array_push(
                    $contato,
                    ['telefones ' =>
                    ['adicionais' =>
                    [
                        array_values ($telefone)
                    ]]]
                );
            }
        }

        if ($request->{'email-adicional'}) {
            foreach ($request->{'email-adicional'} as $key => $email) {
                array_push(
                    $contato,
                    ['emails' =>
                    ['adicionais' =>
                    [
                        $email

                    ]]]
                );
            }
        }

        if ($request->{'contato-adicional'}) {
            $contatoAdicional = array();

            foreach ($request->{'contato-adicional'} as $key => $contato) {
                array_push($contatoAdicional, $contato);
            }
        }



        dd($contato);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
