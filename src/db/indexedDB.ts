type IndexedDB = {
  addData: (data: unknown) => Promise<unknown>;
  readData: () => Promise<unknown>;
  updateData: (id: number, data: unknown) => Promise<unknown>;
  deleteData: (id: number) => Promise<unknown>;
  clearTable: () => Promise<unknown>;
};
export const openIndexedDB = ({
  dbName = GAS_DB_NAME,
  version = GAS_DB_VERSION,
  tableName,
  options = { keyPath: "id", autoIncrement: true },
}: {
  dbName?: string;
  version?: number;
  tableName: string;
  options?: {
    keyPath?: string;
    autoIncrement?: boolean;
  };
}): Promise<IndexedDB> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(tableName)) {
        db.createObjectStore(tableName, options);
      }
    };

    request.onsuccess = () => {
      resolve({
        addData: addValueToIndexedDB(request.result, tableName),
        readData: readAllValuesFromIndexedDB(request.result, tableName),
        updateData: updateValueToIndexedDB(request.result, tableName),
        deleteData: deleteValueFromIndexedDB(request.result, tableName),
        clearTable: clearTableFromIndexedDB(request.result, tableName),
      });
    };

    request.onerror = () => {
      reject(new Error("Failed to open IndexedDB: " + request.error?.message));
    };
  });
};

function readAllValuesFromIndexedDB(db: IDBDatabase, tableName: string) {
  return async () => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(tableName, "readonly");
      const store = transaction.objectStore(tableName);
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      transaction.oncomplete = () => {
        db.close();
      };
      request.onerror = () => {
        reject(
          new Error(
            "Failed to read data from IndexedDB: " + request.error?.message
          )
        );
      };
    });
  };
}

function addValueToIndexedDB(db: IDBDatabase, tableName: string) {
  return async (data: unknown) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(tableName, "readwrite");
      const store = transaction.objectStore(tableName);
      const request = store.add(data);
      request.onsuccess = () => {
        db.close();
        resolve(request.result);
      };
      transaction.oncomplete = () => {
        db.close();
      };
      request.onerror = () => {
        reject(
          new Error(
            "Failed to add data to IndexedDB: " + request.error?.message
          )
        );
      };
    });
  };
}

function updateValueToIndexedDB(db: IDBDatabase, tableName: string) {
  return async (id: number, data: unknown) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(tableName, "readwrite");
      const store = transaction.objectStore(tableName);
      const request = store.put({ id, ...(data as object) });
      request.onsuccess = () => {
        db.close();
        resolve(request.result);
      };
      transaction.oncomplete = () => {
        db.close();
      };
      request.onerror = () => {
        reject(
          new Error(
            "Failed to update data to IndexedDB: " + request.error?.message
          )
        );
      };
    });
  };
}

function deleteValueFromIndexedDB(db: IDBDatabase, tableName: string) {
  return async (id: number) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(tableName, "readwrite");
      const store = transaction.objectStore(tableName);
      const request = store.delete(id);
      request.onsuccess = () => {
        db.close();
        resolve(request.result);
      };
      transaction.oncomplete = () => {
        db.close();
      };
      request.onerror = () => {
        reject(
          new Error(
            "Failed to delete data from IndexedDB: " + request.error?.message
          )
        );
      };
    });
  };
}

function clearTableFromIndexedDB(db: IDBDatabase, tableName: string) {
  return async () => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(tableName, "readwrite");
      const store = transaction.objectStore(tableName);
      const request = store.clear();
      request.onsuccess = () => {
        resolve(request.result);
      };
      transaction.oncomplete = () => {
        db.close();
      };
      request.onerror = () => {
        reject(
          new Error("Failed to clear IndexedDB: " + request.error?.message)
        );
      };
    });
  };
}

export const GAS_DB_NAME = "gas_db";
export const GAS_DB_VERSION = 1;
export const ACTIVE_SALES_TABLE = "active_sales";
