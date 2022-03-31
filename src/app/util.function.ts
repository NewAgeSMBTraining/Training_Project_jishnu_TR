export function makeUID(l: number) {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  }

  export function toEntityString(str: string) {
    return str.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase();
  }
  
  export function isEmptyObject(value: object) {
    return Object.keys(value).length === 0;
  }