/* Magic Mirror
 * Node Helper: MMM-IRTemperature
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

'use strict'
const NodeHelper = require("node_helper")
const { execFile } = require("child_process")

module.exports = NodeHelper.create({

  socketNotificationReceived: function(notification, payload) {
    const child = execFile('python3', ['modules/MMM-IRTemperature/gy906.py', payload], (error, stdout, stderr) => {
      if (error) {
        this.sendSocketNotification("ERROR", stderr)
      }
      else{
        this.data = stdout.split("\n")
        this.values = {
          "ambient": Number(this.data[0]),
          "object": Number(this.data[1])
        }
        this.sendSocketNotification("DONE", this.values)   
      }         
    })
  },

})