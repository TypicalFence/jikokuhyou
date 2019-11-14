# 時刻表
A common REST-api and webapp for public transport data.

## Architecture
This Project consits out of 4 core packages:
- jikokuhyou-protocol
    - defines interfaces of json send around by the API        
- jikokuhyou-service-interface
    - defines interfaces for implementing new data sources (services)
- jikokuhyou-webservice
    - rest api for accessing the data, builds upon a service layer defined by jikokuhyou-service-interface
- jikokuhyou-webapp
    - reactjs frontend for the webservice
