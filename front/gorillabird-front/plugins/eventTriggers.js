let eventsListeners = {};
/**
 *
 * @param {string} events event name
 * @param {function} handler event handler
 * @param {boolean} priority priority
 * @returns object
 */
function on(events, handler, priority) {
  if (typeof handler !== 'function') return;
  const method = priority ? 'unshift' : 'push';
  events.split(' ').forEach(event => {
    if (!eventsListeners[event]) eventsListeners[event] = [];
    eventsListeners[event][method](handler);
  });
  return;
}

function off(events, handler) {
  if (!eventsListeners) return self;
  events.split(' ').forEach(event => {
    if (typeof handler === 'undefined') eventsListeners[event] = [];
    else if (eventsListeners[event]) {
      eventsListeners[event].forEach((eventHandler, index) => {
        if (eventHandler === handler) eventsListeners[event].splice(index, 1);
      });
    }
  });
  return;
}

function trigger(...args) {
  if (!eventsListeners) return;
  let events;
  let data;
  let context;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];
    data = args.slice(1, args.length);
    context = self;
  } else {
    events = args[0].events;
    data = args[0].data;
    context = args[0].context || self;
  }

  data.unshift(context);
  const eventsArray = Array.isArray(events) ? events : events.split(' ');
  eventsArray.forEach(event => {
    if (eventsListeners && eventsListeners[event]) {
      eventsListeners[event].forEach(eventHandler => {
        // this 지정 후 실행
        eventHandler.apply(context, data);
      });
    }
  });
  return;
}

export default defineNuxtPlugin((/* nuxtApp */) => {
  return {
    provide: {
      eventsListeners,
      on,
      off,
      trigger
    }
  }
});