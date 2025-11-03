import { http, urlBase } from './http';
export const operatingBoxHistories = (id, filtros) => {
    return http().get(`${urlBase}/operating-boxes/${id}/history`, filtros);
};
export const payRefundTransaction = historyId => {
    return http().post(`${urlBase}/operating-box-history/${historyId}/pay-refund`);
};
