

namespace app.utils {

  export class indexdbUtilities {
    public static indexDB = window.indexedDB;
    public static IDBTransaction = IDBTransaction || window['IDBTransaction']
    public static IDBKeyRange = IDBKeyRange || window['IDBTransaction'];

    public static createConnect(dbname: string, version: number) {
      if (!indexdbUtilities.indexDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
        return
      }
      return indexdbUtilities.indexDB.open(dbname, version);
    }

  }

  /**
   * progress:
   * create IDBOpenDBRequest -> onesuccess||onupgradeneeded 
   *                         -> IDBDatabase  -> db.transaction(storeNames,mode)
   *                         -> transaction.objectStore(storeNames)                                      
   *                         -> objectStore 
   *                         -> objectStore.add|objectStore.put|objectStore.delete|etc                                  
   */
  export class indexdb {

    public name: string;
    public version: number;
    public dbRequest: IDBOpenDBRequest;
    public db: IDBDatabase
    public handleOnError: Function;

    private _results;
    private _onsuccess;
    private _onerror;
    private _upgrade;
    constructor(dbname: string, version: number) {

      if (dbname) this.name = dbname;
      if (version) {
        this.version = version;
      } else {
        this.version = 1;
      }

      this.setHandleOnError();
      this.setHandleOnSuccess();
      this.setHandleUpgradeNeeded();
      this._results = null;
    }

    public getObjectStore(storeNames: string): IDBObjectStore {
      return this.db.transaction(storeNames, 'readwrite').objectStore(storeNames)
    }

    public searchByIndex(storeName: string, indexName: string, value: any) {
      return this.getObjectStore(storeName)
        .index(indexName)
        .get(value)
    }

    public fetchStoreByCursor(storeName, onsuccess: () => {}) {
      var transaction = this.db.transaction(storeName);
      var store = transaction.objectStore(storeName);
      var request = store.openCursor();
      
      request.onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
          console.log(cursor.key);
          var currentStudent = cursor.value;
          console.log(currentStudent.name);
          onsuccess()
          cursor.continue();
        }
      };
    }

    public createConnect() {
      this.dbRequest = indexdbUtilities.createConnect(this.name, this.version);
      this.dbRequest.onsuccess = this._onsuccess;
      this.dbRequest.onupgradeneeded = this._upgrade;
      this.dbRequest.onerror = this._onerror
    }

    public setHandleOnSuccess(cb?: IindexDBHandle) {

      this._onsuccess = (e) => {
        this.db = e.target.result;
        if (cb) {
          cb(this.db)
        }
      }

    }

    public setHandleOnError(cb?: IindexDBHandle) {
      this._onerror = (e) => {
        this.db = e.target.result;
        return console.error('indexDB connect error;')
      }
    }

    public setHandleUpgradeNeeded(upGradehandle?: IindexDBHandle) {

      this._upgrade = (event: IDBVersionChangeEvent) => {

        this.db = event.target.result;
        var store = this.db.createObjectStore('title', { keyPath: 'id', autoIncrement: true })
        store.createIndex('name', 'name', { unique: false })
        store.createIndex('title', 'title', { unique: false })
        store.createIndex('date', 'date', { unique: false })


        if (upGradehandle) {
          upGradehandle(this.db)
        }
      }

    }


    public dispose() {
      this.db.removeEventListener('success', this._onsuccess);
      this.db.removeEventListener('error', this._onerror);
      this.db.removeEventListener('upgrade', this._upgrade);
    }
  }

}