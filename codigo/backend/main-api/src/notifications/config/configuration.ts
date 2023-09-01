import { config } from 'dotenv';
config();

export default () => {
  const envVariables = {
    NOTIFICATION_EMAIL: null,
    NOTIFICATION_PASSWORD: null,
    RABBITMQ_URL: null,
    RABBITMQ_QUEUE: null,
  };
  Object.keys(envVariables).forEach((x) => {
    if (process.env[x]) {
      envVariables[x] = process.env[x];
    } else {
      throw new Error(`A variável de ambiente ${x} não foi carregada.`);
    }
  });
  return envVariables;
};
