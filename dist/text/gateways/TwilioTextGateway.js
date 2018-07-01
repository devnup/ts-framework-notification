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
        this.isReady = false;
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
            this.isReady = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdpbGlvVGV4dEdhdGV3YXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvdGV4dC9nYXRld2F5cy9Ud2lsaW9UZXh0R2F0ZXdheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBU0E7SUFJRSxZQUFzQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUZuRCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVlLElBQUk7O1lBQ2xCLE1BQU0sTUFBTSxHQUFHLDJDQUFhLFFBQVEsRUFBQyxDQUFDO1lBQ3RDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUcvQyxFQUFFLENBQUEsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztZQUNwRyxDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7S0FBQTtJQUVNLElBQUksQ0FBQyxPQUEwQjtRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2pDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDdkMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBNUJELG9DQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRNZXNzYWdlU2NoZW1hIH0gZnJvbSBcIi4uL1RleHRNZXNzYWdlXCI7XG5pbXBvcnQgeyBCYXNlVGV4dEdhdGV3YXkgfSBmcm9tIFwiLi9CYXNlVGV4dEdhdGV3YXlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUd2lsaW9HYXRld2F5T3B0aW9ucyB7XG4gIGZyb206IHN0cmluZztcbiAgYWNjb3VudFNpZDogc3RyaW5nO1xuICBhdXRoVG9rZW46IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHdpbGlvVGV4dEdhdGV3YXkgaW1wbGVtZW50cyBCYXNlVGV4dEdhdGV3YXkge1xuICBjbGllbnQ6IGFueTtcbiAgaXNSZWFkeSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBUd2lsaW9HYXRld2F5T3B0aW9ucykge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGluaXQoKSB7XG4gICAgY29uc3QgVHdpbGlvID0gYXdhaXQgaW1wb3J0KCd0d2lsaW8nKTtcbiAgICBjb25zdCB7IGFjY291bnRTaWQsIGF1dGhUb2tlbiB9ID0gdGhpcy5vcHRpb25zO1xuICAgIFxuXG4gICAgaWYoIWFjY291bnRTaWQgfHwgIWF1dGhUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBpbnN0YW50aWF0ZSB0aGUgVHdpbGlvIFNNUyBnYXRld2F5IHdpdGhvdXQgYSB2YWxpZCBzZXQgb2YgY3JlZGVudGlhbHMnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsaWVudCA9IFR3aWxpbyhhY2NvdW50U2lkLCBhdXRoVG9rZW4pO1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc2VuZChtZXNzYWdlOiBUZXh0TWVzc2FnZVNjaGVtYSkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5tZXNzYWdlcy5jcmVhdGUoe1xuICAgICAgYm9keTogbWVzc2FnZS50ZXh0LFxuICAgICAgZnJvbTogbWVzc2FnZS5mcm9tIHx8IHRoaXMub3B0aW9ucy5mcm9tLFxuICAgICAgdG86IG1lc3NhZ2UudG8sXG4gICAgfSk7XG4gIH1cbn0iXX0=