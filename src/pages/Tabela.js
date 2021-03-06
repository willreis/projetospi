import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

export const Tabela = () => {
  const [auditTrails, setAuditTrails] = useState([]);
  const [tipoOperacao, setTipoOperacao] = useState([]);
  const [operacao, setOperacao] = useState([]);
  const [ordem, setOrdem] = useState();
  const [ordemValue, setOrdemValue] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    postTipoOperacao();
    postOperacao();
  }, []);

  function validarToken() {
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

  const mountHeader = (token) => {
    return {
      headers: {
        "cache-control": "no-cache",
        "Transfer-Encoding": "chunked",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token.slice(1, -1)}`,
      },
    };
  };

  function postAuditTrail() {
    //VALIDAR TOKEN
    validarToken();

    var tipoOperacaoValue = document.getElementById("tipoOperacao");
    var operacaoValue = document.getElementById("operacao");
    var operacaoText = operacaoValue.options[operacaoValue.selectedIndex].value;
    var tipoOperacaoText = tipoOperacaoValue.options[tipoOperacaoValue.selectedIndex].value;

    //DEFINE O VALOR ORDEM TRANSPORTE
    var ordemValue = parseInt(document.getElementById("ordem").value);
    setOrdemValue(ordemValue);

    //DEFINE O VALOR USER ID
    var uidValue = document.getElementById("userid").value;
    setUserId(uidValue);

    //FILTRO DATA
    var dataHoraInicio = new Date(document.getElementById("dataHoraInicio").value);
    var dataHoraFim = new Date(document.getElementById("dataHoraFim").value);

    console.log(dataHoraInicio);
    console.log(dataHoraFim);

    console.log("TEMPO INICIO", dataHoraInicio.toLocaleTimeString())
    console.log("TEMPO FIM", dataHoraFim.toLocaleTimeString())

    console.log("DATA INICIO COMPLETA", dataHoraInicio.toLocaleDateString())
    console.log("DATA FIM COMPLETA", dataHoraFim.toLocaleDateString())

    var dataInicioFormatada = `${dataHoraInicio.getUTCFullYear()}-${(
      dataHoraInicio.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dataHoraInicio
        .getUTCDate()
        .toString()
        .padStart(2, "0")} ${dataHoraInicio.toLocaleTimeString()}`;

    var dataFimFormatada = `${dataHoraFim.getUTCFullYear()}-${(
      dataHoraFim.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dataHoraFim
        .getUTCDate()
        .toString()
        .padStart(2, "0")} ${dataHoraFim.toLocaleTimeString()}`;

    console.log("DATA INICIO FORMATADA", dataInicioFormatada)
    console.log("DATA FIM FORMATADA", dataFimFormatada)

    // FILTRO ORDEM
    function filtroOrdem(ordemTemp) {
      if (isNaN(ordemTemp)) {
        return -1;
      } else {
        return ordemTemp;
      }
    }

    //FILTRO USER ID
    function filtroUid(uidTemp) {
      if (uidTemp === "") {
        console.log("asdas", uidTemp)
        return "-1";
      } else {
        return uidTemp;
      }
    }

    const token = localStorage.getItem("token");
    axios
      .post(
        `http://52.149.163.55:6161/api/report/getaudittrail`,
        {
          idEmpresa: 1,
          hashkey: "85853456",
          requestUID: "123456",
          idOrdemTransporte: filtroOrdem(ordemValue),
          tipoOperacao: tipoOperacaoText,
          operacao: operacaoText,
          uid: filtroUid(userId),
          dataInicio: dataInicioFormatada,
          dataFim: dataFimFormatada,
        },
        mountHeader(token)
      )
      .then((response) => {
        setAuditTrails(
          response.data.auditTrails.map((get) => {
            console.log("Resposta: ", response.data.auditTrails);
            var dataCriacao = new Date(get.dataCriado)
            var dataCriadoForm = dataCriacao.toLocaleDateString();
            console.log("dfsdfsd", get)
            return {
              idLogOperacao: get.idLogOperacao,
              idEmpresa: get.idEmpresa,
              idOrdemTransporte: get.idOrdemTransporte,
              tipoOperacao: get.tipoOperacao,
              operacao: get.operacao,
              status: get.status,
              uid: get.uid,
              mensagem: get.mensagem,
              dataCriado: get.dataCriado,
            };
          })
        );
      })
      .catch((error) => {
        console.log("Erro: ", error);
      });

    console.log("Tipo Operacao Value: ", tipoOperacaoText);
    console.log("Operacao Value: ", operacaoText);
  }


  function postTipoOperacao() {
    console.log("Chegou aqui!");
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://52.149.163.55:6161/api/report/gettipooperacao`,
        {
          headers: mountHeader(token),
          idEmpresa: 1,
          hashkey: "85853456",
          requestUID: "123456",
        },
        mountHeader(token)
      )
      .then((response) => {
        setTipoOperacao(response.data.tipoOperacao);
      })
      .catch((error) => {
        console.log("Erro: ", error);
      });
  }

  function postOperacao() {
    console.log("Chegou aqui!");
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://52.149.163.55:6161/api/report/getoperacao`,
        {
          headers: mountHeader(token),
          idEmpresa: 1,
          hashkey: "85853456",
          requestUID: "123456",
        },
        mountHeader(token)
      )
      .then((response) => {
        setOperacao(response.data.operacao);
      })
      .catch((error) => {
        console.log("Erro: ", error);
      });
  }

  //paginationFactory (Essa parte tem que ficar acima para ?? dar branco na tela)
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
    nextPageText: "Pr??xima",
    lastPageText: "??ltima",
    nextPageTitle: "Primeira P??gina",
    prePageTitle: "Pre page",
    firstPageTitle: "Pr??xima P??gina",
    lastPageTitle: "??ltima P??gina",
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
      text: "ID Opera????o",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      hidden: true,
    },
    {
      dataField: "idEmpresa",
      text: "ID Empresa",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      hidden: true,
    },
    {
      dataField: "idOrdemTransporte",
      text: "Ordem Transporte",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Ordem",
      }),
    },
    {
      dataField: "tipoOperacao",
      text: "Tipo Opera????o",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Tipo Opera??ao",
      }),
    },
    {
      dataField: "operacao",
      text: "Opera????o",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Opera??ao",
      }),
    },
    {
      dataField: "status",
      text: "Status",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Status",
      }),
    },
    {
      dataField: "mensagem",
      text: "Mensagem",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Mensagem",
      }),
    },
    {
      dataField: "uid",
      text: "Usu??rio",
      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Usuario",
      }),
    },
    {
      dataField: "dataCriado",
      text: "Data",
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return (`${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()} ${('0' + dateObj.getHours()).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}:${('0' + dateObj.getSeconds()).slice(-2)}`)

      },

      headerAlign: "center",
      headerStyle: { backgroundColor: "rgb(109 166 218)", fontSize: "14px" },
      sort: true,
      filter: textFilter({
        placeholder: "Filtrar Data",
      }),
    },
  ];

  return (
    <>
      <div className="paddingContainer">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="tituloInterno">
              <h2 className="titulosPrincipais">Audit Trail</h2>
            </div>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="col-md-2 col-sm-12 mt-3">
              <label for="dataHoraInicio">Data/Hora In??cio</label>
              <input id="dataHoraInicio" type="datetime-local" className="form-control" />
            </div>
            <div className="col-md-2 col-sm-12 mt-3">
              <label for="dataHoraFim">Data/Hora Fim</label>
              <input id="dataHoraFim" type="datetime-local" className="form-control" />
            </div>
            <div className="col-md-2 col-sm-12 mt-3">
              <label for="ordem">Ordem</label>
              <input
                id="ordem"
                type="text"
                className="form-control"
                value={ordem}
              />
            </div>

            <div className="col-md-2 col-sm-12 mt-3">
              <label for="userid">User Id</label>
              <input id="userid" type="text" className="form-control" />
            </div>

            <div class="col-md-2 mt-3">
              <label for="tipoOperacao">Tipo de Opera????o</label>
              <select id="tipoOperacao" type="text" className="form-select">
                <option value="-1">Escolha uma op????o abaixo</option>
                {tipoOperacao.map((getSelect) => (
                  <option value={getSelect}>{getSelect}</option>
                ))}
              </select>
            </div>
            <div class="col-md-2 mt-3">
              <label for="operacao">Opera????o</label>
              <select id="operacao" type="text" className="form-select">
                <option value="-1">Escolha uma op????o abaixo</option>
                {operacao.map((getSelect) => (
                  <option value={getSelect}>{getSelect}</option>
                ))}
              </select>
            </div>

            <div
              className="col-md-2 offset-md-10 col-sm-12"
              Style="display: flex; justify-content: flex-end; align-items: flex-end"
            >
              <Button
                variant="success"
                className="btnGerar"
                onClick={postAuditTrail}
              >
                Gerar
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-5">
          <div className="row">
            <div className="col-md-12 tabelaUsuario">
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

        {/* <div className="row">
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
        </div> */}
      </div>
    </>
  );
};
