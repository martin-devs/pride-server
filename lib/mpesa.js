// import Mpesa from "mpesa-node";
const { Buffer } = require("buffer");
const axios = require("axios");
const getCurrentTimeStamp = require("../utils/timestamp");

class MpesaApi {
    // mpesaApi: any;
    consumerKey = process.env.MPESA_CONSUMER_KEY ?? "";
    consumerSecret = process.env.MPESA_CONSUMER_SECRET ?? "";

    constructor() {}

    async getOAuthToken() {
        return new Promise(async (resolve, reject) => {
            let consumer_key = process.env.MPESA_CONSUMER_KEY;
            let consumer_secret = process.env.MPESA_CONSUMER_SECRET;

            let url = process.env.MPESA_OAUTH_TOKEN_URL ?? "";

            //form a buffer of the consumer key and secret
            let buffer = Buffer.from(consumer_key + ":" + consumer_secret);

            let auth = `Basic ${buffer.toString("base64")}`;

            try {
                let { data } = await axios.get(url, {
                    headers: {
                        Authorization: auth,
                    },
                });

                const token = data["access_token"];
                resolve(token);
            } catch (err) {
                reject(err);
            }
        });
    }

    async lipaNaMpesaOnline(token, data) {
        return new Promise(async (resolve, reject) => {
            //getting the timestamp
            let timestamp = getCurrentTimeStamp();

            // const passkey = this.consumerKey
            const passkey = process.env.MPESA_LIPA_NA_MPESA_PASS_KEY;

            let password = Buffer.from(
                `${data.shortCode}${passkey}${timestamp}`
            ).toString("base64");

            try {
                const options = {
                    BusinessShortCode: data.shortCode,
                    Password: password,
                    Timestamp: timestamp,
                    TransactionType: "CustomerPayBillOnline",
                    Amount: data.amount,
                    PartyA: data.sender,
                    PartyB: data.shortCode,
                    PhoneNumber: data.sender,
                    CallBackURL: data.callbackUrl,
                    AccountReference: data.reference,
                    TransactionDesc: data.description,
                };

                let response = await axios.post(
                    process.env.MPESA_LIPA_NA_MPESA_URL ?? "",
                    options,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                resolve(response);
            } catch (err) {
                // const error = err['response']['statusText']
                reject(err);
            }
        });
    }
}

module.exports = MpesaApi;
