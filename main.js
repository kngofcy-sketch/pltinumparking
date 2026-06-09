/**
 * APS Platinum Cloud 2026 - Main Logic [cite: 1]
 * Implements SPA routing, form handling, and live VPS simulations.
 */

// --- SPA Routing System ---
function switchView(viewId) {
    // Hide all views
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active');
    });

    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active');
    }

    // Highlight active nav button
    const activeBtn = document.querySelector(`button[onclick="switchView('${viewId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// --- B2B Portal Form Logic ---
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    const form = event.target;
    const formData = new FormData(form);
    
    // Construct JSON payload
    const payload = {
        venue: formData.get('venue'),
        capacity: parseInt(formData.get('capacity'), 10),
        timestamp: new Date().toISOString()
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const feedbackMsg = document.getElementById('form-feedback');

    // Simulate Network Request (API v2.0 - 0.8s Latency) [cite: 38, 39]
    submitBtn.disabled = true;
    submitBtn.textContent = 'Procesando...';

    setTimeout(() => {
        console.log('B2B Payload sent to VPS:', payload);
        
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Solicitar Integración';
        
        feedbackMsg.textContent = `Integración solicitada con éxito para ${payload.venue}. Endpoint generado en 0.8s.`;
        feedbackMsg.classList.remove('hidden');

        // Hide feedback after 5 seconds
        setTimeout(() => {
            feedbackMsg.classList.add('hidden');
        }, 5000);

    }, 800); // 0.8s latency simulation
}

// --- Digital Ticket Interaction ---
function requestVehicle() {
    const btn = document.getElementById('req-vehicle-btn');
    btn.textContent = "Validando Token...";
    
    setTimeout(() => {
        btn.style.backgroundColor = "#28a745"; // Success green
        btn.textContent = "Vehículo en Camino";
        
        setTimeout(() => {
            btn.style.backgroundColor = "var(--accent)";
            btn.textContent = "Solicitar Vehículo Ahora";
        }, 4000);
    }, 800); // 0.8s latency simulation [cite: 38, 39]
}

// --- Flight Deck Live Simulation ---
let occupancy = 142;
let revenue = 3450.00;

function simulateFlightDeck() {
    const occupancyEl = document.getElementById('live-occupancy');
    const revenueEl = document.getElementById('live-revenue');
    const terminalLogs = document.getElementById('terminal-logs');

    setInterval(() => {
        // Randomly simulate a vehicle entering or leaving (-1, 0, or +1)
        const change = Math.floor(Math.random() * 3) - 1; 
        
        if (change !== 0) {
            occupancy += change;
            
            // If a vehicle enters (+1), simulate revenue increase (Stripe charge)
            if (change > 0) {
                revenue += 25.00; // Flat rate simulation
                addTerminalLog(`[API] Webhook Stripe recibido: +$25.00 [cite: 25]`);
            }
            
            // Update DOM
            occupancyEl.textContent = occupancy;
            revenueEl.textContent = `$${revenue.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
            
            addTerminalLog(`[VPS] Actualización de aforo: ${occupancy} vehículos. Latencia: 0.${Math.floor(Math.random() * 9)}s [cite: 39]`);
        }
    }, 4500); // Run every 4.5 seconds
}

function addTerminalLog(message) {
    const terminalLogs = document.getElementById('terminal-logs');
    const timestamp = new Date().toLocaleTimeString();
    const newLog = document.createElement('p');
    newLog.textContent = `> [${timestamp}] ${message}`;
    
    terminalLogs.appendChild(newLog);
    
    // Auto-scroll to bottom
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
}

// Initialize simulations on load
document.addEventListener('DOMContentLoaded', () => {
    simulateFlightDeck();
});
