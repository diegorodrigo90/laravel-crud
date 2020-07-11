<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FornecedorForm extends FormRequest
{

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'cpf' => preg_replace('/[^0-9]/', '', $this->cpf), //limpando pontos e numeros para validar
            'cnpj' => preg_replace('/[^0-9]/', '', $this->cnpj), //limpando pontos e numeros para validar
            'cep' => preg_replace('/-/', '', $this->cep), //lremovendo traços para validar

        ]);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $input = parent::all();

        if ($input['tipoPessoa'] == 'fisica') {

            return [
                'cpf' => [
                    'required', 'cpf',
                    Rule::unique('pessoas_fisicas')
                ],
                'nome' => 'required',
                'apelido' => 'required',
                'rg' => 'required|numeric',
                'ativo' => 'required',
                'telefone' => 'required|regex:/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/u',
                'telefoneTipo' => 'required',
                'email' => 'required|email',
                'emailTipo' => 'required',
                'cep' => 'required|numeric',
                'logradouro' => 'required',
                'numero' => 'required|numeric',
                'complemento' => 'nullable',
                'bairro' => 'required',
                'pontoReferencia' => 'nullable',
                'uf' => 'required|numeric',
                'cidade' => 'required|numeric',
                "isCondominio" => 'required', 'in:sim,nao',
                'enderecoCondominio' => 'required_if:isCondominio,sim',
                'numeroCondominio' => 'required_if:isCondominio,sim',
                'observacao' => 'nullable'

            ];
        } else {
            return [
                'cnpj' =>  [
                    'required', 'cnpj',
                    Rule::unique('pessoas_juridicas')
                ],
                'razaoSocial' => 'required',
                'nomeFantasia' => 'required',
                'indicadorInscricaoEstadual' => 'required',
                'inscricaoMunicipal' => 'required',
                'recolhimento' => 'required',
                'ativo' => 'required',
                'telefone' => 'required|regex:/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/u',
                'telefoneTipo' => 'required',
                'email' => 'required|email',
                'emailTipo' => 'required',
                'cep' => 'required',
                'logradouro' => 'required',
                'numero' => 'required|numeric',
                'complemento' => 'nullable',
                'bairro' => 'required',
                'pontoReferencia' => 'nullable',
                'uf' => 'required|numeric',
                'cidade' => 'required|numeric',
                "isCondominio" => 'required', 'in:sim,nao',
                'enderecoCondominio' => 'required_if:isCondominio,sim',
                'numeroCondominio' => 'required_if:isCondominio,sim',
                'observacao' => 'nullable'
            ];
        }
    }

    public function messages()
    {

        return [
            'telefone.regex' => 'Telefone inválido',
            'cpf.unique' => 'CPF já está em uso com outro fornecedor',
            'cnpj.unique' => 'CNPJ já está em uso com outro fornecedor'
        ];
    }
}
