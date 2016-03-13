//index db class interface;

interface IindexDBHandle {
  /**
   * IDBDatabase 是indexDB连接成功后返回的db对象
   * 
   *  The IDBDatabase interface of the IndexedDB API provides a connection to a database;
   *  you can use an IDBDatabase object to open a transaction on your database then create,
   *  https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase
   */
   (db: IDBDatabase): Function;
  
}

interface IindexName extends String{
}
 