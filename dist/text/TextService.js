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
        this.initGateway().catch(exception => {
            ts_framework_1.Logger.error(exception);
            this.gatewayInstance = undefined;
        });
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
                // Handles a debug gateway (console)
                this.gatewayInstance = {
                    isReady: true,
                    send(msg) {
                        return __awaiter(this, void 0, void 0, function* () {
                            ts_framework_1.Logger.warn('TextService: Sending SMS as a warning in debug mode', JSON.stringify(msg, null, 2));
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
            return !!(this.gatewayInstance && this.gatewayInstance.isReady);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQXNDO0FBQ3RDLGtDQUFrRjtBQUVsRixnRUFBMEU7QUFDMUUsb0VBQXlEO0FBUXpELGlCQUFpQyxTQUFRLDhCQUF1QjtJQUk5RCxZQUFZLE9BQTJCO1FBQ3JDLEtBQUssQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25DLHFCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ2EsV0FBVzs7WUFDekIsd0NBQXdDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLDZCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLDJCQUFhLGlCQUN0QyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUM5QixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyw2QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRztvQkFDckIsT0FBTyxFQUFFLElBQUk7b0JBQ1AsSUFBSSxDQUFDLEdBQUc7OzRCQUNaLHFCQUFNLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRyxDQUFDO3FCQUFBO2lCQUNGLENBQUE7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxPQUFPOztZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBMEI7O1lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQUE7Q0FDRjtBQXJERCw4QkFxREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd0cy1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zLCBCYXNlTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgVGV4dE1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL1RleHRNZXNzYWdlJztcbmltcG9ydCB7IFRleHRHYXRld2F5LCBCYXNlVGV4dEdhdGV3YXkgfSBmcm9tICcuL2dhdGV3YXlzL0Jhc2VUZXh0R2F0ZXdheSc7XG5pbXBvcnQgVHdpbGlvR2F0ZXdheSBmcm9tICcuL2dhdGV3YXlzL1R3aWxpb1RleHRHYXRld2F5JztcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmcm9tPzogc3RyaW5nO1xuICBnYXRld2F5OiBUZXh0R2F0ZXdheTtcbiAgZ2F0ZXdheU9wdGlvbnM/OiBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRTZXJ2aWNlIGV4dGVuZHMgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgb3B0aW9uczogVGV4dFNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgZ2F0ZXdheUluc3RhbmNlPzogQmFzZVRleHRHYXRld2F5O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFRleHRTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKCdUZXh0U2VydmljZScsIG9wdGlvbnMpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZ2F0ZXdheSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBnYXRld2F5IHN1cHBsaWVkIGZvciB0aGUgVGV4dCBtZXNzYWdlcyBzZXJ2aWNlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0R2F0ZXdheSgpLmNhdGNoKGV4Y2VwdGlvbiA9PiB7XG4gICAgICBMb2dnZXIuZXJyb3IoZXhjZXB0aW9uKVxuICAgICAgdGhpcy5nYXRld2F5SW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBidWlsdC1pbiBnYXRld2F5IHN1cHBvcnQgaW5pdGlhbGl6YXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgaW5pdEdhdGV3YXkoKSB7XG4gICAgLy8gSGFuZGxlcyB0d2lsaW8gZHluYW1pYyBpbml0aWFsaXphdGlvblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZ2F0ZXdheSA9PT0gVGV4dEdhdGV3YXkuVFdJTElPKSB7XG4gICAgICB0aGlzLmdhdGV3YXlJbnN0YW5jZSA9IG5ldyBUd2lsaW9HYXRld2F5KHtcbiAgICAgICAgZnJvbTogdGhpcy5vcHRpb25zLmZyb20sXG4gICAgICAgIC4uLnRoaXMub3B0aW9ucy5nYXRld2F5T3B0aW9ucyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmdhdGV3YXkgPT09IFRleHRHYXRld2F5LkRFQlVHKSB7XG4gICAgICAvLyBIYW5kbGVzIGEgZGVidWcgZ2F0ZXdheSAoY29uc29sZSlcbiAgICAgIHRoaXMuZ2F0ZXdheUluc3RhbmNlID0ge1xuICAgICAgICBpc1JlYWR5OiB0cnVlLFxuICAgICAgICBhc3luYyBzZW5kKG1zZykge1xuICAgICAgICAgIExvZ2dlci53YXJuKCdUZXh0U2VydmljZTogU2VuZGluZyBTTVMgYXMgYSB3YXJuaW5nIGluIGRlYnVnIG1vZGUnLCBKU09OLnN0cmluZ2lmeShtc2csIG51bGwsIDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHNlcnZpY2UgaXMgcmVhZHkgZm9yIHNlbmRpbmcgdGV4dCBtZXNzYWdlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpc1JlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhISh0aGlzLmdhdGV3YXlJbnN0YW5jZSAmJiB0aGlzLmdhdGV3YXlJbnN0YW5jZS5pc1JlYWR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhbiBlbWFpbCBtZXNzYWdlLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2Ugb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZTogVGV4dE1lc3NhZ2VTY2hlbWEpIHtcbiAgICByZXR1cm4gdGhpcy5nYXRld2F5SW5zdGFuY2Uuc2VuZChtZXNzYWdlKTtcbiAgfVxufSJdfQ==