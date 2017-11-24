"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = require("./BaseService");
class BaseNotificationService extends BaseService_1.default {
    /**
     * Instantiates a new Notification service.
     *
     * @param name The service name for verbose logging
     * @param options The notification service options
     */
    constructor(name, options) {
        super(name, options);
    }
}
exports.default = BaseNotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZU5vdGlmaWNhdGlvblNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlTm90aWZpY2F0aW9uU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtDQUFnRTtBQUtoRSw2QkFBc0QsU0FBUSxxQkFBVztJQU12RTs7Ozs7T0FLRztJQUNILFlBQVksSUFBWSxFQUFFLE9BQXVDO1FBQy9ELEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQVFGO0FBdEJELDBDQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zcG9ydFR5cGVzIH0gZnJvbSAnLi8uLi90eXBlcyc7XG5pbXBvcnQgQmFzZVNlcnZpY2UsIHsgQmFzZVNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vQmFzZVNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlTm90aWZpY2F0aW9uU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlU2VydmljZU9wdGlvbnMge1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlTm90aWZpY2F0aW9uU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFRoZSBub3RpZmljYXRpb24gc2VydmljZSBvcHRpb25zLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucztcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGEgbmV3IE5vdGlmaWNhdGlvbiBzZXJ2aWNlLlxuICAgKiBcbiAgICogQHBhcmFtIG5hbWUgVGhlIHNlcnZpY2UgbmFtZSBmb3IgdmVyYm9zZSBsb2dnaW5nXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBub3RpZmljYXRpb24gc2VydmljZSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IEJhc2VOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG5hbWUsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbmV3IG1lc3NhZ2UgdGhyb3VnaCB0aGUgbm90aWZpY2F0aW9uIHNlcnZpY2UuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBiZSBzZW50IHRocm91Z2ggdGhlIG5vdGlmaWNhdGlvbiBzZXJ2aWNlXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3Qgc2VuZChkYXRhOiBhbnkpO1xufSJdfQ==