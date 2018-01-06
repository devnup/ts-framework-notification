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
const types_1 = require("./types");
const firebase_1 = require("./firebase");
const email_1 = require("./email");
const base_1 = require("./base");
class Notification extends base_1.BaseNotificationService {
    constructor(options) {
        super('NotificationService', options);
        this.transports = {};
        // At least one transport must be supplied to use this abstraction layer
        if (!this.options.email && !this.options.firebase) {
            throw new Error('No transports configured, you need to specifiy at least one debug service to use the Notification layer.');
        }
        // Initialize the email transport, if available
        if (this.options.email) {
            this.transports.email = new email_1.Email(this.options.email);
        }
        // Initialize the firebase transport, if available
        if (this.options.firebase) {
            this.transports.firebase = new firebase_1.Firebase(this.options.firebase);
        }
    }
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be a Email message or a Firebase message.
     * @param options The options to be sent to the Transporter
     */
    send(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message._type === types_1.TransportTypes.EMAIL && this.transports.email) {
                return this.transports.email.send(message);
            }
            else if (message._type === types_1.TransportTypes.FIREBASE && this.transports.firebase) {
                return this.transports.firebase.send(message, options);
            }
            else {
                throw new Error(`${this.name}: Transport not available or misconfigured: "${message._type}"`);
            }
        });
    }
}
exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsbUNBQXlDO0FBQ3pDLHlDQUE2RDtBQUM3RCxtQ0FBa0U7QUFDbEUsaUNBQWlGO0FBUWpGLGtCQUFrQyxTQUFRLDhCQUF1QjtJQU8vRCxZQUFZLE9BQTRCO1FBQ3RDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVyQix3RUFBd0U7UUFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLElBQUksS0FBSyxDQUFDLDBHQUEwRyxDQUFDLENBQUM7UUFDOUgsQ0FBQztRQUVELCtDQUErQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBRUQsa0RBQWtEO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsSUFBSSxDQUFDLE9BQW1ELEVBQUUsT0FBYTs7WUFDbEYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxzQkFBYyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBNkIsQ0FBQyxDQUFDO1lBQ25FLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxzQkFBYyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBZ0MsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNsRixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGdEQUFnRCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNoRyxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBRUY7QUEzQ0QsK0JBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm90aWZpY2F0aW9uT3B0aW9ucyB9IGZyb20gJy4vTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IFRyYW5zcG9ydFR5cGVzIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBGaXJlYmFzZSwgRmlyZWJhc2VNZXNzYWdlU2NoZW1hIH0gZnJvbSAnLi9maXJlYmFzZSc7XG5pbXBvcnQgeyBFbWFpbCwgRW1haWxNZXNzYWdlLCBFbWFpbE1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL2VtYWlsJztcbmltcG9ydCB7IEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlLCBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2VPcHRpb25zLCBFbWFpbFNlcnZpY2VPcHRpb25zIH0gZnJvbSAnaW5kZXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmaXJlYmFzZT86IEZpcmViYXNlU2VydmljZU9wdGlvbnNcbiAgZW1haWw/OiBFbWFpbFNlcnZpY2VPcHRpb25zXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgb3B0aW9uczogTm90aWZpY2F0aW9uT3B0aW9uc1xuICB0cmFuc3BvcnRzOiB7XG4gICAgZW1haWw/OiBFbWFpbFxuICAgIGZpcmViYXNlPzogRmlyZWJhc2VcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMpIHtcbiAgICBzdXBlcignTm90aWZpY2F0aW9uU2VydmljZScsIG9wdGlvbnMpO1xuICAgIHRoaXMudHJhbnNwb3J0cyA9IHt9O1xuXG4gICAgLy8gQXQgbGVhc3Qgb25lIHRyYW5zcG9ydCBtdXN0IGJlIHN1cHBsaWVkIHRvIHVzZSB0aGlzIGFic3RyYWN0aW9uIGxheWVyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZW1haWwgJiYgIXRoaXMub3B0aW9ucy5maXJlYmFzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB0cmFuc3BvcnRzIGNvbmZpZ3VyZWQsIHlvdSBuZWVkIHRvIHNwZWNpZml5IGF0IGxlYXN0IG9uZSBkZWJ1ZyBzZXJ2aWNlIHRvIHVzZSB0aGUgTm90aWZpY2F0aW9uIGxheWVyLicpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGVtYWlsIHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbWFpbCkge1xuICAgICAgdGhpcy50cmFuc3BvcnRzLmVtYWlsID0gbmV3IEVtYWlsKHRoaXMub3B0aW9ucy5lbWFpbClcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBmaXJlYmFzZSB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpIHtcbiAgICAgIHRoaXMudHJhbnNwb3J0cy5maXJlYmFzZSA9IG5ldyBGaXJlYmFzZSh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgbm90aWZpY2F0aW9uIHVzaW5nIHRoZSBjdXJyZW50bHkgYXZhaWxhYmxlIGFuZCBjb25maWd1cmVkIHRyYW5zcG9ydGVycy5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBub3RpZmljYXRpb24gdG8gYmUgc2VudCwgY2FuIGJlIGEgRW1haWwgbWVzc2FnZSBvciBhIEZpcmViYXNlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIHRvIGJlIHNlbnQgdG8gdGhlIFRyYW5zcG9ydGVyXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlOiBFbWFpbE1lc3NhZ2VTY2hlbWEgfCBGaXJlYmFzZU1lc3NhZ2VTY2hlbWEsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICBpZiAobWVzc2FnZS5fdHlwZSA9PT0gVHJhbnNwb3J0VHlwZXMuRU1BSUwgJiYgdGhpcy50cmFuc3BvcnRzLmVtYWlsKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRzLmVtYWlsLnNlbmQobWVzc2FnZSBhcyBFbWFpbE1lc3NhZ2VTY2hlbWEpO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZS5fdHlwZSA9PT0gVHJhbnNwb3J0VHlwZXMuRklSRUJBU0UgJiYgdGhpcy50cmFuc3BvcnRzLmZpcmViYXNlKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRzLmZpcmViYXNlLnNlbmQobWVzc2FnZSBhcyBGaXJlYmFzZU1lc3NhZ2VTY2hlbWEsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5uYW1lfTogVHJhbnNwb3J0IG5vdCBhdmFpbGFibGUgb3IgbWlzY29uZmlndXJlZDogXCIke21lc3NhZ2UuX3R5cGV9XCJgKTtcbiAgICB9XG4gIH1cblxufSJdfQ==