const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
        FILE_URL: Joi.string().description('Upload file url'),
        FILE_PATH: Joi.string().description('Upload file path'),
    })
    .unknown();

const {
    value: envVars,
    error
} = envVarsSchema.prefs({
    errors: {
        label: 'key'
    }
}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: 10,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
    admin_url: envVars.ADMIN_URL,
    file_path: envVars.FILE_PATH,
    file_url: envVars.FILE_URL,
    asset_path: envVars.ASSETS_PATH,
    node_project_path: envVars.SERVER_ROOT_PATH,
    AWS_CONFIG: {
        accessKeyId: envVars.ACCESSKEYID,
        secretAccessKey: envVars.SECRETACCESSKEY,
        region: envVars.REGION
    },
    AWS_BUCKET_NAME: envVars.AWS_BUCKET_NAME,
    AWS_BASE_URL: envVars.AWS_BASE_URL,
    AWS_CDN_URL: envVars.AWS_CDN_URL,
    fcm_api_server_key: envVars.FCM_API_SERVER_KEY,
    fcm_sender_id: envVars.FCM_SENDER_ID,
    fcm_legacy_key: envVars.FCM_LEGACY_KEY,
    FIREBASE_CONFIG: {
        apiKey: envVars.FCM_API_KEY,
        authDomain: envVars.FCM_AUTH_DOMAIN,
        databaseURL: envVars.FCM_DATA_BASE_URL,
        projectId: envVars.FCM_PROJECT_ID,
        storageBucket: envVars.FCM_STORAGE_BUCKET,
        messagingSenderId: envVars.FCM_MESSAGING_SENDER_ID,
        appId: envVars.FCM_APPID,
        measurementId: envVars.FCM_MEASUREMENT_ID,
    },
    fcm_legacy_key: envVars.FCM_LEGACY_KEY,
    secret_key: envVars.secretKey,
    send_sms: envVars.send_sms,
    send_sms_url: envVars.send_sms_url,
    send_sms_api_key: envVars.send_sms_api_key,
    send_sms_template_id: envVars.send_sms_template_id,
    send_sms_common_url: envVars.send_sms_common_url,
    app_link: envVars.APP_LINK,
    ssl_private_key_path: envVars.ssl_private_key_path,
    ssl_cert_key_path: envVars.ssl_cert_key_path,
    ssl_ca_key_path: envVars.ssl_ca_key_path,
    https: envVars.https,
    sport_light_visible_day: envVars.SPORT_LIGHT_VISIBLE_DAY,
    feedback_url: envVars.FEEDBACKURL,
    email_send: envVars.EMAIL_SEND,
    server_root_path: envVars.SERVER_ROOT_PATH,
    app_url: envVars.API_URL
};