import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.js';
import logger from '../utils/logger.js';

class FirebaseMessageService{
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.messaging = admin.messaging();
    }

    /**
     * 寄送訊息給指定的裝置
     * @param {String} registrationToken The device token of the device to which to send the message.
     * @param {Object} data The data to send with the message. {title: String, body: String}
     * @returns 
     */
    async sendMessage(registrationToken, data = {}) {
        const message = {
            notification: {
                title: data.title,
                body: data.body,
            },
            token: registrationToken,
            
        };
        try {
            const response = await this.messaging.send(message);
            logger.info('訊息已成功發送:', response);
            return response;
        } catch (error) {
            logger.error('發送訊息時發生錯誤:', error);
            throw error;
        }
    }
}

export default FirebaseMessageService;