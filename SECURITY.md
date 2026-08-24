# Seguridad y privacidad

## Estado de V0.1

- Sin cuentas.
- Sin backend.
- Sin base de datos.
- Sin almacenamiento de coordenadas.
- Progreso de demo guardado únicamente en el navegador.

## Antes de una versión real

1. Servir todo mediante HTTPS.
2. Validar códigos y desbloqueos en backend.
3. No enviar al frontend pistas futuras, coordenadas secretas ni recompensa final.
4. Implementar autenticación para Creator/Admin.
5. Aplicar rate limiting a intentos de códigos y respuestas.
6. Diseñar retención, borrado y consentimiento antes de guardar ubicación.
7. Separar ubicación local de ubicación compartida.
8. Revisar políticas de MapLibre, mosaicos, geocoding y routing elegidos.
9. No incluir secretos en `VITE_*`.
10. Probar permisos y degradación en iOS y Android reales.

## Reportes

No publiques credenciales, datos personales ni coordenadas privadas en un issue público.
