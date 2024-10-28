var subscribers = [];

export function pushEvent(event, params) {
  subscribers.forEach((callback) => callback(event, params));
}

export function subscribe(callback) {
  subscribers.push(callback);
}
