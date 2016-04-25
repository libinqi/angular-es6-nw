export function runBlock($log) {
  'ngInject';
  $log.debug('runBlock end');
}

export function ormLift() {
  if (window.require) {
    window.models = window.nw.global.models;
  }
}
