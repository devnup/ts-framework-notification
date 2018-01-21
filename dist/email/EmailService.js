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
const base_1 = require("../base");
const EmailMessage_1 = require("./EmailMessage");
class EmailService extends base_1.BaseNotificationService {
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
            const message = `${this.name}: The SMTP connectionUrl is not available.`;
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
     * @param message The message options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = message = message instanceof EmailMessage_1.default ? message : new EmailMessage_1.default(message);
            const isReady = yield this.isReady();
            if (isReady && this.templateEngine) {
                // Send email using the current template engine
                return this.templateEngine.send({
                    message: data,
                    locals: Object.assign({ getValue: (value, defaultValue) => value || defaultValue }, data.locals),
                    template: data.template || this.options.template.defaultTemplate,
                });
            }
            else if (isReady) {
                // Send simple email using the transporter
                return this.transporter.sendMail(data);
            }
            else {
                const errorMessage = `${this.name} is not ready, the SMTP connectionUrl may be invalid or unavailable`;
                if (this.options.debug) {
                    // Logs the email body in the console as a warning
                    ts_framework_1.Logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
                }
                else {
                    // Crash the service, email could not be sent
                    throw new Error(errorMessage);
                }
            }
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VtYWlsL0VtYWlsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLCtDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsNENBQTRDO0FBRTVDLGtDQUFrRjtBQUNsRixpREFBa0U7QUFrQ2xFLGtCQUFrQyxTQUFRLDhCQUF1QjtJQUkvRDs7OztPQUlHO0lBQ0gsWUFBK0IsT0FBNEI7UUFDekQsS0FBSyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQURGLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBRXpELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNqQyw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixpRUFBaUU7WUFDakUsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSw0Q0FBNEMsQ0FBQztZQUV6RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixtQ0FBbUM7Z0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0Isb0RBQW9EO2dCQUNwRCxx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QUssQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGtEQUFrRDtvQkFDbEQscUJBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sNkNBQTZDO29CQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBcEdELCtCQW9HQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd0cy1mcmFtZXdvcmsnO1xuaW1wb3J0ICogYXMgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcbmltcG9ydCAqIGFzIFRlbXBsYXRlIGZyb20gJ2VtYWlsLXRlbXBsYXRlcyc7XG5pbXBvcnQgeyBUcmFuc3BvcnRUeXBlcyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlLCBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCBFbWFpbE1lc3NhZ2UsIHsgRW1haWxNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9FbWFpbE1lc3NhZ2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVtYWlsU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGRlZmF1bHQgc2VuZGVyIGZvciB0aGUgZW1haWxzIHNlbnQgYnkgdGhlIHNlcnZpY2UuXG4gICAqL1xuICBmcm9tOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEUtbWFpbHMgd2lsbCBiZSBzZW50IHRvIGNvbnNvbGUgd2hlbmV2ZXIgdGhlIGNvbm5lY3Rpb25VcmwgaXMgbm90IGF2YWlsYWJsZSBpZiBkZWJ1ZyBpcyBcInRydWVcIi5cbiAgICovXG4gIGRlYnVnPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIFNNVFAgY29ubmVjdGlvbiBVUkwuXG4gICAqL1xuICBjb25uZWN0aW9uVXJsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgTm9kZW1haWxlciB0cmFuc3BvcnRlciB0byBiZSB1c2VkIGFzIHRoZSBzZW5kZXIgZW5naW5lLlxuICAgKi9cbiAgdHJhbnNwb3J0ZXI/OiBub2RlbWFpbGVyLlRyYW5zcG9ydGVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgZW5naW5lIG9wdGlvbnMsIGlmIGVuYWJsZWRcbiAgICovXG4gIHRlbXBsYXRlPzoge1xuICAgIHJvb3Q/OiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgZGVmYXVsdFRlbXBsYXRlPzogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYWlsU2VydmljZSBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyYW5zcG9ydGVyPzogbm9kZW1haWxlci5UcmFuc3BvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRlbXBsYXRlRW5naW5lPzogVGVtcGxhdGU7XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhIG5ldyBlbWFpbCBzZXJ2aWNlIGluc3RhbmNlLlxuICAgKiBcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGVtYWlsIHNlcnZpY2Ugb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEVtYWlsU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcignRW1haWxTZXJ2aWNlJywgb3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMudHJhbnNwb3J0ZXIpIHtcbiAgICAgIC8vIFRyYW5zcG9ydGVyIGluc3RhbmNlIHdhcyBnaXZlbiB0byB0aGUgY29uc3RydWN0b3JcbiAgICAgIHRoaXMudHJhbnNwb3J0ZXIgPSBvcHRpb25zLnRyYW5zcG9ydGVyO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5jb25uZWN0aW9uVXJsKSB7XG4gICAgICAvLyBJbnN0YW50aWF0ZSBhIG5ldyBUcmFuc3BvcnRlciBiYXNlZCBvbiBTTVRQIGNvbm5lY3Rpb24gVVJMLlxuICAgICAgdGhpcy50cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KG9wdGlvbnMuY29ubmVjdGlvblVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIHRyYW5zcG9ydGVyIGF2YWlsYWJsZSwgcHJlcGFyZSBtZXNzYWdlIGZvciB3YXJuaW5nIG9yIGNyYXNoXG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5uYW1lfTogVGhlIFNNVFAgY29ubmVjdGlvblVybCBpcyBub3QgYXZhaWxhYmxlLmA7XG5cbiAgICAgIGlmICghb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAvLyBObyBkZWJ1ZyBtb2RlLCBjcmFzaCB0aGUgc2VydmljZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgICAvLyBJbiBkZWJ1ZyBtb2RlIHdlIHNlbmQgYWxsIG1lc3NhZ2VzIHRvIHRoZSBjb25zb2xlXG4gICAgICAgIExvZ2dlci53YXJuKGAke21lc3NhZ2V9IEFsbCBtZXNzYWdlcyB3aWxsIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUgYXMgd2FybmluZ3MuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zLnRlbXBsYXRlID0geyBkZWZhdWx0VGVtcGxhdGU6ICdjZXJiZXJ1cycsIC4uLnRoaXMub3B0aW9ucy50ZW1wbGF0ZSB9O1xuXG4gICAgLy8gSWYgdHJhbnNwb3J0ZXIgaXMgYXZhaWxhYmxlLCBwcmVwYXJlIHRoZSB0ZW1wbGF0ZSBlbmdpbmVcbiAgICBpZiAodGhpcy50cmFuc3BvcnRlciAmJiB0aGlzLm9wdGlvbnMudGVtcGxhdGUuZW5hYmxlZCkge1xuXG4gICAgICAvLyBJbnN0YW50aWF0ZSB0aGUgdGVtcGxhdGUgZW5naW5lIHJlbmRlcmVyIGZvciBzZW5kaW5nIGNvb2wgZW1haWxzXG4gICAgICB0aGlzLnRlbXBsYXRlRW5naW5lID0gbmV3IFRlbXBsYXRlKHtcbiAgICAgICAgbWVzc2FnZTogeyBmcm9tOiBvcHRpb25zLmZyb20gfSxcbiAgICAgICAgdHJhbnNwb3J0OiB0aGlzLnRyYW5zcG9ydGVyLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIHJvb3Q6IHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5yb290IHx8IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3RlbXBsYXRlcycpLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5vcHRpb25zLnRlbXBsYXRlLmVuZ2luZSB8fCAnZWpzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBTTVRQIGNvbm5lY3Rpb24gaXMgT0suXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNSZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMudHJhbnNwb3J0ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIElmIGl0IGRvZXNudCB0aHJvdyBhbiBlcnJvciBldmVyeXRoaW5nIGlzIG9rLlxuICAgICAgYXdhaXQgdGhpcy50cmFuc3BvcnRlci52ZXJpZnkoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgTG9nZ2VyLmRlYnVnKGV4Y2VwdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGFuIGVtYWlsIG1lc3NhZ2UuXG4gICAqIFxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBFbWFpbE1lc3NhZ2VTY2hlbWEpIHtcbiAgICBjb25zdCBkYXRhID0gbWVzc2FnZSA9IG1lc3NhZ2UgaW5zdGFuY2VvZiBFbWFpbE1lc3NhZ2UgPyBtZXNzYWdlIDogbmV3IEVtYWlsTWVzc2FnZShtZXNzYWdlKTtcbiAgICBjb25zdCBpc1JlYWR5ID0gYXdhaXQgdGhpcy5pc1JlYWR5KCk7XG5cbiAgICBpZiAoaXNSZWFkeSAmJiB0aGlzLnRlbXBsYXRlRW5naW5lKSB7XG4gICAgICAvLyBTZW5kIGVtYWlsIHVzaW5nIHRoZSBjdXJyZW50IHRlbXBsYXRlIGVuZ2luZVxuICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVFbmdpbmUuc2VuZCh7XG4gICAgICAgIG1lc3NhZ2U6IGRhdGEsXG4gICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgIGdldFZhbHVlOiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4gdmFsdWUgfHwgZGVmYXVsdFZhbHVlLFxuICAgICAgICAgIC4uLmRhdGEubG9jYWxzXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiBkYXRhLnRlbXBsYXRlIHx8IHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5kZWZhdWx0VGVtcGxhdGUsXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoaXNSZWFkeSkge1xuICAgICAgLy8gU2VuZCBzaW1wbGUgZW1haWwgdXNpbmcgdGhlIHRyYW5zcG9ydGVyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRlci5zZW5kTWFpbChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7dGhpcy5uYW1lfSBpcyBub3QgcmVhZHksIHRoZSBTTVRQIGNvbm5lY3Rpb25VcmwgbWF5IGJlIGludmFsaWQgb3IgdW5hdmFpbGFibGVgO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIExvZ3MgdGhlIGVtYWlsIGJvZHkgaW4gdGhlIGNvbnNvbGUgYXMgYSB3YXJuaW5nXG4gICAgICAgIExvZ2dlci53YXJuKGVycm9yTWVzc2FnZSwgeyBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyYXNoIHRoZSBzZXJ2aWNlLCBlbWFpbCBjb3VsZCBub3QgYmUgc2VudFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iXX0=