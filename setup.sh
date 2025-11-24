#!/bin/bash

echo "🚀 Iniciando To-Do App en modo desarrollo..."

# 1. Levantar backend .NET
echo "🟦 Levantando backend (.NET)..."
cd backend
dotnet run &
BACKEND_PID=$!

sleep 2

# 2. Levantar frontend (Vite)
echo "⚛️ Levantando frontend (Vite)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "─────────────────────────────────────────────"
echo " Backend:  http://localhost:5000"
echo " Frontend: http://localhost:5173"
echo "─────────────────────────────────────────────"
echo ""
echo "Presiona CTRL + C para detener ambos"

# Mantener vivo el script hasta CTRL+C
wait $BACKEND_PID $FRONTEND_PID
