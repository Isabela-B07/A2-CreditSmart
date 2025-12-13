# Credit-Smart


Credit-Smart es una aplicación web desarrollada en React que permite gestionar, simular y solicitar créditos de manera dinámica. El proyecto implementa conceptos fundamentales de ingeniería web como componentización, manejo de estado, validaciones y renderización condicional.


## Objetivo General


Desarrollar una aplicación web dinámica utilizando React para la gestión, simulación y solicitud de créditos mediante componentes reutilizables, validaciones, manejo de estado y una arquitectura modular.


## Tecnologías Utilizadas


- React.js  
- JavaScript  
- HTML5  
- CSS3 / Módulos CSS  
- JSX  
- React Hooks  
- Node.js + npm  
- Vite


## Funcionalidades Principales


### 1. Lista de Productos Crediticios
- Carga de productos desde un array de objetos.  
- Uso del componente reutilizable `CreditCard.jsx`.  
- Render dinámico mediante `.map()`.


### 2. Búsquedas y Filtros
- Búsqueda por nombre en tiempo real.  
- Filtro por rango de monto.  
- Ordenamiento por tasa de interés.  
- Mensaje de “No hay créditos disponibles” cuando aplica.


### 3. Simulación de Cuotas
- Cálculo automático de cuota mensual.  
- Actualización instantánea al modificar monto o plazo.


### 4. Formulario de Solicitud de Crédito
- Captura y validación de datos con `useState`.  
- Vista previa antes del envío.  
- Almacenamiento temporal de solicitudes en memoria.


### 5. Arquitectura Basada en Componentes
- Componentes modulares y reutilizables.  
- Comunicación mediante props.  
- Renderización condicional según el estado de la aplicación.


## Ejecución del Proyecto


1. Clonar el repositorio:
    git clone (Link del repositorio)


2. Instalar dependencias:  
   npm install


3. Ejecutar el entorno de desarrollo:
    npm run dev


4. Abrir la URL indicada por la consola (por ejemplo, http://localhost:5173/).


## Capturas de pantalla de la página


### Página Principal
![Home](public/img/Home.gif)


### Simulador
![Simulator](public/img/Simulator.gif)


### Solicitud de Crédito
![RequestCredit](public/img/RequestCredit.gif)

### Solicitudes realizadas
![MisSolicitudes](public/img/MisSolicitudes.gif)




## Autores


Isabela Blandón Vélez


Salomé Molina Reyes


Angela Alean Acuña
