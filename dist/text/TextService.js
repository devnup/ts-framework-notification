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
                    send() {
                        return __awaiter(this, arguments, void 0, function* () {
                            ts_framework_1.Logger.warn('TextService: Sending SMS as warning logs in debug mode', JSON.stringify(arguments, null, 2));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQXNDO0FBQ3RDLGtDQUFrRjtBQUVsRixnRUFBMEU7QUFDMUUsb0VBQXlEO0FBUXpELGlCQUFpQyxTQUFRLDhCQUF1QjtJQUk5RCxZQUFZLE9BQTJCO1FBQ3JDLEtBQUssQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25DLHFCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ2EsV0FBVzs7WUFDekIsd0NBQXdDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLDZCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLDJCQUFhLGlCQUN0QyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUM5QixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyw2QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRztvQkFDckIsT0FBTyxFQUFFLElBQUk7b0JBQ1AsSUFBSTs7NEJBQ1IscUJBQU0sQ0FBQyxJQUFJLENBQUMsd0RBQXdELEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVHLENBQUM7cUJBQUE7aUJBQ0YsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE9BQU87O1lBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLElBQUksQ0FBQyxPQUEwQjs7WUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtDQUNGO0FBckRELDhCQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3RzLWZyYW1ld29yayc7XG5pbXBvcnQgeyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMsIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZSc7XG5pbXBvcnQgeyBUZXh0TWVzc2FnZVNjaGVtYSB9IGZyb20gJy4vVGV4dE1lc3NhZ2UnO1xuaW1wb3J0IHsgVGV4dEdhdGV3YXksIEJhc2VUZXh0R2F0ZXdheSB9IGZyb20gJy4vZ2F0ZXdheXMvQmFzZVRleHRHYXRld2F5JztcbmltcG9ydCBUd2lsaW9HYXRld2F5IGZyb20gJy4vZ2F0ZXdheXMvVHdpbGlvVGV4dEdhdGV3YXknO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIGZyb20/OiBzdHJpbmc7XG4gIGdhdGV3YXk6IFRleHRHYXRld2F5O1xuICBnYXRld2F5T3B0aW9ucz86IGFueTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFNlcnZpY2UgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHByb3RlY3RlZCBvcHRpb25zOiBUZXh0U2VydmljZU9wdGlvbnM7XG4gIHByb3RlY3RlZCBnYXRld2F5SW5zdGFuY2U/OiBCYXNlVGV4dEdhdGV3YXk7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogVGV4dFNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIoJ1RleHRTZXJ2aWNlJywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5nYXRld2F5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdhdGV3YXkgc3VwcGxpZWQgZm9yIHRoZSBUZXh0IG1lc3NhZ2VzIHNlcnZpY2UnKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRHYXRld2F5KCkuY2F0Y2goZXhjZXB0aW9uID0+IHtcbiAgICAgIExvZ2dlci5lcnJvcihleGNlcHRpb24pXG4gICAgICB0aGlzLmdhdGV3YXlJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGJ1aWx0LWluIGdhdGV3YXkgc3VwcG9ydCBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBpbml0R2F0ZXdheSgpIHtcbiAgICAvLyBIYW5kbGVzIHR3aWxpbyBkeW5hbWljIGluaXRpYWxpemF0aW9uXG4gICAgaWYgKHRoaXMub3B0aW9ucy5nYXRld2F5ID09PSBUZXh0R2F0ZXdheS5UV0lMSU8pIHtcbiAgICAgIHRoaXMuZ2F0ZXdheUluc3RhbmNlID0gbmV3IFR3aWxpb0dhdGV3YXkoe1xuICAgICAgICBmcm9tOiB0aGlzLm9wdGlvbnMuZnJvbSxcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLmdhdGV3YXlPcHRpb25zLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZ2F0ZXdheSA9PT0gVGV4dEdhdGV3YXkuREVCVUcpIHtcbiAgICAgIC8vIEhhbmRsZXMgYSBkZWJ1ZyBnYXRld2F5IChjb25zb2xlKVxuICAgICAgdGhpcy5nYXRld2F5SW5zdGFuY2UgPSB7XG4gICAgICAgIGlzUmVhZHk6IHRydWUsXG4gICAgICAgIGFzeW5jIHNlbmQoKSB7XG4gICAgICAgICAgTG9nZ2VyLndhcm4oJ1RleHRTZXJ2aWNlOiBTZW5kaW5nIFNNUyBhcyB3YXJuaW5nIGxvZ3MgaW4gZGVidWcgbW9kZScsIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cywgbnVsbCwgMikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc2VydmljZSBpcyByZWFkeSBmb3Igc2VuZGluZyB0ZXh0IG1lc3NhZ2VzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGlzUmVhZHkoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuICEhKHRoaXMuZ2F0ZXdheUluc3RhbmNlICYmIHRoaXMuZ2F0ZXdheUluc3RhbmNlLmlzUmVhZHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGFuIGVtYWlsIG1lc3NhZ2UuXG4gICAqIFxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBUZXh0TWVzc2FnZVNjaGVtYSkge1xuICAgIHJldHVybiB0aGlzLmdhdGV3YXlJbnN0YW5jZS5zZW5kKG1lc3NhZ2UpO1xuICB9XG59Il19