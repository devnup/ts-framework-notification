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
const base_1 = require("./base");
const text_1 = require("./text");
const email_1 = require("./email");
const firebase_1 = require("./firebase");
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
        // Initialize the text transport, if available
        if (this.options.text) {
            this.transports.text = new text_1.Text(this.options.text);
        }
    }
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be an Email message, a Firebase message or a Text message.
     * @param options The options to be sent to the Transporter
     */
    send(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transports.email && message instanceof email_1.EmailMessage) {
                return this.transports.email.send(message);
            }
            else if (this.transports.firebase && message instanceof firebase_1.FirebaseMessage) {
                return this.transports.firebase.send(message, options);
            }
            else if (this.transports.text && message instanceof text_1.TextMessage) {
                return this.transports.text.send(message);
            }
            else {
                throw new Error(`${this.name}: Transport not available or misconfigured: "${message._type}"`);
            }
        });
    }
}
Notification.EmailMessage = email_1.EmailMessage;
Notification.FirebaseMessage = firebase_1.FirebaseMessage;
exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQWlGO0FBQ2pGLGlDQUFrRjtBQUNsRixtQ0FBdUY7QUFDdkYseUNBQXNHO0FBUXRHLGtCQUFrQyxTQUFRLDhCQUF1QjtJQVcvRCxZQUFZLE9BQTRCO1FBQ3RDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVyQix3RUFBd0U7UUFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLElBQUksS0FBSyxDQUFDLDBHQUEwRyxDQUFDLENBQUM7UUFDOUgsQ0FBQztRQUVELCtDQUErQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBRUQsa0RBQWtEO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQsOENBQThDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxJQUFJLENBQUMsT0FBcUQsRUFBRSxPQUFhOztZQUNwRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxPQUFPLFlBQVksb0JBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxPQUFPLFlBQVksMEJBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksT0FBTyxZQUFZLGtCQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksZ0RBQWdELE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7UUFDSCxDQUFDO0tBQUE7O0FBNUNNLHlCQUFZLEdBQUcsb0JBQVksQ0FBQztBQUM1Qiw0QkFBZSxHQUFHLDBCQUFlLENBQUM7QUFUM0MsK0JBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNwb3J0VHlwZXMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlLCBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBUZXh0LCBUZXh0TWVzc2FnZSwgVGV4dE1lc3NhZ2VTY2hlbWEsIFRleHRTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQgeyBFbWFpbCwgRW1haWxNZXNzYWdlLCBFbWFpbE1lc3NhZ2VTY2hlbWEsIEVtYWlsU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL2VtYWlsJztcbmltcG9ydCB7IEZpcmViYXNlLCBGaXJlYmFzZU1lc3NhZ2UsIEZpcmViYXNlTWVzc2FnZVNjaGVtYSwgRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vZmlyZWJhc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmaXJlYmFzZT86IEZpcmViYXNlU2VydmljZU9wdGlvbnNcbiAgZW1haWw/OiBFbWFpbFNlcnZpY2VPcHRpb25zXG4gIHRleHQ/OiBUZXh0U2VydmljZU9wdGlvbnNcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBvcHRpb25zOiBOb3RpZmljYXRpb25PcHRpb25zXG4gIHRyYW5zcG9ydHM6IHtcbiAgICBlbWFpbD86IEVtYWlsXG4gICAgZmlyZWJhc2U/OiBGaXJlYmFzZVxuICAgIHRleHQ/OiBUZXh0XG4gIH1cblxuICBzdGF0aWMgRW1haWxNZXNzYWdlID0gRW1haWxNZXNzYWdlO1xuICBzdGF0aWMgRmlyZWJhc2VNZXNzYWdlID0gRmlyZWJhc2VNZXNzYWdlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE5vdGlmaWNhdGlvbk9wdGlvbnMpIHtcbiAgICBzdXBlcignTm90aWZpY2F0aW9uU2VydmljZScsIG9wdGlvbnMpO1xuICAgIHRoaXMudHJhbnNwb3J0cyA9IHt9O1xuXG4gICAgLy8gQXQgbGVhc3Qgb25lIHRyYW5zcG9ydCBtdXN0IGJlIHN1cHBsaWVkIHRvIHVzZSB0aGlzIGFic3RyYWN0aW9uIGxheWVyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZW1haWwgJiYgIXRoaXMub3B0aW9ucy5maXJlYmFzZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB0cmFuc3BvcnRzIGNvbmZpZ3VyZWQsIHlvdSBuZWVkIHRvIHNwZWNpZml5IGF0IGxlYXN0IG9uZSBkZWJ1ZyBzZXJ2aWNlIHRvIHVzZSB0aGUgTm90aWZpY2F0aW9uIGxheWVyLicpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGVtYWlsIHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbWFpbCkge1xuICAgICAgdGhpcy50cmFuc3BvcnRzLmVtYWlsID0gbmV3IEVtYWlsKHRoaXMub3B0aW9ucy5lbWFpbClcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBmaXJlYmFzZSB0cmFuc3BvcnQsIGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpIHtcbiAgICAgIHRoaXMudHJhbnNwb3J0cy5maXJlYmFzZSA9IG5ldyBGaXJlYmFzZSh0aGlzLm9wdGlvbnMuZmlyZWJhc2UpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHRleHQgdHJhbnNwb3J0LCBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLnRleHQpIHtcbiAgICAgIHRoaXMudHJhbnNwb3J0cy50ZXh0ID0gbmV3IFRleHQodGhpcy5vcHRpb25zLnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgbm90aWZpY2F0aW9uIHVzaW5nIHRoZSBjdXJyZW50bHkgYXZhaWxhYmxlIGFuZCBjb25maWd1cmVkIHRyYW5zcG9ydGVycy5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBub3RpZmljYXRpb24gdG8gYmUgc2VudCwgY2FuIGJlIGFuIEVtYWlsIG1lc3NhZ2UsIGEgRmlyZWJhc2UgbWVzc2FnZSBvciBhIFRleHQgbWVzc2FnZS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gYmUgc2VudCB0byB0aGUgVHJhbnNwb3J0ZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IEVtYWlsTWVzc2FnZSB8IEZpcmViYXNlTWVzc2FnZSB8IFRleHRNZXNzYWdlLCBvcHRpb25zPzogYW55KSB7XG4gICAgaWYgKHRoaXMudHJhbnNwb3J0cy5lbWFpbCAmJiBtZXNzYWdlIGluc3RhbmNlb2YgRW1haWxNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRzLmVtYWlsLnNlbmQobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRyYW5zcG9ydHMuZmlyZWJhc2UgJiYgbWVzc2FnZSBpbnN0YW5jZW9mIEZpcmViYXNlTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0cy5maXJlYmFzZS5zZW5kKG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50cmFuc3BvcnRzLnRleHQgJiYgbWVzc2FnZSBpbnN0YW5jZW9mIFRleHRNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnRzLnRleHQuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMubmFtZX06IFRyYW5zcG9ydCBub3QgYXZhaWxhYmxlIG9yIG1pc2NvbmZpZ3VyZWQ6IFwiJHttZXNzYWdlLl90eXBlfVwiYCk7XG4gICAgfVxuICB9XG5cbn0iXX0=