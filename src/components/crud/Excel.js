import React from 'react';
import XLSX from 'xlsx/dist/xlsx.mini.min.js';
import { useSelector } from "react-redux";
import * as FaIcons from 'react-icons/fa';


function ExcelExporter(p) {
    const dadosTotais = useSelector((state) => state.reducer);
    const dadosColecao = dadosTotais.dadosColecao;
    const subcollection = dadosTotais.subcollection;

    function exportDataToExcel() {

        // Filtrar os dados com base no uid
        const filteredDadosColecao = p.todosVeem
            ? dadosColecao // Se todosVeem for verdadeiro, todos os dados são selecionados
            : dadosColecao.filter((item) => item.uid === p.userDados.uid); // Filtrar por uid

        // Filtrar os dados das subcoleções com base no uid
        const filteredSubcollection = Object.keys(subcollection).reduce((filtered, key) => {
            const subDocs = subcollection[key];
            const filteredSubDocs = p.todosVeem
                ? subDocs // Se todosVeem for verdadeiro, todos os dados da subcoleção são selecionados
                : subDocs.filter((subDoc) => subDoc.uid === p.userDados.uid); // Filtrar por uid

            return { ...filtered, [key]: filteredSubDocs };
        }, {});


        // Combinar dados da coleção principal e subcoleções
        const combinedData = filteredDadosColecao.flatMap((item) => {
            const subDocs = filteredSubcollection[item.id] || [];
            return [{ ...item }, ...subDocs];
        });
        // Remover a propriedade "uid" de todos os objetos
        const combinedDataWithoutUid = combinedData.map((item) => {
            const { uid, ...rest } = item;
            return rest;
        });
        // Criação do workbook e worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(combinedDataWithoutUid);
        // Iterar sobre as células do worksheet para ajustar o tamanho

        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            let maxTitleLength = 0;

            // Iterar sobre as linhas da coluna atual
            for (let R = range.s.r; R <= range.e.r; ++R) {
                const cellAddress = XLSX.utils.encode_cell({ c: C, r: R });
                const cell = worksheet[cellAddress];
                const cellValue = cell ? cell.v : '';

                // Se for a primeira linha, obter o tamanho do título da coluna
                if (R === range.s.r) {
                    maxTitleLength = cellValue.toString().length;
                } else {
                    // Comparar o tamanho do título com o tamanho da célula
                    const cellLength = cellValue.toString().length;
                    maxTitleLength = Math.max(maxTitleLength, cellLength);
                }
            }

            // Ajustar a largura da coluna com base no tamanho do título
            const newWidth = maxTitleLength + 2; // Adicione uma margem de 2 caracteres
            worksheet['!cols'] = worksheet['!cols'] || [];
            worksheet['!cols'][C] = { wch: newWidth };

        }

        // Adicionar worksheet ao workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

        // Converter workbook em um array buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Criar um blob com o array buffer
        const dataBlob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Criar um URL para o blob
        const url = URL.createObjectURL(dataBlob);

        // Criar um link para download e simular o clique
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dados.xlsx';
        link.click();
    }
    return (
        <button onClick={exportDataToExcel} className="excel-button">
            Exportar para Excel
            <div className="excel-icon">
                <FaIcons.FaChartBar />
            </div>
        </button>
    );
}

export default ExcelExporter;
