import { http, httpAsset, httpDownload, urlBase, urlBaseAsset } from './http';
export const indexTransactionFinancialAll = filtros => {
    return http().get(`${urlBase}/transaction-financial`, { params: filtros });
};
export const saveTransactionFinancialAdmin = data => {
    return httpAsset().post(`${urlBase}/transaction-financial/admin`, data);
};

export const showFinancialTransaction = id => {
    return http().get(`${urlBase}/transaction-financial/${id}`);
};

export const updateFinancialTransaction = (id, data) => {
    return httpAsset().post(`${urlBase}/transaction-financial/${id}`, data);
};

export const deleteFinancialTransaction = id => {
    return http().delete(`${urlBase}/transaction-financial/${id}`);
};
export const changeStateFinancialTransaction = (id, data) => {
    return http().put(`${urlBase}/transaction-financial/${id}/state`, data);
};
// Nueva función para exportar a Excel
export const exportTransactionFinancialExcel = filtros => {
    return httpDownload().get(`${urlBase}/transactions/export`, {
        params: filtros,
    });
};

export const importTransactionFinancial = formData => {
    return httpAsset().post(`${urlBase}/transactions/import`, formData);
};

// Agregar esta nueva función
export const downloadTransactionFinancialTemplate = () => {
    return httpDownload().get(`${urlBaseAsset}/transactions/plantilla`);
};

export const saveTransactionFinancialDriver = data => {
    return httpAsset().post(`${urlBase}/transaction-financial-driver/new/driver`, data);
};

export const getUserTransactions = filtros => {
    return http().get(`${urlBase}/transaction-financial-driver/user-transactions`, {
        params: filtros,
    });
};
export const getUserPaymentPendings = filtros => {
    return http().get(`${urlBase}/transaction-financial-driver/payment-pendings`, {
        params: filtros,
    });
};
export const exportTransactionsToExcelDriver = filtros => {
    return httpDownload().get(`${urlBase}/transaction-financial-driver/excel-driver`, {
        params: filtros,
    });
};
//ereports

export const getAllBusinessesFinancialStatement = filtros => {
    return http().get(
        `${urlBase}/transaction-financial-report/all-businesses-financial-statement`,
        {
            params: filtros,
        }
    );
};

export const getFinancialTransacctionsLeaseOnVehicles = filtros => {
    return http().get(`${urlBase}/transaction-financial-report/lease-on-vehicles`, {
        params: filtros,
    });
};

export const exportVehicleFinancialStatementToExcel = filtros => {
    return httpDownload().get(
        `${urlBase}/financial-report/export-vehicle-financial-statement-to-excel`,
        { params: filtros }
    );
};

export const exportVehiclesFinancialStatementByBusinessToExcel = filtros => {
    return httpDownload().get(
        `${urlBase}/financial-report/export-vehicles-financial-statement-by-business-to-excel`,
        { params: filtros }
    );
};

export const exportAllBusinessesFinancialStatementToExcel = filtros => {
    return httpDownload().get(
        `${urlBase}/financial-report/export-all-businesses-financial-statement-to-excel`,
        { params: filtros }
    );
};
export const exportExpensesByCategoryByBusinessToExcel = filtros => {
    return httpDownload().get(
        `${urlBase}/financial-report/export-expenses-by-category-by-business-to-excel`,
        { params: filtros }
    );
};

export const exportBusinessWithHighestExpenseToExcel = filtros => {
    return httpDownload().get(
        `${urlBase}/financial-report/export-business-with-highest-expense-to-excel`,
        { params: filtros }
    );
};

export const exportLeaseOnVehiclesWithExpensesToExcel = filtros => {
    return httpDownload().get(
        `${urlBase}/financial-report/export-lease-on-vehicles-with-expenses-to-excel`,
        { params: filtros }
    );
};
//obtener estados de resultados
export const generateFinancialStatement = data => {
    return http().post(`${urlBase}/financial-report/statement-range`, data);
};
export const exportToPDF = data => {
    return httpDownload().post(`${urlBase}/financial-report/export-pdf`, data);
};
export const exportToExcel = data => {
    return httpDownload().post(`${urlBase}/financial-report/export-excel`, data);
};
//Obtener egresos por categoria
export const getFinancialTransacctionsExpensesByCategory = filtros => {
    return http().get(`${urlBase}/financial-report/expenses-by-category`, {
        params: filtros,
    });
};
//Obtener ingresos por categoria
export const exportToExcelIngresos = filtros => {
    return httpDownload().get(`${urlBase}/financial-report/export-incomes-excel`, {
        params: filtros,
    });
};

export const exportToPDFIngresos = filtros => {
    return httpDownload().get(`${urlBase}/financial-report/export-incomes-by-category-pdf`, {
        params: filtros,
    });
};

export const getFinancialTransacctionsIncomesByCategory = filtros => {
    return http().get(`${urlBase}/financial-report/incomes-by-category`, {
        params: filtros,
    });
};

//Obtener negocio con mayor egreso
export const getFinancialTransacctionsBusinessHighestExpense = filtros => {
    return http().get(`${urlBase}/financial-report/business-highest-expense`, {
        params: filtros,
    });
};

//Obtener vehiculos del negocio
export const getVehicleFinancialStatement = filtros => {
    return http().get(`${urlBase}/financial-report/vehicle-financial-statement`, {
        params: filtros,
    });
};
export const getVehiclesFinancialStatementByBusiness = filtros => {
    return http().get(`${urlBase}/financial-report/vehicles-financial-statement`, {
        params: filtros,
    });
};

//Obtener rendimientos de cajas operativas
export const getOperatingBoxRendimiento = filtros => {
    return http().get(`${urlBase}/financial-report/rendicion-cajas-operativas`, {
        params: filtros,
    });
};

// Exportar a Excel
export const exportOperatingBoxExcel = filtros => {
    return httpDownload().get(`${urlBase}/financial-report/rendicion-cajas-operativas/excel`, {
        params: filtros,
        responseType: 'blob',
    });
};

// Exportar a PDF
export const exportOperatingBoxPDF = filtros => {
    return httpDownload().get(`${urlBase}/financial-report/rendicion-cajas-operativas/pdf`, {
        params: filtros,
        responseType: 'blob',
    });
};

//Obtener datos relevantes

export const getOperationReport = filtros => {
    return http().post(`${urlBase}/financial-report/operation`, filtros);
};
export const getOperationSummary = filtros => {
    return http().post(`${urlBase}/financial-report/operation-summary`, filtros);
};

export const getDailyProductivity = filtros => {
    return http().post(`${urlBase}/financial-report/daily-productivity`, filtros);
};

export const exportToExcel2 = filtros => {
    return http().post(`${urlBase}/financial-report/export-excel`, filtros);
};
