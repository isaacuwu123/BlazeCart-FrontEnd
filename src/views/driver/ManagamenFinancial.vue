<template>
    <div class="p-6">
        <h2 class="mb-4 text-2xl font-bold">Mis Transacciones</h2>
        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-4">
            <div>
                <label class="block mb-2 text-sm font-medium">Negocio</label>
                <select
                    v-model="filtros.negocio_id"
                    class="input-field"
                    @change="fetchTransactions"
                >
                    <option value="">Todos</option>
                    <option v-for="negocio in negocios" :key="negocio.id" :value="negocio.id">
                        {{ negocio.nombre }}
                    </option>
                </select>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium">Fecha Desde</label>
                <input
                    v-model="filtros.fecha_desde"
                    type="date"
                    class="input-field"
                    @change="fetchTransactions"
                />
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium">Fecha Hasta</label>
                <input
                    v-model="filtros.fecha_hasta"
                    type="date"
                    class="input-field"
                    @change="fetchTransactions"
                />
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium">Tipo</label>
                <select
                    v-model="filtros.tipo_transaccion"
                    class="input-field"
                    @change="fetchTransactions"
                >
                    <option value="">Todos</option>
                    <option value="Ingreso">Ingreso</option>
                    <option value="Egreso">Egreso</option>
                </select>
            </div>
        </div>

        <div v-if="loading" class="p-4 text-center">
            <p>Cargando transacciones...</p>
        </div>
        <div v-else-if="error" class="p-4 text-red-500">
            {{ error }}
        </div>
        <div v-else>
            <div class="mb-4">
                <p><strong>Total Ingresos:</strong> ${{ estadisticas.total_ingresos }}</p>
                <p><strong>Total Egresos:</strong> ${{ estadisticas.total_egresos }}</p>
                <p><strong>Balance:</strong> ${{ estadisticas.balance }}</p>
                <p><strong>Total Transacciones:</strong> {{ estadisticas.total_transacciones }}</p>
            </div>
            <table class="w-full border-collapse">
                <thead>
                    <tr class="text-white bg-gray-800">
                        <th class="p-2">Fecha</th>
                        <th class="p-2">Item</th>
                        <th class="p-2">Tipo</th>
                        <th class="p-2">Importe</th>
                        <th class="p-2">Negocio</th>
                        <th class="p-2">Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaccion in transacciones" :key="transaccion.id" class="border-b">
                        <td class="p-2">{{ formatDate(transaccion.fecha) }}</td>
                        <td class="p-2">{{ transaccion.item }}</td>
                        <td class="p-2">{{ transaccion.tipo_de_transaccion }}</td>
                        <td class="p-2">
                            ${{
                                parseFloat(transaccion.importe_total).toLocaleString('es-MX', {
                                    minimumFractionDigits: 2,
                                })
                            }}
                        </td>
                        <td class="p-2">{{ transaccion.negocio?.nombre || 'N/A' }}</td>
                        <td class="p-2">
                            {{ transaccion.categoria?.descripcion || 'Sin Categoría' }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-between mt-4">
                <button
                    @click="cambiarPagina(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="btn"
                >
                    Anterior
                </button>
                <span>Página {{ pagination.current_page }} de {{ pagination.last_page }}</span>
                <button
                    @click="cambiarPagina(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="btn"
                >
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { businessesActives } from '@/services/BusinessService';
import { getUserTransactions } from '@/services/TransactionFinancialService';
import { onMounted, ref } from 'vue';

const transacciones = ref([]);
const estadisticas = ref({});
const pagination = ref({});
const loading = ref(false);
const error = ref('');
const negocios = ref([]);
const filtros = ref({
    negocio_id: '',
    fecha_desde: '',
    fecha_hasta: '',
    tipo_transaccion: '',
    page: 1,
    per_page: 15,
});

const fetchTransactions = async () => {
    loading.value = true;
    error.value = '';
    try {
        const { data } = await getUserTransactions(filtros.value);
        transacciones.value = data.data || [];
        estadisticas.value = data.estadisticas_rapidas || {};
        pagination.value = data.pagination || {};
    } catch (err) {
        error.value = err.response?.data?.message || 'Error al cargar transacciones';
    } finally {
        loading.value = false;
    }
};

const cambiarPagina = page => {
    if (page >= 1 && page <= pagination.value.last_page) {
        filtros.value.page = page;
        fetchTransactions();
    }
};

const formatDate = dateString => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

onMounted(async () => {
    try {
        const { data } = await businessesActives();
        negocios.value = data.datos || [];
        await fetchTransactions();
    } catch (err) {
        error.value = 'Error al cargar datos iniciales';
    }
});
</script>

<style scoped>
.input-field {
    @apply w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100;
}
.btn {
    @apply py-2 px-4 rounded-full bg-orange-400 hover:bg-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
