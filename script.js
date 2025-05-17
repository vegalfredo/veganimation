document.addEventListener('DOMContentLoaded', function() {
   // Mobile navigation toggle
   const navToggle = document.querySelector('.nav-toggle');
   const navMenu = document.querySelector('.nav-menu');

   if (navToggle && navMenu) {
       navToggle.addEventListener('click', () => {
           navMenu.classList.toggle('active');
           // Cambiar icono de hamburguesa a X y viceversa
           const icon = navToggle.querySelector('i');
           if (navMenu.classList.contains('active')) {
               icon.classList.remove('fa-bars');
               icon.classList.add('fa-times');
               navToggle.setAttribute('aria-label', 'Cerrar menú');
           } else {
               icon.classList.remove('fa-times');
               icon.classList.add('fa-bars');
               navToggle.setAttribute('aria-label', 'Abrir menú');
           }
       });

       // Cerrar menú al hacer clic en un enlace (para SPAs o páginas de una sola sección)
       navMenu.querySelectorAll('a').forEach(link => {
           link.addEventListener('click', () => {
               if (navMenu.classList.contains('active')) {
                   navMenu.classList.remove('active');
                   const icon = navToggle.querySelector('i');
                   icon.classList.remove('fa-times');
                   icon.classList.add('fa-bars');
                   navToggle.setAttribute('aria-label', 'Abrir menú');
               }
           });
       });
   }

   // Actualizar año en el footer
   const yearSpan = document.getElementById('year');
   if (yearSpan) {
       yearSpan.textContent = new Date().getFullYear();
   }

   // Active link highlighting based on scroll (opcional, pero mejora la UX)
   const sections = document.querySelectorAll('main section[id]');
   const navLinks = document.querySelectorAll('.nav-menu a');

   function changeLinkState() {
       let index = sections.length;

       while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // +100 es un offset
       
       navLinks.forEach((link) => link.classList.remove('active'));
       // Asegúrate de que el link correspondiente exista
       if (sections[index] && document.querySelector('.nav-menu a[href*=' + sections[index].id + ']')) {
            document.querySelector('.nav-menu a[href*=' + sections[index].id + ']').classList.add('active');
       } else if (window.scrollY < sections[0].offsetTop -100) { // Si estamos arriba del todo, ningún link activo o el primero
           navLinks.forEach((link) => link.classList.remove('active'));
       }
   }

   if (sections.length > 0 && navLinks.length > 0) {
       // Llamar una vez al cargar y luego en scroll
       changeLinkState(); 
       window.addEventListener('scroll', changeLinkState);
   }

});