import React, { useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import { VscEdit } from 'react-icons/vsc';
import Api2 from '../services/Api2'
import { useEffect } from 'react';

export const Tabela = () => {

  const [auditTrails, setAuditTrails] = useState([]);
  const [tipoOperacao, setTipoOperacao] = useState([]);
  const [operacao, setOperacao] = useState([]);

  useEffect(() => {
    postTipoOperacao()
    postOperacao()
  }, []);

  function validarToken()
  {
    let token = localStorage.getItem("token");
    let decodedToken = jwt_decode(token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      window.location.href = "/";
    } else {
      console.log("Valid token");   
    }
  } 

  const mountHeader = async (token) => {
    return {
      "cache-control": "no-cache",
      "Transfer-Encoding": "chunked",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${await token}`,
    };
  };

  function postAuditTrail() {
    var tipoOperacaoValue = document.getElementById("tipoOperacao");
    var operacaoValue = document.getElementById("operacao");
    var operacaoText = operacaoValue.options[operacaoValue.selectedIndex].value;
    var tipoOperacaoText = tipoOperacaoValue.options[tipoOperacaoValue.selectedIndex].value;  

    validarToken();

    const token = localStorage.getItem('token');
    axios.post(`http://52.149.163.55:6161/api/report/getaudittrail`, {
      headers: mountHeader(token),
      idEmpresa: 1,
      hashkey: "85853456",
      requestUID: "123456",
      idOrdemTransporte: -1,
      tipoOperacao: tipoOperacaoText,
      operacao: operacaoText,
      uid: "-1",
      dataInicio: "2022-04-01 00:00:01",
      dataFim: "2022-04-04 23:59:59"
    })
      .then((response) => {
        setAuditTrails(
          response.data.auditTrails.map((get) => {
            console.log("Resposta: ", response.data.auditTrails);
            return {
              idLogOperacao: get.idLogOperacao,
              idEmpresa: get.idEmpresa,
              idOrdemTransporte: get.idOrdemTransporte,
              tipoOperacao: get.tipoOperacao,
              operacao: get.operacao,
              sucesso: get.sucesso,
              mensagem: get.mensagem,
            }
          })
        )
      })
      .catch((error) => {
        console.log("Erro: ", error);
      })

    console.log("Tipo Operacao Value: ", tipoOperacaoText);
    console.log("Operacao Value: ", operacaoText);
  }

  function postTipoOperacao() {
    console.log("Chegou aqui!")
    const token = localStorage.getItem('token');
    axios.post(`http://52.149.163.55:6161/api/report/gettipooperacao`, {
      headers: mountHeader(token),
      idEmpresa: 1,
      hashkey: "85853456",
      requestUID: "123456"
    })
      .then((response) => {
        setTipoOperacao(
          response.data.tipoOperacao
        )
      })
      .catch((error) => {
        console.log("Erro: ", error);
      })
  }

  function postOperacao() {
    console.log("Chegou aqui!")
    const token = localStorage.getItem('token');
    axios.post(`http://52.149.163.55:6161/api/report/getoperacao`, {
      headers: mountHeader(token),
      idEmpresa: 1,
      hashkey: "85853456",
      requestUID: "123456"
    })
      .then((response) => {
        setOperacao(
          response.data.operacao
        )
      })
      .catch((error) => {
        console.log("Erro: ", error);
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

  const columns = [
    {
      dataField: "idLogOperacao",
      text: "ID Operação",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Ordem",
      }),
    },
    {
      dataField: "idEmpresa",
      text: "ID Empresa",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Máquina",
      }),
    },
    {
      dataField: "idOrdemTransporte",
      text: "ID Ordem Transporte",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data Início",
      }),
    },
    {
      dataField: "tipoOperacao",
      text: "Tipo Operação",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data Fim",
      }),
    },
    {
      dataField: "operacao",
      text: "Operação",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data Fim",
      }),
    },
    {
      dataField: "sucesso",
      text: "Sucesso",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data Fim",
      }),
    },
    {
      dataField: "mensagem",
      text: "Mensagem",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(151 151 151)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data Fim",
      }),
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
                onClick={postAuditTrail}
              >
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

            <div class="col-md-3 mt-3">
              <label for="tipoOperacao">Select 1</label>
              <select
                id="tipoOperacao"
                type="text"
              // value={mesaSaidaId}
              // onChange={validadacaoMesa}
              >
                <option value="-1">Escolha uma opção abaixo</option>
                {tipoOperacao.map((getSelect) => (
                  <option value={getSelect}>
                    {getSelect}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-3 mt-3">
              <label for="operacao">Select 2</label>
              <select
                id="operacao"
                type="text"
              // value={mesaSaidaId}
              // onChange={validadacaoMesa}
              >
                <option value="-1">Escolha uma opção abaixo</option>
                {operacao.map((getSelect) => (
                  <option value={getSelect}>
                    {getSelect}
                  </option>
                ))}
              </select>
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
                data={auditTrails}
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