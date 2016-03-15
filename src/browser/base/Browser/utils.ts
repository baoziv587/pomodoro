

export class Utils {
  //generetes a unique identify  UUID
  
  public static uuid(): string {
    var i, random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || 1 === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16
        ? (random & 3 | 8) : random))
        .toString(16);
    }
    return uuid;
  }
  //add 's' to the end of a given world when count >1 
  public static pluralize(count, word) {
    return count === 1 ? word : word + 's';
  }

  //stores data using localstorage API
  public static store(namespace, data?) {
    if (data) {
      return localStorage.setItem(namespace,
        JSON.stringify(data))
    }
    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  }

  //a helper for interitance
  public static extend(...objs: any[]): any {
    var newObj = {};
    for (var i = 0; i < objs.length; i++) {
      var obj = objs[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }

}