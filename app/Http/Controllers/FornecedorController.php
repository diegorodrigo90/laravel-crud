<?php

namespace App\Http\Controllers;

use App\Models\State;
use Illuminate\Http\Request;

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
        switch ($request->tipoPessoa) {
            case 'juridica':


                $pessoa = [
                    ['tipo' => 'juridica'],
                    ['cnpj' => $request->cnpj],
                    ['razao_social' => $request->razaoSocial],
                    ['nome_fantasia' => $request->nomeFantasia],
                    ['indicador_inscricao_estadual' => $request->indicadorInscricaoEstadual],
                    ['inscricao_municipal' => $request->inscricaoMunicipal],
                    ['recolhimento' => $request->recolhimento],
                    ['ativo' => $request->ativo],
                    ['telefone' => $request->telefone],
                    ['telefone_tipo' => $request->telefoneTipo],
                    ['email' => $request->email],
                    ['email_tipo' => $request->emailTipo],
                    ['cep' => $request->cep],
                    ['logradouro' => $request->logradouro],
                    ['numero' => $request->numero],
                    ['complemento' => $request->complemento],
                    ['bairro' => $request->bairro],
                    ['ponto_referencia' => $request->pontoReferencia],
                    ['uf' => $request->uf],
                    ['cidade' => $request->cidade],
                    ['is_condominio' => $request->isCondominio],
                    ['endereco_condominio' => $request->enderecoCondominio],
                    ['numero_condominio' => $request->numeroCondominio],
                    ['observacao' => $request->observacao],
                ] ;

                break;

            case 'fisica':

                $pessoa = [
                    ['tipo' => 'juridica'],
                    ['cpf' => $request->cpf],
                    ['nome' => $request->nome],
                    ['apelido' => $request->apelido],
                    ['rg' => $request->rg],
                    ['ativo' => $request->ativo],
                    ['telefone' => $request->telefone],
                    ['telefone_tipo' => $request->telefoneTipo],
                    ['email' => $request->email],
                    ['email_tipo' => $request->emailTipo],
                    ['cep' => $request->cep],
                    ['logradouro' => $request->logradouro],
                    ['numero' => $request->numero],
                    ['complemento' => $request->complemento],
                    ['bairro' => $request->bairro],
                    ['ponto_referencia' => $request->pontoReferencia],
                    ['uf' => $request->uf],
                    ['cidade' => $request->cidade],
                    ['is_condominio' => $request->isCondominio],
                    ['endereco_condominio' => $request->enderecoCondominio],
                    ['numero_condominio' => $request->numeroCondominio],
                    ['observacao' => $request->observacao],
                ] ;

                break;
        }

        return response()->json($request);
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
