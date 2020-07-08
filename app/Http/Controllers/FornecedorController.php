<?php

namespace App\Http\Controllers;

use App\Models\Fornecedor;
use App\Models\PessoaFisica;
use App\Models\PessoaJuridica;
use App\Models\State;
use Illuminate\Database\QueryException;
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


        if ($request->tipoPessoa == 'juridica') {

            try {

                $pessoa = new PessoaJuridica;
                $pessoa->cnpj = (int) preg_replace('/[^0-9]/', '', $request->cnpj);
                $pessoa->razao_social = $request->razaoSocial;
                $pessoa->nome_fantasia = $request->nomeFantasia;
                $pessoa->indicador_inscricao_estadual = $request->indicadorInscricaoEstadual;
                $pessoa->inscricao_municipal = $request->inscricaoMunicipal;
                $pessoa->recolhimento = $request->recolhimento;
                $pessoa->save();
            } catch (QueryException $error) {
                if ($pessoa) $pessoa->delete();
                // dd($error);
                return redirect()->back()->withErrors('Erro ao cadastrar fornecedor');
            }
        } else if ($request->tipoPessoa == 'fisica') {

            try {

                $pessoa = new PessoaFisica;
                $pessoa->cpf =  (int) preg_replace('/[^0-9]/', '', $request->cpf);
                $pessoa->nome = $request->nome;
                $pessoa->apelido = $request->apelido;
                $pessoa->rg = $request->rg;
                $pessoa->save();
            } catch (QueryException $error) {
                if ($pessoa) $pessoa->delete();
                // dd($error);
                return redirect()->back()->withErrors('Erro ao cadastrar fornecedor');

            }
        }

        try {
            $fornecedor = new Fornecedor;
            $fornecedor->is_active = ($request->ativo == 'Sim' ? true : false);
            $fornecedor->is_active = ($request->ativo == 'Sim' ? true : false);
            $fornecedor->pessoable()->associate($pessoa);
            $fornecedor->save();

        } catch (QueryException $error) {
            if ($fornecedor) $fornecedor->delete();
            if ($pessoa) $pessoa->delete();
            // dd($error);
            return redirect()->back()->withErrors('Erro ao cadastrar fornecedor');
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
                        array_values($telefone)
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
