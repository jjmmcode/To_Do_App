#!/bin/bash

echo "🚀 Creando estructura base del proyecto..."

# Crear backend
echo "🟦 Generando backend en .NET..."
dotnet new webapi -n backend
cd backend
mkdir Models DTOs Data Services
cd ..

# Crear frontend
echo "⚛️ Generando frontend en React con Vite..."
npm create vite@latest frontend -- --template react
cd frontend

echo "📦 Instalando dependencias frontend..."
npm install
npm install axios react-router-dom vite-plugin-pwa

mkdir -p src/{components,pages,services,hooks,assets}

cd ..

echo "✅ Estructura generada correctamente"
