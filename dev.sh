#!/bin/bash

# Stoppe und entferne bestehende Container
docker-compose down

# Baue und starte die Container im Entwicklungsmodus
docker-compose up --build 