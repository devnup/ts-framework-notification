"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseSDK = require("firebase-admin");
const ts_framework_1 = require("ts-framework");
const FirebaseMessage_1 = require("./FirebaseMessage");
const base_1 = require("../base");
class FirebaseService extends base_1.BaseNotificationService {
    constructor(options) {
        super('FirebaseService', options);
        // Initialize the Firebase Admin SDK
        if (options.serviceAccount && options.databaseURL) {
            this.sdk = FirebaseSDK.initializeApp({
                databaseURL: options.databaseURL,
                credential: FirebaseSDK.credential.cert(options.serviceAccount),
            });
        }
        else {
            // No transporter available, prepare message for warning or crash
            const message = `${this.name}: The Google Service Account is not available.`;
            if (!options.debug) {
                // No debug mode, crash the service
                throw new Error(message);
            }
            else if (options.verbose) {
                // In debug mode we send all messages to the console
                ts_framework_1.Logger.warn(`${message} All messages will be sent to the console as warnings.`);
            }
        }
    }
    send(message, options) {
        const data = message instanceof FirebaseMessage_1.default ? message : new FirebaseMessage_1.default(message);
        if (this.sdk) {
            // Send a message to the device corresponding to the provided
            // registration token with the provided options.
            const { registrationToken } = data, payload = __rest(data, ["registrationToken"]);
            return this.sdk.messaging().sendToDevice(registrationToken, { notification: payload }, options);
        }
        else {
            const errorMessage = `${this.name} is not ready, the Google Service Account may be invalid or unavailable`;
            if (this.options.debug) {
                // Logs the notification body in the console as a warning
                ts_framework_1.Logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
            }
            else {
                // Crash the service, notification could not be sent
                throw new Error(errorMessage);
            }
        }
    }
}
exports.default = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZWJhc2VTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2ZpcmViYXNlL0ZpcmViYXNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUE4QztBQUM5QywrQ0FBc0M7QUFFdEMsdURBQTJFO0FBQzNFLGtDQUFrRjtBQWdCbEYscUJBQXFDLFNBQVEsOEJBQXVCO0lBSWxFLFlBQVksT0FBK0I7UUFDekMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWxDLG9DQUFvQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztnQkFDbkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO2dCQUNoQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUNoRSxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixpRUFBaUU7WUFDakUsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxnREFBZ0QsQ0FBQztZQUU3RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixtQ0FBbUM7Z0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0Isb0RBQW9EO2dCQUNwRCxxQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sd0RBQXdELENBQUMsQ0FBQztZQUNsRixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxJQUFJLENBQUMsT0FBOEIsRUFBRSxPQUFrQztRQUM1RSxNQUFNLElBQUksR0FBRyxPQUFPLFlBQVkseUJBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLHlCQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYiw2REFBNkQ7WUFDN0QsZ0RBQWdEO1lBQ2hELE1BQU0sRUFBRSxpQkFBaUIsS0FBaUIsSUFBSSxFQUFuQiw2Q0FBbUIsQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDakcsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxZQUFZLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSx5RUFBeUUsQ0FBQztZQUUzRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLHlEQUF5RDtnQkFDekQscUJBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLG9EQUFvRDtnQkFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FFRjtBQWpERCxrQ0FpREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBGaXJlYmFzZVNESyBmcm9tICdmaXJlYmFzZS1hZG1pbic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd0cy1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgQmFzZU1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuLy4uL2Jhc2UvQmFzZU1lc3NhZ2UnO1xuaW1wb3J0IEZpcmViYXNlTWVzc2FnZSwgeyBGaXJlYmFzZU1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL0ZpcmViYXNlTWVzc2FnZSc7XG5pbXBvcnQgeyBCYXNlTm90aWZpY2F0aW9uU2VydmljZSwgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIH0gZnJvbSAnLi4vYmFzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlyZWJhc2VTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB7XG4gIHNlcnZpY2VBY2NvdW50PzogRmlyZWJhc2VTREsuU2VydmljZUFjY291bnRcbiAgZGF0YWJhc2VVUkw/OiBzdHJpbmdcbiAgZGVidWc/OiBib29sZWFuXG59XG5cbi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9yZWZlcmVuY2UvYWRtaW4vbm9kZS9hZG1pbi5tZXNzYWdpbmcuTWVzc2FnaW5nT3B0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEZpcmViYXNlVHJhbnNwb3J0T3B0aW9ucyB7XG4gIHByaW9yaXR5OiAnbm9ybWFsJyB8ICdoaWdoJ1xuICB0aW1lVG9MaXZlOiBudW1iZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIGV4dGVuZHMgQmFzZU5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICBzZGs6IEZpcmViYXNlU0RLLmFwcC5BcHBcbiAgb3B0aW9uczogRmlyZWJhc2VTZXJ2aWNlT3B0aW9uc1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEZpcmViYXNlU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcignRmlyZWJhc2VTZXJ2aWNlJywgb3B0aW9ucyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBGaXJlYmFzZSBBZG1pbiBTREtcbiAgICBpZiAob3B0aW9ucy5zZXJ2aWNlQWNjb3VudCAmJiBvcHRpb25zLmRhdGFiYXNlVVJMKSB7XG4gICAgICB0aGlzLnNkayA9IEZpcmViYXNlU0RLLmluaXRpYWxpemVBcHAoe1xuICAgICAgICBkYXRhYmFzZVVSTDogb3B0aW9ucy5kYXRhYmFzZVVSTCxcbiAgICAgICAgY3JlZGVudGlhbDogRmlyZWJhc2VTREsuY3JlZGVudGlhbC5jZXJ0KG9wdGlvbnMuc2VydmljZUFjY291bnQpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIHRyYW5zcG9ydGVyIGF2YWlsYWJsZSwgcHJlcGFyZSBtZXNzYWdlIGZvciB3YXJuaW5nIG9yIGNyYXNoXG4gICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5uYW1lfTogVGhlIEdvb2dsZSBTZXJ2aWNlIEFjY291bnQgaXMgbm90IGF2YWlsYWJsZS5gO1xuXG4gICAgICBpZiAoIW9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgLy8gTm8gZGVidWcgbW9kZSwgY3Jhc2ggdGhlIHNlcnZpY2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuXG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgICAvLyBJbiBkZWJ1ZyBtb2RlIHdlIHNlbmQgYWxsIG1lc3NhZ2VzIHRvIHRoZSBjb25zb2xlXG4gICAgICAgIExvZ2dlci53YXJuKGAke21lc3NhZ2V9IEFsbCBtZXNzYWdlcyB3aWxsIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUgYXMgd2FybmluZ3MuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNlbmQobWVzc2FnZTogRmlyZWJhc2VNZXNzYWdlU2NoZW1hLCBvcHRpb25zPzogRmlyZWJhc2VUcmFuc3BvcnRPcHRpb25zKSB7XG4gICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UgaW5zdGFuY2VvZiBGaXJlYmFzZU1lc3NhZ2UgPyBtZXNzYWdlIDogbmV3IEZpcmViYXNlTWVzc2FnZShtZXNzYWdlKTtcblxuICAgIGlmICh0aGlzLnNkaykge1xuICAgICAgLy8gU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGRldmljZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm92aWRlZFxuICAgICAgLy8gcmVnaXN0cmF0aW9uIHRva2VuIHdpdGggdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAgICBjb25zdCB7IHJlZ2lzdHJhdGlvblRva2VuLCAuLi5wYXlsb2FkIH0gPSBkYXRhO1xuICAgICAgcmV0dXJuIHRoaXMuc2RrLm1lc3NhZ2luZygpLnNlbmRUb0RldmljZShyZWdpc3RyYXRpb25Ub2tlbiwgeyBub3RpZmljYXRpb246IHBheWxvYWQgfSwgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYCR7dGhpcy5uYW1lfSBpcyBub3QgcmVhZHksIHRoZSBHb29nbGUgU2VydmljZSBBY2NvdW50IG1heSBiZSBpbnZhbGlkIG9yIHVuYXZhaWxhYmxlYDtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAvLyBMb2dzIHRoZSBub3RpZmljYXRpb24gYm9keSBpbiB0aGUgY29uc29sZSBhcyBhIHdhcm5pbmdcbiAgICAgICAgTG9nZ2VyLndhcm4oZXJyb3JNZXNzYWdlLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ3Jhc2ggdGhlIHNlcnZpY2UsIG5vdGlmaWNhdGlvbiBjb3VsZCBub3QgYmUgc2VudFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufSJdfQ==