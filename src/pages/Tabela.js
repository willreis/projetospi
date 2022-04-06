import React from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import { VscEdit } from 'react-icons/vsc';
import Api2 from '../services/Api2'

export const Tabela = () => {

const [idEmpresa,setIdEmpresa] = useState();
const [hashkey,setHashkey] = useState();
const [requestUID,setRequestUID] = useState();
const [idOrdemTransporte,setIdOrdemTransporte] = useState();
const [tipoOperacao,setTipoOperacao] = useState();
const [operacao1,setOperacao1] = useState();
const [uid1,setUid1] = useState();
const [dataInicio,setDataInicio] = useState();
const [dataFim,setDataFim] = useState();

  function postLogin() {
    axios.post(`http://52.149.163.55:6161/api/authentication/login`, {
      idEmpresa:idEmpresa,
      hashkey: "85853456",
      uid,
      password,
      versao: "0.0.3",
    })
  }

  //paginationFactory (Essa parte tem que ficar acima para ñ dar branco na tela)
  const customTotal = (from, to, size) => (
    <span>
      Mostrando de {from} a {to} do total de {size} Resultados
    </span>
  );

  //paginationFactory
  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    //alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "Primeiro",
    prePageText: "Voltar",
    nextPageText: "Próxima",
    lastPageText: "Última",
    nextPageTitle: "Primeira Página",
    prePageTitle: "Pre page",
    firstPageTitle: "Próxima Página",
    lastPageTitle: "Última Página",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
      },
    ],
  };

  // Passando os dados na mão!
  const products = [
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
    {
      ordem: 132,
      nomedaMaquina: "P3",
      dataInicioDoProcesso: "15/03/2022",
      dataFimDoProcesso: "20/03/2022",
    },
  ];

  const columns = [
    {
      dataField: "ordem",
      text: "Ordem",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Ordem",
      }),
    },
    {
      dataField: "nomedaMaquina",
      text: "Nome da Máquina",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Máquina",
      }),
    },
    {
      dataField: "dataInicioDoProcesso",
      text: "Data Início do Processo",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data Início",
      }),
    },
    {
      dataField: "dataFimDoProcesso",
      text: "Data Fim do Processo",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data Fim",
      }),
    },
    {
      dataField: "opcoes",
      text: "Opções",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      formatter: (cellContent, row) => {
        return (
          <>
            <span
              className="spanTabela"
              // id={row.impressoraId}
              Style="cursor:pointer"
              // onClick={() => { funcaoAbrirModalPut(row) }}
              data-toggle="tooltip" data-placement="left" title="Editar"
            >
              <VscEdit />
            </span>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="paddingContainer">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="tituloInterno">
              <h2 className="titulosPrincipais">Tabela de Dados Fictícios</h2>
            </div>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="col-md-3 col-sm-12 mt-3">
              <label for='dataHoraInicio'>Data/Hora Início</label>
              <input id='dataHoraInicio' type="date" className="form-control"
              // Value={ordemProducao.la}
              // onChange={(e) => setLa(parseInt(e.target.value))}
              // readOnly
              />
            </div>
            <div className="col-md-3 col-sm-12 mt-3">
              <label for='dataHoraFim'>Data/Hora Fim</label>
              <input id='dataHoraFim' type="date" className="form-control"
              // Value={ordemProducao.ordem}
              // onChange={(e) => setOrdem(parseInt(e.target.value))}
              />
            </div>
            <div className="col-md-3 col-sm-12 mt-3">
              <label for='ordem'>Ordem</label>
              <input id='ordem' type="text" className="form-control"
              // Value={ordemProducao.status}
              // onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-md-3 col-sm-12 mt-3">
              
                <Button variant="success" Style='width: 100%; height: 2.4rem; margin-top: 1.4rem' 
                onClick={Api2}>
                  Validar
                </Button>
              
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 col-sm-12 mt-3">
              <label for='item'>Item</label>
              <input id='item' type="text" className="form-control"
              // Value={ordemProducao.verificada}
              // onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-md-3 col-sm-12 mt-3">
              <label for='ovm'>OVM</label>
              <input id='ovm' type="text" className="form-control"
              // Value={ordemProducao.titulo}
              // onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="col-md-3 col-sm-12 mt-3">
              <label for='op'>OP</label>
              <input id='op' type="text" className="form-control"
              // Value={ordemProducao.familia}
              // onChange={(e) => setFamilia(e.target.value)}
              />
            </div>
            <div className="col-md-3 col-sm-12" Style='display: flex; justify-content: flex-end; align-items: flex-end'>
              <Button variant="primary" Style='width: 100%; height: 2.4rem'>
                Gerar
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <div className="row">
            <div className="col-md-12 tabelaUsuario" >
              <BootstrapTable
                keyField="inserirUmKeyfieldDepois"
                hover
                striped
                columns={columns}
                data={products}
                // selectRow={selectRow}
                filter={filterFactory()}
                pagination={paginationFactory(options)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2 col-sm-12" Style='margin-right: 1rem'>
            <Button variant="secondary" className="btnAbrirProducao" Style='width: 200px'>
              Exportar PDF
            </Button>
          </div>
          <div className="col-md-2 col-sm-12">
            <Button variant="secondary" className="btnAbrirProducao" Style='width: 200px'>
              Exportar Excel
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}