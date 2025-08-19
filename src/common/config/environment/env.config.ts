import 'dotenv/config'
import * as joi from 'joi'
import { EnvInterface } from './env.interface';

const envSchema = joi.object({
    port: joi.number().required(),
    db_host: joi.string().required(),
    db_port: joi.number().required(),
    db_username: joi.string().required(),
    db_password: joi.string().required(),
    db_name: joi.string().required(),
    db_ssl: joi.boolean().required()
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) throw new Error(`Configuración de vaidacion error: ${error.message}`);

const envVars: EnvInterface = value;
export const envs = {
    port: envVars.port,
    db: {
        host: envVars.db_host,
        port: envVars.db_port,
        username: envVars.db_username,
        password: envVars.db_password,
        name: envVars.db_name,
        ssl: envVars.db_ssl
    }
}