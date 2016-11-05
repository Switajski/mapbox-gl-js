'use strict';

var WebWorker = require('./web_worker');
var URL = require('./window').URL;

module.exports = WorkerPool;

/**
 * Constructs a worker pool.
 * @private
 */
function WorkerPool() {
    this.active = {};
}

WorkerPool.prototype = {
    acquire: function (mapId) {
        if (!this.workers) {
            // Lazily look up the value of mapboxgl.workerCount.  This allows
            // client code a chance to set it while circumventing cyclic
            // dependency problems
            var workerCount = require('../mapbox-gl').workerCount;

            this.workers = [];
            while (this.workers.length < workerCount) {
                this.workers.push(new WebWorker());
            }
        }

        this.active[mapId] = true;
        return this.workers.slice();
    },

    release: function (mapId) {
        delete this.active[mapId];
        if (Object.keys(this.active).length === 0) {
            this.workers.forEach(function (w) {
                URL.revokeObjectURL(w.objectURL);
                w.terminate();
            });
            this.workers = null;
        }
    }
};
