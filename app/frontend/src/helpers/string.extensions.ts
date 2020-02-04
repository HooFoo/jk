interface String {
  trimLeft(...characters: string[]): string;
  getCurrencySymbol(): string;
}

String.prototype.trimLeft = function(...characters: string[]) {
  if (characters === undefined || !characters.length) {
      characters = ["\s"];
  }

  return this.replace(new RegExp("^[" + characters.join("|") + "]+"), "");
};

String.prototype.getCurrencySymbol = function(): string {
  switch(this.toString()){
    case 'RUB':
      return '₽';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return 'unknown currency';
  }
}