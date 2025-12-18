// Datos del programa (canciones y actividades)
const programData = [
    { type: 'activity', title: 'Entrada', subtitle: 'Entrada de la quinceañera' },
    { type: 'song', title: 'No Crezcas Más', subtitle: 'Canción instrumental' },
    { type: 'activity', title: 'Ceremonia', subtitle: 'Palabras ceremoniales' },
    { type: 'song', title: 'Princesas Mágicas', subtitle: 'Canción temática', youtubeLink: 'https://youtu.be/Zt1rXzYidso?si=pdOMevgLf1PWgtiD' },
    { type: 'activity', title: 'Felicitaciones', subtitle: 'Felicitar a la quinceañera' },
    { type: 'song', title: 'No Crezcas Más', subtitle: 'Canción sobre la niñez', youtubeLink: 'https://youtu.be/4xwMr__1frY?si=cGwJy5eFDV_YALSn' },
    { type: 'song', title: 'Audio', subtitle: 'Playback audio' },
    { type: 'song', title: 'La Ciudad Hermosa', subtitle: 'Canción de apertura', youtubeLink: 'https://youtu.be/wLU4H2VW6LY?si=kCA4LHlKPgIP7kpZ' },
    { type: 'song', title: 'Popurri Armonía Band', subtitle: 'Popurrí musical', youtubeLink: 'https://youtu.be/kx_hE_FNxVU?si=5jMoCoRxcAO2sgyy' },
    { type: 'song', title: 'Gloriosa Mañana - Demos Gracia...', subtitle: 'El combo del rey medley', youtubeLink: 'https://youtu.be/Ak2CiDJhIzM?si=7DMrUJJHNyjfliNI' },
    { type: 'song', title: 'Mix Salsa', subtitle: 'Si tuvieras fe - este cortos es - oh Jerusalén', youtubeLink: 'https://youtu.be/A4qj5tkohmg' },
    { type: 'song', title: 'Valle de Lágrimas', subtitle: 'Canción emotiva', youtubeLink: 'https://youtu.be/Mewr1YGX150?list=RDMewr1YGX150' },
    { type: 'song', title: 'Salmos 23', subtitle: 'Canto espiritual', youtubeLink: 'https://youtu.be/NinAkppED30?si=awx5QSHBd_4bSCvZ' },
    { type: 'song', title: 'Cien Ovejas', subtitle: 'Canción infantil', youtubeLink: 'https://youtu.be/KpeGa5RL5lc?si=3N910C0AnxZ97ceB' },
    { type: 'song', title: 'Agradecimiento', subtitle: 'Canción de acción de gracias', youtubeLink: 'https://youtu.be/cksu4WdleoA?si=tXXGt8CEpUrd2m_-' },
    { type: 'song', title: 'Audio', subtitle: 'Playback audio' },
    { type: 'song', title: 'La Chismosa', subtitle: 'Canción popular', youtubeLink: 'https://youtu.be/9Kziuo_3ryY?si=X8pLm9w_SQ4PmZOw' },
    { type: 'activity', title: 'Cierre del Evento', subtitle: 'Palabras finales y despedida' },
    { type: 'activity', title: 'Feliz cumpleaños', subtitle: 'Reconocimiento a participantes' }
];
        
        // Estado de la aplicación
        let completedItems = JSON.parse(localStorage.getItem('completedItems')) || Array(programData.length).fill(false);
        
        // Inicializar la página
        document.addEventListener('DOMContentLoaded', function() {
            renderProgram();
            updateProgress();
            
            // Añadir evento al botón de reset (si se añade en el futuro)
            document.getElementById('reset-btn')?.addEventListener('click', resetProgress);
        });
        
        // Renderizar la lista del programa
function renderProgram() {
    const programList = document.getElementById('program-list');
    programList.innerHTML = '';
    
    programData.forEach((item, index) => {
        const programItem = document.createElement('div');
        programItem.className = `program-item ${item.type} ${completedItems[index] ? 'completed' : ''}`;
        
        // Determinar el tipo de elemento (canción o actividad)
        const typeIcon = item.type === 'song' ? '<i class="fas fa-music"></i>' : '<i class="fas fa-users"></i>';
        const typeText = item.type === 'song' ? 'Canción' : 'Actividad';
        
        // Crear el botón de YouTube solo si existe el link y es una canción
        const youtubeButton = item.type === 'song' && item.youtubeLink ? 
            `<a href="${item.youtubeLink}" target="_blank" class="youtube-btn" title="Ver en YouTube">
                <i class="fab fa-youtube"></i>
            </a>` : '';
        
        programItem.innerHTML = `
            <div class="item-number">${index + 1}</div>
            <div class="item-content">
                <div class="item-title">${item.title}</div>
                <div class="item-subtitle">${typeText} • ${item.subtitle}</div>
            </div>
            <div class="item-actions">
                ${youtubeButton}
                <button class="status-btn ${completedItems[index] ? 'completed' : ''}" data-index="${index}">
                    ${completedItems[index] ? '<i class="fas fa-check"></i>' : '<i class="fas fa-play"></i>'}
                </button>
            </div>
        `;
        
        programList.appendChild(programItem);
    });
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            toggleCompleted(index);
        });
    });
}
        
        // Cambiar el estado de completado de un elemento
        function toggleCompleted(index) {
            completedItems[index] = !completedItems[index];
            localStorage.setItem('completedItems', JSON.stringify(completedItems));
            renderProgram();
            updateProgress();
            
            // Efecto visual de confirmación
            const btn = document.querySelector(`.status-btn[data-index="${index}"]`);
            btn.classList.add('pulse');
            setTimeout(() => btn.classList.remove('pulse'), 300);
        }
        
        // Actualizar la barra de progreso
        function updateProgress() {
            const totalItems = programData.length;
            const completedCount = completedItems.filter(item => item).length;
            const progressPercent = Math.round((completedCount / totalItems) * 100);
            
            document.getElementById('completed-count').textContent = completedCount;
            document.getElementById('total-count').textContent = totalItems;
            document.getElementById('progress-percent').textContent = `${progressPercent}%`;
            document.getElementById('progress-fill').style.width = `${progressPercent}%`;
            
            // Cambiar color de la barra según el progreso
            const progressFill = document.getElementById('progress-fill');
            if (progressPercent < 30) {
                progressFill.style.background = 'linear-gradient(90deg, #ff4d4f, #ff7a45)';
            } else if (progressPercent < 70) {
                progressFill.style.background = 'linear-gradient(90deg, #faad14, #ffc53d)';
            } else {
                progressFill.style.background = 'linear-gradient(90deg, #52c41a, #73d13d)';
            }
        }
        
        // Reiniciar el progreso (función disponible para futuras mejoras)
        function resetProgress() {
            if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
                completedItems = Array(programData.length).fill(false);
                localStorage.removeItem('completedItems');
                renderProgram();
                updateProgress();
            }
        }
        
        // Añadir estilos para animación
        const style = document.createElement('style');
        style.textContent = `
            .pulse {
                animation: pulse 0.3s ease-in-out;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);