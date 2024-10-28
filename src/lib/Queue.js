var queue = [];
var subscribers = [];

export function pushEvent(event) {
  queue.push(event);
  subscribers.forEach((callback) => callback(event));
}

export function subscribe(callback) {
  subscribers.push(callback);
}
