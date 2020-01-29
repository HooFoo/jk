interface String {
  trimLeft(...characters: string[]): string;
}

String.prototype.trimLeft = function(...characters: string[]) {
  if (characters === undefined || !characters.length) {
      characters = ["\s"];
  }

  return this.replace(new RegExp("^[" + characters.join("|") + "]+"), "");
};