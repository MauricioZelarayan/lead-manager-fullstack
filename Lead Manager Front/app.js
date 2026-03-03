// URL backend
const API_URL = "http://localhost:8080/api/leads"; 

export const LeadService = {
    async getAll() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("No se pudieron cargar los datos.");
        return await response.json();
    },
    async create(leadData) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });
        if (!response.ok) throw new Error("No se pudo crear el lead.");
        return await response.json();
    },
    async updateStatus(id, newStatus) {
        // Get the current lead first
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        if (!response.ok) throw new Error("Error al actualizar estado.");
        return await response.json();
    },
    async delete(id) {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Error al eliminar.");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('lead-form');
    const tbody = document.getElementById('leads-body');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const errorMsg = document.getElementById('error-message');

    const loadLeads = async () => {
        try {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#666;">Cargando leads...</td></tr>';
            const leads = await LeadService.getAll();
            renderLeads(leads);
        } catch (error) {
            showError("Error al cargar leads.");
        }
    };

    const renderLeads = (leads) => {
        tbody.innerHTML = '';
        if(leads.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#666;">No hay leads registrados aún.</td></tr>';
            return;
        }
        leads.forEach(lead => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.phone || '-'}</td> <td>
                    <select class="status-select" data-id="${lead.id}">
                        <option value="Nuevo" ${lead.status === 'Nuevo' ? 'selected' : ''}>Nuevo</option>
                        <option value="Contactado" ${lead.status === 'Contactado' ? 'selected' : ''}>Contactado</option>
                    </select>
                </td>
                <td><button class="btn-delete" data-id="${lead.id}">Eliminar</button></td>
            `;
            tbody.appendChild(tr);
        });
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        btnText.textContent = "Guardando...";

        const newLead = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            status: "Nuevo"
        };

        try {
            await LeadService.create(newLead);
            form.reset();
            await loadLeads(); 
        } catch (error) {
            showError(error.message);
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = "Agregar Lead";
        }
    });

    tbody.addEventListener('change', async (e) => {
        if (e.target.classList.contains('status-select')) {
            const id = e.target.getAttribute('data-id');
            const newStatus = e.target.value;
            e.target.disabled = true;
            try {
                await LeadService.updateStatus(id, newStatus);
            } catch (error) {
                showError(error.message);
            } finally {
                e.target.disabled = false;
            }
        }
    });

    tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const id = e.target.getAttribute('data-id');
            const row = e.target.closest('tr');
            const name = row.cells[0].textContent;

            // Confirmation logic
            const confirmed = confirm(`¿Estás seguro de que quieres eliminar al lead "${name}"?`);
            
            if (confirmed) {
                row.style.opacity = '0.5';
                try {
                    await LeadService.delete(id);
                    row.remove();
                } catch (error) {
                    showError(error.message);
                    row.style.opacity = '1';
                }
            }
            // ------------------------------------
        }
    });

    const showError = (msg) => {
        errorMsg.textContent = msg;
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 4000);
    };

    loadLeads();
});