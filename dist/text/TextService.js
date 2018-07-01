"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_1 = require("ts-framework");
const base_1 = require("../base");
const BaseTextGateway_1 = require("./gateways/BaseTextGateway");
const TwilioTextGateway_1 = require("./gateways/TwilioTextGateway");
class TextService extends base_1.BaseNotificationService {
    constructor(options) {
        super('TextService', options);
        if (!this.options.gateway) {
            throw new Error('No gateway supplied for the Text messages service');
        }
        this.initGateway().catch(exception => ts_framework_1.Logger.error(exception));
    }
    /**
     * Handles built-in gateway support initialization.
     */
    initGateway() {
        return __awaiter(this, void 0, void 0, function* () {
            // Handles twilio dynamic initialization
            if (this.options.gateway === BaseTextGateway_1.TextGateway.TWILIO) {
                this.gatewayInstance = new TwilioTextGateway_1.default(Object.assign({ from: this.options.from }, this.options.gatewayOptions));
            }
            else if (this.options.gateway === BaseTextGateway_1.TextGateway.DEBUG) {
                this.gatewayInstance = {
                    send() {
                        return __awaiter(this, arguments, void 0, function* () {
                            ts_framework_1.Logger.debug('TextService: Sending SMS in debug mode (console-only)', JSON.stringify(arguments, null, 2));
                        });
                    }
                };
            }
        });
    }
    /**
     * Checks if the service is ready for sending text messages.
     */
    isReady() {
        return __awaiter(this, void 0, void 0, function* () {
            return !!this.gatewayInstance;
        });
    }
    /**
     * Sends an email message.
     *
     * @param message The message options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gatewayInstance.send(message);
        });
    }
}
exports.default = TextService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQXNDO0FBQ3RDLGtDQUFrRjtBQUVsRixnRUFBMEU7QUFDMUUsb0VBQXlEO0FBUXpELGlCQUFpQyxTQUFRLDhCQUF1QjtJQUk5RCxZQUFZLE9BQTJCO1FBQ3JDLEtBQUssQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7O09BRUc7SUFDYSxXQUFXOztZQUN6Qix3Q0FBd0M7WUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssNkJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksMkJBQWEsaUJBQ3RDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQzlCLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLDZCQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGVBQWUsR0FBRztvQkFDZixJQUFJOzs0QkFDUixxQkFBTSxDQUFDLEtBQUssQ0FBQyx1REFBdUQsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUcsQ0FBQztxQkFBQTtpQkFDRixDQUFBO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsT0FBTzs7WUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBMEI7O1lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQUE7Q0FDRjtBQWhERCw4QkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd0cy1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zLCBCYXNlTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgVGV4dE1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL1RleHRNZXNzYWdlJztcbmltcG9ydCB7IFRleHRHYXRld2F5LCBCYXNlVGV4dEdhdGV3YXkgfSBmcm9tICcuL2dhdGV3YXlzL0Jhc2VUZXh0R2F0ZXdheSc7XG5pbXBvcnQgVHdpbGlvR2F0ZXdheSBmcm9tICcuL2dhdGV3YXlzL1R3aWxpb1RleHRHYXRld2F5JztcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmcm9tPzogc3RyaW5nO1xuICBnYXRld2F5OiBUZXh0R2F0ZXdheTtcbiAgZ2F0ZXdheU9wdGlvbnM/OiBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRTZXJ2aWNlIGV4dGVuZHMgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgb3B0aW9uczogVGV4dFNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgZ2F0ZXdheUluc3RhbmNlPzogQmFzZVRleHRHYXRld2F5O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFRleHRTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKCdUZXh0U2VydmljZScsIG9wdGlvbnMpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2F0ZXdheSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBnYXRld2F5IHN1cHBsaWVkIGZvciB0aGUgVGV4dCBtZXNzYWdlcyBzZXJ2aWNlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0R2F0ZXdheSgpLmNhdGNoKGV4Y2VwdGlvbiA9PiBMb2dnZXIuZXJyb3IoZXhjZXB0aW9uKSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBidWlsdC1pbiBnYXRld2F5IHN1cHBvcnQgaW5pdGlhbGl6YXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgaW5pdEdhdGV3YXkoKSB7XG4gICAgLy8gSGFuZGxlcyB0d2lsaW8gZHluYW1pYyBpbml0aWFsaXphdGlvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2F0ZXdheSA9PT0gVGV4dEdhdGV3YXkuVFdJTElPKSB7XG4gICAgICB0aGlzLmdhdGV3YXlJbnN0YW5jZSA9IG5ldyBUd2lsaW9HYXRld2F5KHtcbiAgICAgICAgZnJvbTogdGhpcy5vcHRpb25zLmZyb20sXG4gICAgICAgIC4uLnRoaXMub3B0aW9ucy5nYXRld2F5T3B0aW9ucyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmdhdGV3YXkgPT09IFRleHRHYXRld2F5LkRFQlVHKSB7XG4gICAgICB0aGlzLmdhdGV3YXlJbnN0YW5jZSA9IHtcbiAgICAgICAgYXN5bmMgc2VuZCgpIHtcbiAgICAgICAgICBMb2dnZXIuZGVidWcoJ1RleHRTZXJ2aWNlOiBTZW5kaW5nIFNNUyBpbiBkZWJ1ZyBtb2RlIChjb25zb2xlLW9ubHkpJywgSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzLCBudWxsLCAyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzZXJ2aWNlIGlzIHJlYWR5IGZvciBzZW5kaW5nIHRleHQgbWVzc2FnZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNSZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gISF0aGlzLmdhdGV3YXlJbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhbiBlbWFpbCBtZXNzYWdlLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2Ugb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogVGV4dE1lc3NhZ2VTY2hlbWEpIHtcbiAgICByZXR1cm4gdGhpcy5nYXRld2F5SW5zdGFuY2Uuc2VuZChtZXNzYWdlKTtcbiAgfVxufSJdfQ==