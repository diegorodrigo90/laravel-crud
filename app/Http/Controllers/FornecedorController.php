<?php

namespace App\Http\Controllers;

use App\Models\ContatoAdicional;
use App\Models\ContatoPrincipal;
use App\Models\EnderecoFornecedor;
use App\Models\Fornecedor;
use App\Models\PessoaContato;
use App\Models\PessoaFisica;
use App\Models\PessoaJuridica;
use App\Models\State;
use Illuminate\Database\QueryException;
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
        $fornecedores = Fornecedor::paginate(10);

        return view('fornecedor.index', compact('fornecedores'));
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
            return redirect()->back()->withErrors('Erro ao cadastrar fornecedor');
        }

        try {
            if ($request->email) {
                $contato = new ContatoPrincipal();
                $contato->fornecedor_id = $fornecedor->id;
                $contato->qual_contato = 'E-mail';
                $contato->contato = $request->email;
                $contato->tipo = $request->emailTipo;
                $contato->save();
            }

            if ($request->telefone) {
                $contato = new ContatoPrincipal();
                $contato->fornecedor_id = $fornecedor->id;
                $contato->qual_contato = 'Telefone';
                $contato->contato = $request->telefone;
                $contato->tipo = $request->telefoneTipo;
                $contato->save();
            }


            if ($request->{'telefone-adicional'}) {
                foreach ($request->{'telefone-adicional'} as $key => $telefone) {
                    $contato = new ContatoPrincipal();
                    $contato->fornecedor_id = $fornecedor->id;
                    $contato->qual_contato = 'Telefone';
                    $contato->contato = $telefone['telefone'];
                    $contato->tipo = $telefone['tipo'];
                    $contato->save();
                }
            }

            if ($request->{'email-adicional'}) {
                foreach ($request->{'email-adicional'} as $key => $email) {
                    $contato = new ContatoPrincipal();
                    $contato->fornecedor_id = $fornecedor->id;
                    $contato->qual_contato = 'E-mail';
                    $contato->contato = $email['email'];
                    $contato->tipo = $email['tipo'];
                    $contato->save();
                }
            }
        } catch (QueryException $error) {
            if ($fornecedor) {
                $contatos = ContatoPrincipal::where('fornecedor_id', $fornecedor->id);
                if ($contatos) $contatos->delete();
                $fornecedor->delete();
            }

            return redirect()->back()->withErrors('Erro ao cadastrar fornecedor');
        }


        try {

            $endereco = new EnderecoFornecedor();
            $endereco->cep = (int) preg_replace('/[^0-9]/', '', $request->cep);
            $endereco->logradouro = $request->logradouro;
            $endereco->fornecedor_id = $fornecedor->id;
            $endereco->numero = $request->numero;
            $endereco->complemento = $request->complemento;
            $endereco->bairro = $request->bairro;
            $endereco->ponto_referencia = $request->pontoReferencia;
            $endereco->uf = $request->uf;
            $endereco->cidade = $request->cidade;
            $endereco->is_condominio = ($request->isCondominio == 'Sim' ? true : false);
            $endereco->endereco_condominio = $request->enderecoCondominio;
            $endereco->numero_condominio = $request->numeroCondominio;
            $endereco->save();
        } catch (QueryException $error) {
            $fornecedor->delete();
            return redirect()->back()->withErrors('Erro ao cadastrar fornecedor');
        }


        try {

            if ($request->{'contato-adicional'}) {

                foreach ($request->{'contato-adicional'} as $key => $contato) {
                    $pessoaContato = new PessoaContato();
                    $pessoaContato->fornecedor_id = $fornecedor->id;
                    $pessoaContato->nome = $contato['nome'];
                    $pessoaContato->empresa = $contato['empresa'];
                    $pessoaContato->cargo = $contato['cargo'];
                    $pessoaContato->save();

                    foreach ($contato['telefone'] as $telefones) {
                        $telefone = new ContatoAdicional();
                        $telefone->contato_id = $pessoaContato->id;
                        $telefone->qual_contato = 'Telefone';
                        $telefone->contato = $telefones['telefone'];
                        $telefone->tipo = $telefones['tipo'];
                        $telefone->save();
                    }

                    foreach ($contato['email'] as $key => $emails) {
                        $email = new ContatoAdicional();
                        $email->contato_id = $pessoaContato->id;
                        $email->qual_contato = 'E-mail';
                        $email->contato = $emails['email'];
                        $email->tipo = $emails['tipo'];
                        $email->save();
                    }
                }
            }
        } catch (QueryException $error) {
            $fornecedor->delete();
            return redirect()->back()->withErrors('Erro ao cadastrar fornecedor');
        }


        return redirect()->route('fornecedor.index')->withSuccess('Fornecedor adicionado');
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
