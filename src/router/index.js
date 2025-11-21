import AdminLayout from '@/layouts/AdminLayout.vue';
import DriverLayout from '@/layouts/DriverLayout.vue';
import DatosRelevantes from '@/views/admin/Dashboard/DatosRelevantes.vue';
import EgresosPorCategoria from '@/views/admin/Dashboard/EgresosPorCategoria.vue';
import EstadosDeResultado from '@/views/admin/Dashboard/EstadosDeResultado.vue';
import IngresosPorNegocio from '@/views/admin/Dashboard/IngresosPorNegocio.vue';
import NegocioConMayorEgreso from '@/views/admin/Dashboard/NegocioConMayorEgreso.vue';
import RendicionDeCajasOperativas from '@/views/admin/Dashboard/RendicionDeCajasOperativas.vue';
import TodosLosNegociosEstadosDeResultados from '@/views/admin/Dashboard/TodosLosNegociosEstadosDeResultados.vue';
import VehiculosDelNegocio from '@/views/admin/Dashboard/VehiculosDelNegocio.vue';
import DriversView from '@/views/admin/Driver/DriversView.vue';
import CategoryFinancialTransaccion from '@/views/admin/Finanzas/CategoryFinancialTransaccion.vue';
import FormFinancialAdmin from '@/views/admin/Finanzas/FormFinancialAdmin.vue';
import MovementsBox from '@/views/admin/Finanzas/MovementsBox.vue';
import OperatingBoxManagement from '@/views/admin/Finanzas/OperatingBoxManagement.vue';
import PaymentPending from '@/views/admin/Finanzas/PaymentPending.vue';
import TransactionFinancial from '@/views/admin/Finanzas/TransactionFinancial.vue';
import DriverDocumentInfo from '@/views/admin/infoSystem/DriverDocumentInfo.vue';
import DriversInfo from '@/views/admin/infoSystem/DriversInfo.vue';
import FormTransacction from '@/views/admin/infoSystem/FormTransacction.vue';
import TransacctionsInfo from '@/views/admin/infoSystem/TransacctionsInfo.vue';
import UsersInfo from '@/views/admin/infoSystem/UsersInfo.vue';
import VehicleDocumentsInfo from '@/views/admin/infoSystem/VehicleDocumentsInfo.vue';
import VehicleInfo from '@/views/admin/infoSystem/VehicleInfo.vue';
import VehicleMaintenceInfo from '@/views/admin/infoSystem/VehicleMaintenceInfo.vue';
import BusinessManagementAdmin from '@/views/admin/Settings/BusinessManagementAdmin.vue';
import CategoryManagement from '@/views/admin/Settings/CategoryManagement.vue';
import PayMethodManagementAdmin from '@/views/admin/Settings/PayMethodManagementAdmin.vue';
import TransacctionStateManagementAdmin from '@/views/admin/Settings/TransacctionStateManagementAdmin.vue';
import MaintenanceManagementView from '@/views/admin/Truck/MaintenanceManagementView.vue';
import TruckDocuments from '@/views/admin/Truck/TruckDocuments.vue';
import UsersView from '@/views/admin/User/UsersView.vue';
import LoginView from '@/views/auth/loginView.vue';
import ManagamenFinancial from '@/views/driver/ManagamenFinancial.vue';
import PaymentPendingView from '@/views/driver/PaymentPendingView.vue';
import NotFound from '@/views/NotFound.vue';
import Unauthorized from '@/views/Unauthorized.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/driver-panel',
            component: DriverLayout,
            children: [
                {
                    path: '/driver/dashboard',
                    name: 'dashboard-driver',
                    component: () => import('@/views/driver/DashboardDriverView.vue'),
                },
                {
                    path: '/formulario',
                    name: 'formulario',
                    component: () => import('@/views/driver/FormFinancialView.vue'),
                },
                {
                    path: '/driver/gestion-transacciones-financieras',
                    name: 'gestion-transacciones-financieras',
                    component: () => import('@/views/driver/ManagamentFinancialDriverView.vue'),
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('@/views/admin/User/ProfileView.vue'),
                },
                {
                    path: '/driver/gestion-pagos-pendientes',
                    component: PaymentPendingView,
                },
            ],
        },
        {
            path: '/admin-panel',
            component: AdminLayout,
            children: [
                {
                    path: '/info-users',
                    name: 'info_users',
                    component: UsersInfo,
                },
                {
                    path: '/info-drivers',
                    name: 'info_drivers',
                    component: DriversInfo,
                },
                {
                    path: '/info-drivers-documents',
                    name: 'info_drivers_documents',
                    component: DriverDocumentInfo,
                },
                {
                    path: '/info-vehiculo',
                    name: 'vehicle',
                    component: VehicleInfo,
                },
                {
                    path: '/info-vehiculo-documents',
                    name: 'vehicle documents',
                    component: VehicleDocumentsInfo,
                },
                {
                    path: '/info-form-transacciones',
                    name: 'form transactions',
                    component: FormTransacction,
                },
                {
                    path: '/info-transacciones',
                    name: 'info transactions',
                    component: TransacctionsInfo,
                },
                {
                    path: '/info-vehiculo-mantenimiento',
                    name: 'vehicle maintenance',
                    component: VehicleMaintenceInfo,
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/admin/DashboardView.vue'),
                },
                {
                    path: '/perfil',
                    name: 'perfil',
                    component: () => import('@/views/admin/User/ProfileView.vue'),
                },
                {
                    path: '/usuarios',
                    name: 'usuarios',
                    component: UsersView,
                },
                {
                    path: '/camiones',
                    name: 'camiones',
                    component: () => import('@/views/admin/Truck/TruckManagementView.vue'),
                },
                {
                    path: '/camiones/mantenimientos',
                    name: 'camiones.mantenimientos',
                    component: MaintenanceManagementView,
                },
                {
                    path: '/conductores',
                    name: 'conductores',
                    component: () => import('@/views/admin/Driver/DriverManagementView.vue'),
                },
                {
                    path: '/conductores/documentos',
                    name: 'conductores.documentos',
                    component: () => import('@/views/admin/Driver/DriverDocuments.vue'),
                },
                {
                    path: '/camiones/documentos',
                    name: 'camiones.documentos',
                    component: TruckDocuments,
                },
                {
                    path: '/inversionistas/documentos',
                    name: 'documentacion.inversionistas',
                    component: () => import('@/views/admin/Investor/InvestorDocuments.vue'),
                },
                {
                    path: '/transacciones-financieras',
                    name: 'transacciones-financieras',
                    component: TransactionFinancial,
                },
                {
                    path: '/estado-resultado',
                    name: 'estados-resultados',
                    component: CategoryFinancialTransaccion,
                },
                {
                    path: '/transacciones-financieras-2',
                    /*  name: 'estados-resultados', */
                    component: ManagamenFinancial,
                },
                {
                    path: '/caja-operativa',
                    /*  name: 'estados-resultados', */
                    component: OperatingBoxManagement,
                },
                {
                    path: '/categorias-admin',
                    component: CategoryManagement,
                },
                {
                    path: '/movimientos-caja',
                    component: MovementsBox,
                },
                {
                    path: '/categoria-financial',
                    component: CategoryFinancialTransaccion,
                },
                {
                    path: '/form-financial-admin',
                    component: FormFinancialAdmin,
                },
                {
                    path: '/negocios-admin',
                    component: BusinessManagementAdmin,
                },
                {
                    path: '/metodos-pagos-admin',
                    component: PayMethodManagementAdmin,
                },
                {
                    path: '/estados-transaccion',
                    component: TransacctionStateManagementAdmin,
                },
                {
                    path: '/estados-resultados',
                    component: EstadosDeResultado,
                },
                {
                    path: '/egresos-por-categoria',
                    component: EgresosPorCategoria,
                },
                {
                    path: '/ingresos-por-negocio',
                    component: IngresosPorNegocio,
                },
                {
                    path: '/negocio-con-mayor-egresos',
                    component: NegocioConMayorEgreso,
                },
                {
                    path: '/vehiculos-del-negocio',
                    component: VehiculosDelNegocio,
                },
                {
                    path: '/todos-los-negocios-financieros',
                    component: TodosLosNegociosEstadosDeResultados,
                },
                {
                    path: '/rendicion-de-cajas-operativas',
                    component: RendicionDeCajasOperativas,
                },
                {
                    path: '/datos-revelantes',
                    component: DatosRelevantes,
                },
                {
                    path: '/pagos-pendientes',
                    name: 'pagos-pendientes',
                    component: PaymentPending,
                },
                {
                    path: '/conductores2',
                    component: DriversView,
                },
            ],
        },
        {
            path: '/unauthorized',
            component: Unauthorized,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
        },
    ],
});

export default router;
