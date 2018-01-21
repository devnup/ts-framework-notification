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
    constructor(options = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VtYWlsL0VtYWlsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLCtDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsNENBQTRDO0FBRTVDLGtDQUFrRjtBQUNsRixpREFBa0U7QUFrQ2xFLGtCQUFrQyxTQUFRLDhCQUF1QjtJQUkvRDs7OztPQUlHO0lBQ0gsWUFBK0IsVUFBK0IsRUFBRTtRQUM5RCxLQUFLLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBREYsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFFOUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGlFQUFpRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLDRDQUE0QyxDQUFDO1lBRXpFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLG1DQUFtQztnQkFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixvREFBb0Q7Z0JB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QUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsa0RBQWtEO29CQUNsRCxxQkFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDckUsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTiw2Q0FBNkM7b0JBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFwR0QsK0JBb0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3RzLWZyYW1ld29yayc7XG5pbXBvcnQgKiBhcyBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInO1xuaW1wb3J0ICogYXMgVGVtcGxhdGUgZnJvbSAnZW1haWwtdGVtcGxhdGVzJztcbmltcG9ydCB7IFRyYW5zcG9ydFR5cGVzIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2UsIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IEVtYWlsTWVzc2FnZSwgeyBFbWFpbE1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL0VtYWlsTWVzc2FnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBzZW5kZXIgZm9yIHRoZSBlbWFpbHMgc2VudCBieSB0aGUgc2VydmljZS5cbiAgICovXG4gIGZyb20/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEUtbWFpbHMgd2lsbCBiZSBzZW50IHRvIGNvbnNvbGUgd2hlbmV2ZXIgdGhlIGNvbm5lY3Rpb25VcmwgaXMgbm90IGF2YWlsYWJsZSBpZiBkZWJ1ZyBpcyBcInRydWVcIi5cbiAgICovXG4gIGRlYnVnPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIFNNVFAgY29ubmVjdGlvbiBVUkwuXG4gICAqL1xuICBjb25uZWN0aW9uVXJsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgTm9kZW1haWxlciB0cmFuc3BvcnRlciB0byBiZSB1c2VkIGFzIHRoZSBzZW5kZXIgZW5naW5lLlxuICAgKi9cbiAgdHJhbnNwb3J0ZXI/OiBub2RlbWFpbGVyLlRyYW5zcG9ydGVyO1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgZW5naW5lIG9wdGlvbnMsIGlmIGVuYWJsZWRcbiAgICovXG4gIHRlbXBsYXRlPzoge1xuICAgIHJvb3Q/OiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgZGVmYXVsdFRlbXBsYXRlPzogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtYWlsU2VydmljZSBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyYW5zcG9ydGVyPzogbm9kZW1haWxlci5UcmFuc3BvcnRlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRlbXBsYXRlRW5naW5lPzogVGVtcGxhdGU7XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhIG5ldyBlbWFpbCBzZXJ2aWNlIGluc3RhbmNlLlxuICAgKiBcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGVtYWlsIHNlcnZpY2Ugb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEVtYWlsU2VydmljZU9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKCdFbWFpbFNlcnZpY2UnLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy50cmFuc3BvcnRlcikge1xuICAgICAgLy8gVHJhbnNwb3J0ZXIgaW5zdGFuY2Ugd2FzIGdpdmVuIHRvIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgdGhpcy50cmFuc3BvcnRlciA9IG9wdGlvbnMudHJhbnNwb3J0ZXI7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmNvbm5lY3Rpb25VcmwpIHtcbiAgICAgIC8vIEluc3RhbnRpYXRlIGEgbmV3IFRyYW5zcG9ydGVyIGJhc2VkIG9uIFNNVFAgY29ubmVjdGlvbiBVUkwuXG4gICAgICB0aGlzLnRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQob3B0aW9ucy5jb25uZWN0aW9uVXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gdHJhbnNwb3J0ZXIgYXZhaWxhYmxlLCBwcmVwYXJlIG1lc3NhZ2UgZm9yIHdhcm5pbmcgb3IgY3Jhc2hcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLm5hbWV9OiBUaGUgU01UUCBjb25uZWN0aW9uVXJsIGlzIG5vdCBhdmFpbGFibGUuYDtcblxuICAgICAgaWYgKCFvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIC8vIE5vIGRlYnVnIG1vZGUsIGNyYXNoIHRoZSBzZXJ2aWNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgIC8vIEluIGRlYnVnIG1vZGUgd2Ugc2VuZCBhbGwgbWVzc2FnZXMgdG8gdGhlIGNvbnNvbGVcbiAgICAgICAgTG9nZ2VyLndhcm4oYCR7bWVzc2FnZX0gQWxsIG1lc3NhZ2VzIHdpbGwgYmUgc2VudCB0byB0aGUgY29uc29sZSBhcyB3YXJuaW5ncy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMudGVtcGxhdGUgPSB7IGRlZmF1bHRUZW1wbGF0ZTogJ2NlcmJlcnVzJywgLi4udGhpcy5vcHRpb25zLnRlbXBsYXRlIH07XG5cbiAgICAvLyBJZiB0cmFuc3BvcnRlciBpcyBhdmFpbGFibGUsIHByZXBhcmUgdGhlIHRlbXBsYXRlIGVuZ2luZVxuICAgIGlmICh0aGlzLnRyYW5zcG9ydGVyICYmIHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5lbmFibGVkKSB7XG5cbiAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSB0ZW1wbGF0ZSBlbmdpbmUgcmVuZGVyZXIgZm9yIHNlbmRpbmcgY29vbCBlbWFpbHNcbiAgICAgIHRoaXMudGVtcGxhdGVFbmdpbmUgPSBuZXcgVGVtcGxhdGUoe1xuICAgICAgICBtZXNzYWdlOiB7IGZyb206IG9wdGlvbnMuZnJvbSB9LFxuICAgICAgICB0cmFuc3BvcnQ6IHRoaXMudHJhbnNwb3J0ZXIsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgcm9vdDogdGhpcy5vcHRpb25zLnRlbXBsYXRlLnJvb3QgfHwgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vdGVtcGxhdGVzJyksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZW5zaW9uOiB0aGlzLm9wdGlvbnMudGVtcGxhdGUuZW5naW5lIHx8ICdlanMnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgaWYgdGhlIFNNVFAgY29ubmVjdGlvbiBpcyBPSy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpc1JlYWR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghdGhpcy50cmFuc3BvcnRlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gSWYgaXQgZG9lc250IHRocm93IGFuIGVycm9yIGV2ZXJ5dGhpbmcgaXMgb2suXG4gICAgICBhd2FpdCB0aGlzLnRyYW5zcG9ydGVyLnZlcmlmeSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBMb2dnZXIuZGVidWcoZXhjZXB0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYW4gZW1haWwgbWVzc2FnZS5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IEVtYWlsTWVzc2FnZVNjaGVtYSkge1xuICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlID0gbWVzc2FnZSBpbnN0YW5jZW9mIEVtYWlsTWVzc2FnZSA/IG1lc3NhZ2UgOiBuZXcgRW1haWxNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIGNvbnN0IGlzUmVhZHkgPSBhd2FpdCB0aGlzLmlzUmVhZHkoKTtcblxuICAgIGlmIChpc1JlYWR5ICYmIHRoaXMudGVtcGxhdGVFbmdpbmUpIHtcbiAgICAgIC8vIFNlbmQgZW1haWwgdXNpbmcgdGhlIGN1cnJlbnQgdGVtcGxhdGUgZW5naW5lXG4gICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZUVuZ2luZS5zZW5kKHtcbiAgICAgICAgbWVzc2FnZTogZGF0YSxcbiAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgZ2V0VmFsdWU6ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB2YWx1ZSB8fCBkZWZhdWx0VmFsdWUsXG4gICAgICAgICAgLi4uZGF0YS5sb2NhbHNcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IGRhdGEudGVtcGxhdGUgfHwgdGhpcy5vcHRpb25zLnRlbXBsYXRlLmRlZmF1bHRUZW1wbGF0ZSxcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmIChpc1JlYWR5KSB7XG4gICAgICAvLyBTZW5kIHNpbXBsZSBlbWFpbCB1c2luZyB0aGUgdHJhbnNwb3J0ZXJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydGVyLnNlbmRNYWlsKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgJHt0aGlzLm5hbWV9IGlzIG5vdCByZWFkeSwgdGhlIFNNVFAgY29ubmVjdGlvblVybCBtYXkgYmUgaW52YWxpZCBvciB1bmF2YWlsYWJsZWA7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTG9ncyB0aGUgZW1haWwgYm9keSBpbiB0aGUgY29uc29sZSBhcyBhIHdhcm5pbmdcbiAgICAgICAgTG9nZ2VyLndhcm4oZXJyb3JNZXNzYWdlLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ3Jhc2ggdGhlIHNlcnZpY2UsIGVtYWlsIGNvdWxkIG5vdCBiZSBzZW50XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSJdfQ==