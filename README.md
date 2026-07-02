# 🏫 APP EntidadIES — Gestión Interna del Centro

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)

**APP EntidadIES** es una aplicación web interna de gestión operativa y documental para centros educativos (actualmente desplegada en el IES Andalán). Abarca desde la documentación institucional (PEC, RRI, PGA) hasta el Sistema de Gestión de Calidad (SGC), programas institucionales y orientación educativa.

---

## 🔒 Filosofía de Operación: Intranet Local

El principio fundamental de **APP EntidadIES** es su modelo de operación cerrado: **es una Intranet local, NO una Extranet**.

- **Servidor Físico Local:** La aplicación opera en un servidor dedicado situado físicamente dentro del instituto.
- **Sin Exposición a Internet:** El acceso se realiza exclusivamente desde dispositivos conectados a la red local del centro educativo. No requiere ni permite acceso externo (VPN, etc.) en su fase actual, garantizando que el entorno quede completamente aislado del exterior.
- **Privacidad y Seguridad Máxima:** Todos los datos sensibles, incluyendo información de alumnado en orientación, datos de familias, actas, y auditorías del SGC, se almacenan en una base de datos local (SQLite). **Ningún dato confidencial sale a la nube**.

---

## 🚀 Funcionalidades Principales

1. **Documentación Institucional:** Gestión, visualización y actualización de PEC, RRI, PGA, Plan de Convivencia y Memorias.
2. **Sistema de Gestión de Calidad (SGC):** Integración de matrices DAFO, indicadores de calidad, riesgos y oportunidades, y seguimiento de no conformidades.
3. **Orientación Educativa:** Trazabilidad completa desde los objetivos estratégicos del centro hasta las acciones individuales de orientación del alumnado.
4. **Programas Institucionales:** Seguimiento de PROA+, Erasmus+, Ajedrez Educativo, etc.
5. **Cadena de Datos Integrada:** La información fluye conectando los objetivos estratégicos con el trabajo diario en el aula y los departamentos.

---

## 🏛️ Arquitectura del Sistema

La arquitectura está basada en el stack tecnológico heredado y adaptado de *Cuaderno FP*:
- **Frontend:** PWA con **Next.js**, React y Tailwind CSS para una interfaz fluida e intuitiva.
- **Backend:** API REST en Python con **FastAPI** para la generación de reportes y lógica de negocio.
- **Base de Datos:** Motor **SQLite** operando directamente en el servidor local.

*(Nota: Los documentos cuasi-estáticos como PDFs normativos se almacenan localmente y pueden contar con un backup en Google Drive, pero los datos dinámicos residen en la red local).*

---

## ⚙️ Instalación Local (Entorno de Desarrollo)

### Requisitos previos
- Node.js 18+
- Python 3.10+

### Arranque (Windows)
```bash
# 1. Clonar el repositorio
git clone https://github.com/rafaelsanzprades/EntidadIES.git
cd EntidadIES

# 2. Iniciar el entorno completo (FastAPI + Next.js)
.\start.bat
```
La aplicación estará disponible en la red local o en `http://localhost:3000` para desarrollo.

---

## 🤝 Desarrollo y Evolución
Este proyecto se encuentra en evolución continua, migrando progresivamente las herramientas de seguimiento externas (como Hojas de Cálculo o Formularios online) hacia el núcleo seguro de la base de datos local de la Intranet.
