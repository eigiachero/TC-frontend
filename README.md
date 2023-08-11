# Tupaca Challenge Frontend

Este desafío consiste en desarrollar una aplicación de tablero de tareas utilizando React.js con TypeScript
para el Frontend, y Node.js con Express.js y TypeScript para el Backend. Se pueden utilizar cualquier biblioteca de
componentes para el diseño de la interfaz de usuario

# Instalación
- Clonar el repositorio de github
- Clonar, instalar y ejecutar el [backend](https://github.com/eigiachero/TC-backend)
- Instalar las dependecias, utilizando el comando `npm install`
- Ejecutar frontend, mediante el comando `npm run dev`
- Abrir el enlace que aparece en la consola!

### Demo online
La aplicación se encuentra alojada en https://tc-frontend-rho.vercel.app/. Sin embargo, para poder utilizarla se necesita **habilitar 
la muestra de contenido inseguro** debido a que el backend en AWS no tiene certificado SSL. En firefox, presionando el candado en la
barra de navegación es facil acceder y cambiar esta configuracion.

# Tecnologias utilizadas
### Vite
Vite es una herramienta de compilación que tiene como objetivo proporcionar una experiencia de desarrollo más rápida y ágil para proyectos web modernos.
Vite es dogmático y viene con configuraciones predeterminadas listas para usar. Se utilizo la configuracion por defecto de React utilizando Typescript y el transpilador Babel.
### Tailwind
Tailwind CSS es una potente herramienta para el desarrollo frontend. Está dentro de la clasificación de los frameworks CSS o también llamados frameworks de diseño. Permite a los desarrolladores y diseñadores aplicar estilos a los sitios web de una manera ágil y optimizada. Tailwind, en pocas palabras, es un framework CSS que da prioridad a la utilidad sobre el propio estilo, pero además a diferencia de otros frameworks CSS como Bootstrap o Bulma, Tailwind no provee una serie de componentes predefinidos.
### Shadcn-ui
No es una libreria de componentes estandar. Los creadores la definen como una coleccion reutilizable de componentes altamente accesibles y personalizables. Son creados utilizando
Radix UI y Tailwind CSS, y al instalar solo los componentes deseados permite lograr una reducción del tamaño del proyecto considerable.
### React Query
React Query es una libreria para el acceso de datos y el manejo de estados de las aplicaciones React, que simplifica la obtencion, cache y actualizacion de informacion.
Permite acceder a la API de una manera muy natural utilizando los hooks que la libreria brinda.

# Requerimientos
* Los usuarios deben poder crear tareas con un nombre y una descripción.
* Los usuarios deben poder editar el nombre y la descripción de las tareas.
* Los usuarios deben poder ver una lista de todas las tareas existentes.
* Los usuarios deben poder mover las tareas entre tres estados fijos: "Por hacer", "En progreso" y "Hecho".
* Los usuarios deben poder eliminar tareas.
* Los usuarios deben poder filtrar tareas por nombre y/o estado.
* Los usuarios deben poder ordenar las tareas por nombre y/o fecha de creación.
