<?php

namespace App\Http\Controllers;

use App\Http\Requests\FornecedorForm;
use App\Models\City;
use App\Models\ContatoPrincipal;
use App\Models\Fornecedor;
use App\Models\PessoaContato;
use App\Models\PessoaFisica;
use App\Models\PessoaJuridica;
use App\Models\State;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FornecedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO: Implementar datables com laravel paginate
        // $fornecedores = Fornecedor::paginate(100);

        $fornecedores = Fornecedor::all();

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
    public function store(FornecedorForm $request)

    {

        // return response()->json($request);



        DB::beginTransaction();

        try {
            if ($request->tipoPessoa == 'juridica') {
                $pessoa = new PessoaJuridica;
                $pessoa->cnpj = preg_replace('~\D~', '', $request->cnpj);
                $pessoa->razao_social = $request->razaoSocial;
                $pessoa->nome_fantasia = $request->nomeFantasia;
                $pessoa->indicador_inscricao_estadual = $request->indicadorInscricaoEstadual;
                $pessoa->inscricao_estadual = $request->inscricaoEstadual;
                $pessoa->inscricao_municipal = $request->inscricaoMunicipal;
                $pessoa->recolhimento = $request->recolhimento;
                // $pessoa->save();
            } else if ($request->tipoPessoa == 'fisica') {
                $pessoa = new PessoaFisica;
                $pessoa->cpf =  preg_replace('~\D~', '', $request->cpf);
                $pessoa->nome = $request->nome;
                $pessoa->apelido = $request->apelido;
                $pessoa->rg = $request->rg;
            } else {
                return redirect()->back()->withErrors('Erro ao cadastrar fornecedor')->withInput($request->input());
            }
            $pessoa->save();

            $fornecedor = new Fornecedor;
            $fornecedor->is_active = ($request->ativo == 'Sim') ? true : false;
            $fornecedor->observacao = $request->observacao;
            $fornecedor->pessoable()->associate($pessoa);
            $fornecedor->save();

            $fornecedor->endereco()->create(
                [
                    "cep" => preg_replace('~\D~', '', $request->cep),
                    "logradouro" => $request->logradouro,
                    "numero" => $request->numero,
                    "complemento" => $request->complemento,
                    "bairro" => $request->bairro,
                    "ponto_referencia" => $request->pontoReferencia,
                    "uf" => $request->uf,
                    "is_condominio" => ($request->isCondominio == 'sim') ? true : false,
                    "cidade" => $request->cidade,
                    "endereco_condominio" => $request->enderecoCondominio,
                    "numero_condominio" => $request->numeroCondominio
                ],
            );


            if ($request->email) {
                $fornecedor->contatosPrincipais()->create(
                    [
                        "qual_contato" => 'E-mail',
                        "contato" => $request->email,
                        "tipo" => $request->emailTipo,
                    ],
                );
            }

            if ($request->telefone) {
                $fornecedor->contatosPrincipais()->create(
                    [
                        "qual_contato" => 'Telefone',
                        "contato" => $request->telefone,
                        "tipo" => $request->telefoneTipo,
                    ],
                );
            }


            if ($request->{'telefone-adicional'}) {
                foreach ($request->{'telefone-adicional'} as $key => $telefone) {
                    $fornecedor->contatosPrincipais()->create(
                        [
                            "qual_contato" => 'Telefone',
                            "contato" => $telefone['telefone'],
                            "tipo" => $telefone['tipo'],
                        ],
                    );
                }
            }

            if ($request->{'email-adicional'}) {
                foreach ($request->{'email-adicional'} as $key => $email) {
                    $fornecedor->contatosPrincipais()->create(
                        [
                            "qual_contato" => 'E-mail',
                            "contato" => $email['email'],
                            "tipo" => $email['tipo'],
                        ],
                    );
                }
            }

            if ($request->{'contato-adicional'}) {

                foreach ($request->{'email-adicional'} as $key => $email) {
                    $fornecedor->contatosPrincipais()->create(
                        [
                            "qual_contato" => 'E-mail',
                            "contato" => $email['email'],
                            "tipo" => $email['tipo'],
                        ],
                    );
                }

                foreach ($request->{'contato-adicional'} as $key => $contato) {

                    $pessoaContato = new PessoaContato();
                    $pessoaContato->nome = $contato['nome'];
                    $pessoaContato->empresa = $contato['empresa'];
                    $pessoaContato->cargo = $contato['cargo'];
                    $pessoaContato->fornecedor_id = $fornecedor->id;
                    $pessoaContato->save();

                    foreach ($contato['telefone'] as $telefones) {

                        $pessoaContato->contato()->create(
                            [
                                'qual_contato' => 'Telefone',
                                'contato' => $telefones['telefone'],
                                'tipo' => $telefones['tipo'],
                            ]
                        );
                    }

                    foreach ($contato['email'] as $key => $emails) {
                        $pessoaContato->contato()->create(
                            [
                                'qual_contato' => 'E-mail',
                                'contato' => $emails['email'],
                                'tipo' => $emails['tipo'],
                            ]
                        );
                    }
                }
            }
        } catch (QueryException $error) {
            DB::rollback();
            return redirect()->back()->withErrors('Erro ao cadastrar fornecedor')->withInput($request->input());
        }

        DB::commit();

        return redirect()->route('fornecedor.index')->withSuccess('Fornecedor adicionado');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Fornecedor $fornecedor)
    {
        return view('fornecedor.show', compact('fornecedor'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Fornecedor $fornecedor)
    {
        $states = State::all();
        $cities = City::where('state_id', $fornecedor->endereco->uf)->get();

        return view('fornecedor.edit', compact('fornecedor', 'states', 'cities'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FornecedorForm $request, Fornecedor $fornecedor)
    {


        // return response()->json($request);


        DB::beginTransaction();

        try {


            $fornecedor->update(
                [
                    'is_active' => ($request->ativo == 'Sim') ? true : false,
                    'observacao' => $request->observacao,
                ]
            );

            if ($request->tipoPessoa == 'juridica') {

                $fornecedor->pessoable()->update(
                    [
                        'cnpj' => preg_replace('~\D~', '', $request->cnpj),
                        'razao_social' => $request->razaoSocial,
                        'nome_fantasia' => $request->nomeFantasia,
                        'indicador_inscricao_estadual' => $request->indicadorInscricaoEstadual,
                        'inscricao_estadual' => $request->inscricaoEstadual,
                        'inscricao_municipal' => $request->inscricaoMunicipal,
                        'recolhimento' => $request->recolhimento,
                    ]
                );
            } else if ($request->tipoPessoa == 'fisica') {

                $fornecedor->pessoable()->update(
                    [
                        'cpf' =>  (int) preg_replace('~\D~', '', $request->cpf),
                        'nome' => $request->nome,
                        'apelido' => $request->apelido,
                        'rg' => $request->rg,
                    ]
                );
            } else {
                DB::rollback();
                return redirect()->back()->withErrors('Erro ao atualizar fornecedor')->withInput($request->input());
            }

            $fornecedor->endereco()->create(
                [
                    "cep" => preg_replace('~\D~', '', $request->cep),
                    "logradouro" => $request->logradouro,
                    "numero" => $request->numero,
                    "complemento" => $request->complemento,
                    "bairro" => $request->bairro,
                    "ponto_referencia" => $request->pontoReferencia,
                    "uf" => $request->uf,
                    "is_condominio" => ($request->isCondominio == 'sim') ? true : false,
                    "cidade" => $request->cidade,
                    "endereco_condominio" => $request->enderecoCondominio,
                    "numero_condominio" => $request->numeroCondominio
                ],
            );


            //TODO: Melhorar atualização dos contatos
            $fornecedor->contatosPrincipais()->delete();
            $fornecedor->pessoasContatos()->delete();

            //TODO: Remover esta implementação, e tratar cada contato com update/delete/create

            if ($request->email) {
                $fornecedor->contatosPrincipais()->create(
                    [
                        "qual_contato" => 'E-mail',
                        "contato" => $request->email,
                        "tipo" => $request->emailTipo,
                    ],
                );
            }

            if ($request->telefone) {
                $fornecedor->contatosPrincipais()->create(
                    [
                        "qual_contato" => 'Telefone',
                        "contato" => $request->telefone,
                        "tipo" => $request->telefoneTipo,
                    ],
                );
            }


            if ($request->{'telefone-adicional'}) {
                foreach ($request->{'telefone-adicional'} as $key => $telefone) {
                    $fornecedor->contatosPrincipais()->create(
                        [
                            "qual_contato" => 'Telefone',
                            "contato" => $telefone['telefone'],
                            "tipo" => $telefone['tipo'],
                        ],
                    );
                }
            }

            if ($request->{'email-adicional'}) {
                foreach ($request->{'email-adicional'} as $key => $email) {
                    $fornecedor->contatosPrincipais()->create(
                        [
                            "qual_contato" => 'E-mail',
                            "contato" => $email['email'],
                            "tipo" => $email['tipo'],
                        ],
                    );
                }
            }

            if ($request->{'contato-adicional'}) {

                foreach ($request->{'email-adicional'} as $key => $email) {
                    $fornecedor->contatosPrincipais()->create(
                        [
                            "qual_contato" => 'E-mail',
                            "contato" => $email['email'],
                            "tipo" => $email['tipo'],
                        ],
                    );
                }

                foreach ($request->{'contato-adicional'} as $key => $contato) {

                    $pessoaContato = new PessoaContato();
                    $pessoaContato->nome = $contato['nome'];
                    $pessoaContato->empresa = $contato['empresa'];
                    $pessoaContato->cargo = $contato['cargo'];
                    $pessoaContato->fornecedor_id = $fornecedor->id;
                    $pessoaContato->save();

                    foreach ($contato['telefone'] as $telefones) {

                        $pessoaContato->contato()->create(
                            [
                                'qual_contato' => 'Telefone',
                                'contato' => $telefones['telefone'],
                                'tipo' => $telefones['tipo'],
                            ]
                        );
                    }

                    foreach ($contato['email'] as $key => $emails) {
                        $pessoaContato->contato()->create(
                            [
                                'qual_contato' => 'E-mail',
                                'contato' => $emails['email'],
                                'tipo' => $emails['tipo'],
                            ]
                        );
                    }
                }
            }
        } catch (QueryException $error) {
            DB::rollback();
            return redirect()->back()->withErrors('Erro ao atualizar fornecedor')->withInput($request->input());
        }

        DB::commit();

        return redirect()->route('fornecedor.edit', [$fornecedor->id])->withSuccess('Fornecedor atualizado');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $fornecedor = Fornecedor::find($id);
        $fornecedor->delete();

        return redirect()->route('fornecedor.index')->withSuccess('Fornecedor removido com sucesso!');
    }
}
