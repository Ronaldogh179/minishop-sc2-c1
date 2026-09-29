# 🛒 MiniShop — Carrito de Compras en Vanilla JS

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Aplicación web frontend que implementa un sistema de carrito de compras completamente funcional sin dependencias de frameworks ni librerías externas. Desarrollado como parte de la Práctica Calificada SC2-C1 de Ingeniería Web.

## 🎯 Problema que Resuelve
MiniShop permite a los usuarios seleccionar productos de un catálogo dinámico y construir un carrito de compras en tiempo real, gestionando el estado de la aplicación en la memoria del navegador. Demuestra el dominio de la sincronización entre estructuras de datos (arreglos/objetos) y la interfaz gráfica.

## ⚙️ Características Técnicas y Funcionalidades
- **Renderizado Dinámico:** Construcción del catálogo y del carrito utilizando exclusivamente `createElement()` y `appendChild()`.
- **Gestión de Estado:** Lógica de negocio centralizada. Las operaciones visuales son un reflejo estricto de las mutaciones en los arreglos de datos.
- **Operaciones CRUD en Carrito:** 
  - Agregar productos (previniendo duplicación de nodos DOM).
  - Incrementar y disminuir cantidades (con validación de límite mínimo de 1 unidad).
  - Eliminación de ítems con recálculo automático.
- **Formateo Nativo:** Uso de la API `Intl.NumberFormat` para el manejo preciso de la divisa local (PEN - Soles Peruanos).
- **Prevención XSS:** Mitigación de riesgos de inyección al evitar el uso de `innerHTML` para la creación de componentes interactivos.

## 👥 Equipo de Desarrollo
- **Simon Ronaldo Gonzales Jacinto** (Líder / Desarrollador)
- **Salomon Gabriel David Clemente**
- **Diego Alberto Paitan Chavez**

## 🚀 Instalación y Uso
1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/Ronaldogh179/minishop-sc2-c1.git](https://github.com/Ronaldogh179/minishop-sc2-c1.git)