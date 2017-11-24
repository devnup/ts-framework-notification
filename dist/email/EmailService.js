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
const path = require("path");
const ts_framework_1 = require("ts-framework");
const nodemailer = require("nodemailer");
const Template = require("email-templates");
const BaseNotificationService_1 = require("../base/BaseNotificationService");
class EmailService extends BaseNotificationService_1.default {
    /**
     * Instantiates a new email service instance.
     *
     * @param options The email service options
     */
    constructor(options) {
        super('EmailService', options);
        this.options = options;
        if (options.transporter) {
            // Transporter instance was given to the constructor
            this.transporter = options.transporter;
        }
        else if (options.connectionUrl) {
            // Instantiate a new Transporter based on SMTP connection URL.
            this.transporter = nodemailer.createTransport(options.connectionUrl);
        }
        else {
            // No transporter available, prepare message for warning or crash
            const message = 'EmailService: The SMTP connectionUrl is not available.';
            if (!options.debug) {
                // No debug mode, crash the service
                throw new Error(message);
            }
            else if (options.verbose) {
                // In debug mode we send all messages to the console
                ts_framework_1.Logger.warn(`${message} All messages will be sent to the console as warnings.`);
            }
        }
        this.options.template = Object.assign({ defaultTemplate: 'cerberus' }, this.options.template);
        // If transporter is available, prepare the template engine
        if (this.transporter && this.options.template.enabled) {
            // Instantiate the template engine renderer for sending cool emails
            this.templateEngine = new Template({
                message: { from: options.from },
                transport: this.transporter,
                views: {
                    root: this.options.template.root || path.join(__dirname, './templates'),
                    options: {
                        extension: this.options.template.engine || 'ejs'
                    }
                }
            });
        }
    }
    /**
     * Gets the singleton email service.
     *
     * @param connectionUrl The email connection url
     */
    static getInstance(options) {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService(options);
        }
        return EmailService.instance;
    }
    /**
     * Verifies if the SMTP connection is OK.
     */
    isReady() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transporter) {
                return false;
            }
            try {
                // If it doesnt throw an error everything is ok.
                yield this.transporter.verify();
                return true;
            }
            catch (exception) {
                ts_framework_1.Logger.debug(exception);
                return false;
            }
        });
    }
    /**
     * Sends an email message.
     *
     * @param options The message options
     */
    send(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const isReady = yield this.isReady();
            if (isReady && this.templateEngine) {
                // Send email using the current template engine
                return this.templateEngine.send({
                    message: options,
                    locals: Object.assign({ getValue: (value, defaultValue) => value || defaultValue }, options.locals),
                    template: options.template || this.options.template.defaultTemplate,
                });
            }
            else if (isReady) {
                // Send simple email using the transporter
                return this.transporter.sendMail(options);
            }
            else {
                const message = 'EmailService is not ready, the SMTP connectionUrl may be invalid or unavailable';
                if (this.options.debug) {
                    // Logs the email body in the console as a warning
                    ts_framework_1.Logger.warn(message, { body: JSON.stringify(options, null, 2) });
                }
                else {
                    // Crash the service, email could not be sent
                    throw new Error(message);
                }
            }
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VtYWlsL0VtYWlsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLCtDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsNENBQTRDO0FBRTVDLDZFQUEwRztBQThDMUcsa0JBQWtDLFNBQVEsaUNBQXVCO0lBSy9EOzs7O09BSUc7SUFDSCxZQUErQixPQUE0QjtRQUN6RCxLQUFLLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBREYsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7UUFFekQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGlFQUFpRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyx3REFBd0QsQ0FBQztZQUV6RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixtQ0FBbUM7Z0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0Isb0RBQW9EO2dCQUNwRCxxQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sd0RB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Q0FBQztnQkFFbEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN2QixrREFBa0Q7b0JBQ2xELHFCQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLDZDQUE2QztvQkFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWhIRCwrQkFnSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAndHMtZnJhbWV3b3JrJztcbmltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgKiBhcyBUZW1wbGF0ZSBmcm9tICdlbWFpbC10ZW1wbGF0ZXMnO1xuaW1wb3J0IHsgVHJhbnNwb3J0VHlwZXMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2UsIHsgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi4vYmFzZS9CYXNlTm90aWZpY2F0aW9uU2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxNZXNzYWdlIHtcbiAgZnJvbT86IHN0cmluZztcbiAgdG86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBzdWJqZWN0OiBzdHJpbmc7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIGh0bWw/OiBzdHJpbmc7XG4gIGNjPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIGJjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuICBsb2NhbHM/OiBhbnk7XG4gIHRlbXBsYXRlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGRlZmF1bHQgc2VuZGVyIGZvciB0aGUgZW1haWxzIHNlbnQgYnkgdGhlIHNlcnZpY2UuXG4gICAqL1xuICBmcm9tOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEUtbWFpbHMgd2lsbCBiZSBzZW50IHRvIGNvbnNvbGUgd2hlbmV2ZXIgdGhlIGNvbm5lY3Rpb25VcmwgaXMgbm90IGF2YWlsYWJsZSBpZiBkZWJ1ZyBpcyBcInRydWVcIi5cbiAgICovXG4gIGRlYnVnPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIFNNVFAgY29ubmVjdGlvbiBVUkwuXG4gICAqL1xuICBjb25uZWN0aW9uVXJsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgTm9kZW1haWxlciB0cmFuc3BvcnRlciB0byBiZSB1c2VkIGFzIHRoZSBzZW5kZXIgZW5naW5lLlxuICAgKi9cbiAgdHJhbnNwb3J0ZXI/OiBub2RlbWFpbGVyLlRyYW5zcG9ydGVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgZW5naW5lIG9wdGlvbnMsIGlmIGVuYWJsZWRcbiAgICovXG4gIHRlbXBsYXRlPzoge1xuICAgIHJvb3Q/OiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgZGVmYXVsdFRlbXBsYXRlPzogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYWlsU2VydmljZSBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyYW5zcG9ydGVyPzogbm9kZW1haWxlci5UcmFuc3BvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRlbXBsYXRlRW5naW5lPzogVGVtcGxhdGU7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IEVtYWlsU2VydmljZTtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGEgbmV3IGVtYWlsIHNlcnZpY2UgaW5zdGFuY2UuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZW1haWwgc2VydmljZSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogRW1haWxTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKCdFbWFpbFNlcnZpY2UnLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy50cmFuc3BvcnRlcikge1xuICAgICAgLy8gVHJhbnNwb3J0ZXIgaW5zdGFuY2Ugd2FzIGdpdmVuIHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgdGhpcy50cmFuc3BvcnRlciA9IG9wdGlvbnMudHJhbnNwb3J0ZXI7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmNvbm5lY3Rpb25VcmwpIHtcbiAgICAgIC8vIEluc3RhbnRpYXRlIGEgbmV3IFRyYW5zcG9ydGVyIGJhc2VkIG9uIFNNVFAgY29ubmVjdGlvbiBVUkwuXG4gICAgICB0aGlzLnRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQob3B0aW9ucy5jb25uZWN0aW9uVXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gdHJhbnNwb3J0ZXIgYXZhaWxhYmxlLCBwcmVwYXJlIG1lc3NhZ2UgZm9yIHdhcm5pbmcgb3IgY3Jhc2hcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnRW1haWxTZXJ2aWNlOiBUaGUgU01UUCBjb25uZWN0aW9uVXJsIGlzIG5vdCBhdmFpbGFibGUuJztcblxuICAgICAgaWYgKCFvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIE5vIGRlYnVnIG1vZGUsIGNyYXNoIHRoZSBzZXJ2aWNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgIC8vIEluIGRlYnVnIG1vZGUgd2Ugc2VuZCBhbGwgbWVzc2FnZXMgdG8gdGhlIGNvbnNvbGVcbiAgICAgICAgTG9nZ2VyLndhcm4oYCR7bWVzc2FnZX0gQWxsIG1lc3NhZ2VzIHdpbGwgYmUgc2VudCB0byB0aGUgY29uc29sZSBhcyB3YXJuaW5ncy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMudGVtcGxhdGUgPSB7IGRlZmF1bHRUZW1wbGF0ZTogJ2NlcmJlcnVzJywgLi4udGhpcy5vcHRpb25zLnRlbXBsYXRlIH07XG5cbiAgICAvLyBJZiB0cmFuc3BvcnRlciBpcyBhdmFpbGFibGUsIHByZXBhcmUgdGhlIHRlbXBsYXRlIGVuZ2luZVxuICAgIGlmICh0aGlzLnRyYW5zcG9ydGVyICYmIHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5lbmFibGVkKSB7XG5cbiAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSB0ZW1wbGF0ZSBlbmdpbmUgcmVuZGVyZXIgZm9yIHNlbmRpbmcgY29vbCBlbWFpbHNcbiAgICAgIHRoaXMudGVtcGxhdGVFbmdpbmUgPSBuZXcgVGVtcGxhdGUoe1xuICAgICAgICBtZXNzYWdlOiB7IGZyb206IG9wdGlvbnMuZnJvbSB9LFxuICAgICAgICB0cmFuc3BvcnQ6IHRoaXMudHJhbnNwb3J0ZXIsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgcm9vdDogdGhpcy5vcHRpb25zLnRlbXBsYXRlLnJvb3QgfHwgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vdGVtcGxhdGVzJyksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLm9wdGlvbnMudGVtcGxhdGUuZW5naW5lIHx8ICdlanMnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGVtYWlsIHNlcnZpY2UuXG4gICAqIFxuICAgKiBAcGFyYW0gY29ubmVjdGlvblVybCBUaGUgZW1haWwgY29ubmVjdGlvbiB1cmxcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2Uob3B0aW9ucz86IEVtYWlsU2VydmljZU9wdGlvbnMpOiBFbWFpbFNlcnZpY2Uge1xuICAgIGlmICghRW1haWxTZXJ2aWNlLmluc3RhbmNlKSB7XG4gICAgICBFbWFpbFNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgRW1haWxTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gRW1haWxTZXJ2aWNlLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBTTVRQIGNvbm5lY3Rpb24gaXMgT0suXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNSZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMudHJhbnNwb3J0ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIElmIGl0IGRvZXNudCB0aHJvdyBhbiBlcnJvciBldmVyeXRoaW5nIGlzIG9rLlxuICAgICAgYXdhaXQgdGhpcy50cmFuc3BvcnRlci52ZXJpZnkoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgTG9nZ2VyLmRlYnVnKGV4Y2VwdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGFuIGVtYWlsIG1lc3NhZ2UuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgbWVzc2FnZSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChvcHRpb25zOiBFbWFpbE1lc3NhZ2UpIHtcbiAgICBjb25zdCBpc1JlYWR5ID0gYXdhaXQgdGhpcy5pc1JlYWR5KCk7XG5cbiAgICBpZiAoaXNSZWFkeSAmJiB0aGlzLnRlbXBsYXRlRW5naW5lKSB7XG4gICAgICAvLyBTZW5kIGVtYWlsIHVzaW5nIHRoZSBjdXJyZW50IHRlbXBsYXRlIGVuZ2luZVxuICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVFbmdpbmUuc2VuZCh7XG4gICAgICAgIG1lc3NhZ2U6IG9wdGlvbnMsXG4gICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgIGdldFZhbHVlOiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4gdmFsdWUgfHwgZGVmYXVsdFZhbHVlLFxuICAgICAgICAgIC4uLm9wdGlvbnMubG9jYWxzXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiBvcHRpb25zLnRlbXBsYXRlIHx8IHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5kZWZhdWx0VGVtcGxhdGUsXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoaXNSZWFkeSkge1xuICAgICAgLy8gU2VuZCBzaW1wbGUgZW1haWwgdXNpbmcgdGhlIHRyYW5zcG9ydGVyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRlci5zZW5kTWFpbChvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICdFbWFpbFNlcnZpY2UgaXMgbm90IHJlYWR5LCB0aGUgU01UUCBjb25uZWN0aW9uVXJsIG1heSBiZSBpbnZhbGlkIG9yIHVuYXZhaWxhYmxlJztcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAvLyBMb2dzIHRoZSBlbWFpbCBib2R5IGluIHRoZSBjb25zb2xlIGFzIGEgd2FybmluZ1xuICAgICAgICBMb2dnZXIud2FybihtZXNzYWdlLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMsIG51bGwsIDIpIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ3Jhc2ggdGhlIHNlcnZpY2UsIGVtYWlsIGNvdWxkIG5vdCBiZSBzZW50XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iXX0=