import * as R from 'ramda';

export function isBlank(object: any) {
  return R.or(R.isEmpty(object), R.isNil(object));
}

export function notBlank(object: any) {
  return !isBlank(object);
}
