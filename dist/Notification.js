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
    }
    /**
     * Send a notification using the currently available and configured transporters.
     *
     * @param message The notification to be sent, can be a Email message or a Firebase message.
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
            else {
                throw new Error(`${this.name}: Transport not available or misconfigured: "${message._type}"`);
            }
        });
    }
}
Notification.EmailMessage = email_1.EmailMessage;
Notification.FirebaseMessage = firebase_1.FirebaseMessage;
exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL05vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQWlGO0FBQ2pGLG1DQUF1RjtBQUN2Rix5Q0FBc0c7QUFPdEcsa0JBQWtDLFNBQVEsOEJBQXVCO0lBVS9ELFlBQVksT0FBNEI7UUFDdEMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLHdFQUF3RTtRQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sSUFBSSxLQUFLLENBQUMsMEdBQTBHLENBQUMsQ0FBQztRQUM5SCxDQUFDO1FBRUQsK0NBQStDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZELENBQUM7UUFFRCxrREFBa0Q7UUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxJQUFJLENBQUMsT0FBdUMsRUFBRSxPQUFhOztZQUN0RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxPQUFPLFlBQVksb0JBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxPQUFPLFlBQVksMEJBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksZ0RBQWdELE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7UUFDSCxDQUFDO0tBQUE7O0FBckNNLHlCQUFZLEdBQUcsb0JBQVksQ0FBQztBQUM1Qiw0QkFBZSxHQUFHLDBCQUFlLENBQUM7QUFSM0MsK0JBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNwb3J0VHlwZXMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlLCBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBFbWFpbCwgRW1haWxNZXNzYWdlLCBFbWFpbE1lc3NhZ2VTY2hlbWEsIEVtYWlsU2VydmljZU9wdGlvbnMgfSBmcm9tICcuL2VtYWlsJztcbmltcG9ydCB7IEZpcmViYXNlLCBGaXJlYmFzZU1lc3NhZ2UsIEZpcmViYXNlTWVzc2FnZVNjaGVtYSwgRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4vZmlyZWJhc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk9wdGlvbnMgZXh0ZW5kcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMge1xuICBmaXJlYmFzZT86IEZpcmViYXNlU2VydmljZU9wdGlvbnNcbiAgZW1haWw/OiBFbWFpbFNlcnZpY2VPcHRpb25zXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgb3B0aW9uczogTm90aWZpY2F0aW9uT3B0aW9uc1xuICB0cmFuc3BvcnRzOiB7XG4gICAgZW1haWw/OiBFbWFpbFxuICAgIGZpcmViYXNlPzogRmlyZWJhc2VcbiAgfVxuXG4gIHN0YXRpYyBFbWFpbE1lc3NhZ2UgPSBFbWFpbE1lc3NhZ2U7XG4gIHN0YXRpYyBGaXJlYmFzZU1lc3NhZ2UgPSBGaXJlYmFzZU1lc3NhZ2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTm90aWZpY2F0aW9uT3B0aW9ucykge1xuICAgIHN1cGVyKCdOb3RpZmljYXRpb25TZXJ2aWNlJywgb3B0aW9ucyk7XG4gICAgdGhpcy50cmFuc3BvcnRzID0ge307XG5cbiAgICAvLyBBdCBsZWFzdCBvbmUgdHJhbnNwb3J0IG11c3QgYmUgc3VwcGxpZWQgdG8gdXNlIHRoaXMgYWJzdHJhY3Rpb24gbGF5ZXJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5lbWFpbCAmJiAhdGhpcy5vcHRpb25zLmZpcmViYXNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRyYW5zcG9ydHMgY29uZmlndXJlZCwgeW91IG5lZWQgdG8gc3BlY2lmaXkgYXQgbGVhc3Qgb25lIGRlYnVnIHNlcnZpY2UgdG8gdXNlIHRoZSBOb3RpZmljYXRpb24gbGF5ZXIuJyk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZW1haWwgdHJhbnNwb3J0LCBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLmVtYWlsKSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydHMuZW1haWwgPSBuZXcgRW1haWwodGhpcy5vcHRpb25zLmVtYWlsKVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGZpcmViYXNlIHRyYW5zcG9ydCwgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maXJlYmFzZSkge1xuICAgICAgdGhpcy50cmFuc3BvcnRzLmZpcmViYXNlID0gbmV3IEZpcmViYXNlKHRoaXMub3B0aW9ucy5maXJlYmFzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBub3RpZmljYXRpb24gdXNpbmcgdGhlIGN1cnJlbnRseSBhdmFpbGFibGUgYW5kIGNvbmZpZ3VyZWQgdHJhbnNwb3J0ZXJzLlxuICAgKiBcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG5vdGlmaWNhdGlvbiB0byBiZSBzZW50LCBjYW4gYmUgYSBFbWFpbCBtZXNzYWdlIG9yIGEgRmlyZWJhc2UgbWVzc2FnZS5cbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gYmUgc2VudCB0byB0aGUgVHJhbnNwb3J0ZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IEVtYWlsTWVzc2FnZSB8IEZpcmViYXNlTWVzc2FnZSwgb3B0aW9ucz86IGFueSkge1xuICAgIGlmICh0aGlzLnRyYW5zcG9ydHMuZW1haWwgJiYgbWVzc2FnZSBpbnN0YW5jZW9mIEVtYWlsTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0cy5lbWFpbC5zZW5kKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50cmFuc3BvcnRzLmZpcmViYXNlICYmIG1lc3NhZ2UgaW5zdGFuY2VvZiBGaXJlYmFzZU1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydHMuZmlyZWJhc2Uuc2VuZChtZXNzYWdlLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMubmFtZX06IFRyYW5zcG9ydCBub3QgYXZhaWxhYmxlIG9yIG1pc2NvbmZpZ3VyZWQ6IFwiJHttZXNzYWdlLl90eXBlfVwiYCk7XG4gICAgfVxuICB9XG5cbn0iXX0=