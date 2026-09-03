# Sistema de Gestión Académica (SGA)

Proyecto desarrollado durante la materia Programación IV.

## Descripción

El Sistema de Gestión Académica (SGA) es una aplicación web que permitirá administrar alumnos, docentes, cursos y materias.

Durante el desarrollo del proyecto se incorporarán progresivamente nuevas tecnologías y funcionalidades.


## Objetivos

- Gestionar alumnos.
- Gestionar docentes.
- Gestionar cursos.
- Gestionar materias.
- Implementar autenticación de usuarios.
- Consumir una API REST.
- Persistir la información en MongoDB.


## Tecnologías

Actualmente:

- HTML5
- JavaScript
- CSS
- Express
- Node.js


Próximamente:
- React
- MongoDB

## Estado del proyecto

- Versión: 
Clase 10 - Estructura actual
SGA/
├── index.html
├── alumnos.html
├── docentes.html
│
├── css/
│   └── estilos.css
│
└── js/
    ├── alumnos.js
    └── docentes.js

## Estado Actual
- Pagina de inicio y navegacion entre modulos
- modulo alumnos docentes
- CRUD alumnos/docentes
- Validaciones de formularios
- Persistencia mediante localstorage
- Organizacion del codigo y refactorizacion
- Separacion inicial entre Frontend y Backend
- Implementacion de validaciones para los datos recibidos mediante req.body
- Uso de status 400 para datos invalidos
- Status 404 para alumno no encontrado
- Status 201 para registrar nuevo alumno
- Manejo basico de errores en las operaciones del CRUD

## Almacenamiento

- localStorage
- JSON.stringify()
- JSON.parse()

## Autor

Irina Agretti

Programación IV