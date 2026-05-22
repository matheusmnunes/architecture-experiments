sudo docker run -p 3001:3001 -it --init --ipc=host -v $PWD/cache:/app/cache pdf:0.0.1 node app.js


#teste terminal

curl -X POST http://localhost:3001/pdf \
  -H "Content-Type: application/json" \
  -o 'Projects/all-projects/services/pdf-generator/teste.pdf' \
  -d '{
    "html": "",
    "link": "/app/cache/teste_v1.html",
    "config": {
      "options": {
        "format": "A4",
        "landscape": true,
        "margin": {
          "top": "30mm",
          "bottom": "30mm",
          "right": "15mm",
          "left": "15mm"
        },
        "footer": "",
        "header": "<header style=\"width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 30px; border-bottom: 2px solid #333; box-sizing: border-box;\"><div style=\"display: flex; align-items: center; gap: 12px;\"><div style=\"width: 48px; height: 48px; background: #1a1a2e; border-radius: 6px; display: flex; align-items: center; justify-content: center;\"><span style=\"color: #fff; font-size: 20px; font-weight: bold;\">M</span></div><div><p style=\"margin: 0; font-size: 16px; font-weight: bold; color: #1a1a2e;\">MyApp</p><p style=\"margin: 0; font-size: 11px; color: #666;\">Sistema de Relatórios</p></div></div><div style=\"text-align: center;\"><p style=\"margin: 0; font-size: 15px; font-weight: bold; color: #1a1a2e;\">RELATÓRIO MENSAL</p><p style=\"margin: 0; font-size: 11px; color: #666;\">Referência: Março / 2026</p></div><div style=\"text-align: right;\"><p style=\"margin: 0; font-size: 11px; color: #666;\">Emitido em</p><p style=\"margin: 0; font-size: 13px; font-weight: bold; color: #1a1a2e;\">02/04/2026</p></div></header>"
      },
      "security":{
        "password":"123456",
        "print":"none",
        "modify":"none"
      }
    }
  }'


  <header>
    <h1>Relatório de Projetos</h1>
    <div class="info">
      <div>Data: 31/03/2026</div>
      <div>Gerado por: MMN</div>
    </div>
  </header>