const NEW_RACE_NOTIFICATION_HTML = `
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
<body style="margin: 0; font-family: 'Roboto', sans-serif;">
    <div style="background: #f5f5f5; padding: 8vw; margin: 0;">
        <div style="background: white; border-radius: 3px;">              
            <div style="padding: 56px 48px 72px 48px;">
                <p style="margin: 0; margin-bottom: 24px; font-weight: 500; color: #5d615d; font-size: 32px;">
                    Olá #DRIVER_NAME, você foi adicionado a uma nova corrida!
                </p>
                <p style="margin: 0; margin-bottom: 56px; font-weight: 400; color: #979e97; font-size: 18px;">
                    #RACE_NAME <br/>
                    Data: #RACE_DATE <br/>
                    Horário de início: #RACE_START_TIME <br/>
                    Horário de término: #RACE_END_TIME <br/>
                    Número de voltas: #RACE_LAPS <br/>
                    Acesse o Race Engineering App para mais detalhes.
                </p>
            </div>
        </div>
        <p style="width: 100%; text-align: center; color: #979e9780; font-size: 14px; margin: 0; margin-top: 24px;">
            Esta mensagem é automática, não responda este e-mail.
        </p>
    </div>
</body>
`;
export default NEW_RACE_NOTIFICATION_HTML;
