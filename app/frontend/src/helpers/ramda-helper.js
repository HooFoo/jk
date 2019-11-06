import * as R from 'ramda';

export function isBlank(object) {
  return R.or(R.isEmpty(object), R.isNil(object));
}

export function notBlank(object) {
  return !isBlank(object);
}
