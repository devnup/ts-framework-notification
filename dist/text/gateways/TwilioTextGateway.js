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
class TwilioTextGateway {
    constructor(options) {
        this.options = options;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const Twilio = yield Promise.resolve().then(() => require('twilio'));
            const { accountSid, authToken } = this.options;
            if (!accountSid || !authToken) {
                throw new Error('Tried to instantiate the Twilio SMS gateway without a valid set of credentials');
            }
            this.client = Twilio(accountSid, authToken);
        });
    }
    send(message) {
        return this.client.messages.create({
            body: message.text,
            from: message.from || this.options.from,
            to: message.to,
        });
    }
}
exports.default = TwilioTextGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdpbGlvVGV4dEdhdGV3YXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvdGV4dC9nYXRld2F5cy9Ud2lsaW9UZXh0R2F0ZXdheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBU0E7SUFHRSxZQUFzQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUNqRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRWUsSUFBSTs7WUFDbEIsTUFBTSxNQUFNLEdBQUcsMkNBQWEsUUFBUSxFQUFDLENBQUM7WUFDdEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRy9DLEVBQUUsQ0FBQSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1lBQ3BHLENBQUM7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUFBO0lBRU0sSUFBSSxDQUFDLE9BQTBCO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtZQUN2QyxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExQkQsb0NBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dE1lc3NhZ2VTY2hlbWEgfSBmcm9tIFwiLi4vVGV4dE1lc3NhZ2VcIjtcbmltcG9ydCB7IEJhc2VUZXh0R2F0ZXdheSB9IGZyb20gXCIuL0Jhc2VUZXh0R2F0ZXdheVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR3aWxpb0dhdGV3YXlPcHRpb25zIHtcbiAgZnJvbTogc3RyaW5nO1xuICBhY2NvdW50U2lkOiBzdHJpbmc7XG4gIGF1dGhUb2tlbjogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2lsaW9UZXh0R2F0ZXdheSBpbXBsZW1lbnRzIEJhc2VUZXh0R2F0ZXdheSB7XG4gIGNsaWVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBUd2lsaW9HYXRld2F5T3B0aW9ucykge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGluaXQoKSB7XG4gICAgY29uc3QgVHdpbGlvID0gYXdhaXQgaW1wb3J0KCd0d2lsaW8nKTtcbiAgICBjb25zdCB7IGFjY291bnRTaWQsIGF1dGhUb2tlbiB9ID0gdGhpcy5vcHRpb25zO1xuICAgIFxuXG4gICAgaWYoIWFjY291bnRTaWQgfHwgIWF1dGhUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBpbnN0YW50aWF0ZSB0aGUgVHdpbGlvIFNNUyBnYXRld2F5IHdpdGhvdXQgYSB2YWxpZCBzZXQgb2YgY3JlZGVudGlhbHMnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsaWVudCA9IFR3aWxpbyhhY2NvdW50U2lkLCBhdXRoVG9rZW4pO1xuICB9XG5cbiAgcHVibGljIHNlbmQobWVzc2FnZTogVGV4dE1lc3NhZ2VTY2hlbWEpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQubWVzc2FnZXMuY3JlYXRlKHtcbiAgICAgIGJvZHk6IG1lc3NhZ2UudGV4dCxcbiAgICAgIGZyb206IG1lc3NhZ2UuZnJvbSB8fCB0aGlzLm9wdGlvbnMuZnJvbSxcbiAgICAgIHRvOiBtZXNzYWdlLnRvLFxuICAgIH0pO1xuICB9XG59Il19