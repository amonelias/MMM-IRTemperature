/* global Module */

/* Magic Mirror
 * Module: MMM-IRTemperature
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

Module.register("MMM-IRTemperature", {

    defaults: {
        refreshTime: 5000,
        i2cbus: 1,
        unit: "",
        digits: 0,
        fontSize: "medium",
    },

    start: function() {
        this.sendSocketNotification("",this.config.i2cbus)
        let timer = setInterval(()=>{
            this.sendSocketNotification("",this.config.i2cbus)
        }, this.config.refreshTime)

        if(this.config.fontSize === "small"){
            this.fontSizeHeader = "xsmall"
        }
        else if(this.config.fontSize === "medium"){
            this.fontSizeHeader = "small"
        }
        else if(this.config.fontSize === "large"){
            this.fontSizeHeader = "medium"
        }
        else{
            this.config.fontSize = "medium"
            this.fontSizeHeader = "small"
        }

    },

    getDom: function() {
        let element = document.createElement("div")
        element.id = "irTemp"
        
        let header = document.createElement("div")
        header.id = "irTemp-header"
        header.classList.add("normal", this.fontSizeHeader, "regular")

        let content = document.createElement("div")
        content.id = "irTemp-content"

        let object = document.createElement("div")
        object.id = "irTemp-object"
        object.classList.add("bright", this.config.fontSize, "regular")

        let ambient = document.createElement("div")
        ambient.id = "irTemp-ambient"
        ambient.classList.add("bright", this.config.fontSize, "regular")

        header.innerHTML = "IR-Temperatures:"
        object.innerHTML = "Object: ... °C"
        ambient.innerHTML = "Ambient: ... °C"

        content.appendChild(object)
        content.appendChild(ambient)
        element.appendChild(header)
        element.appendChild(content)
        return element
    },
  
    socketNotificationReceived: function(notification, payload) {
        let element = document.getElementById("irTemp")
        document.getElementById("irTemp-content").remove()
        let content = document.createElement("div")
        content.id = "irTemp-content"
        switch(notification) {
        case "ERROR":
            let error = document.createElement("div")
            error.id = "irTemp-error"
            error.style.color = "#ff0033"
            error.classList.add(this.config.fontSize, "regular")
            error.innerHTML = "ERROR"
            console.error("Error IRTemperature: ", payload)
            content.appendChild(error)
            break 
        case "DONE":
            this.data["object"] = this.convertTemp(payload["object"])
            this.data["ambient"] = this.convertTemp(payload["ambient"])

            let object = document.createElement("div")
            object.id = "irTemp-object"
            object.classList.add("bright", this.config.fontSize, "regular")

            let ambient = document.createElement("div")
            ambient.id = "irTemp-ambient"
            ambient.classList.add("bright", this.config.fontSize, "regular")

            object.innerHTML = "Object: <b>" + this.data["object"][0] + "</b> " + this.data["object"][1]
            ambient.innerHTML = "Ambient: <b>" + this.data["ambient"][0] + "</b> " + this.data["ambient"][1]

            content.appendChild(object)
            content.appendChild(ambient)

            this.sendNotification("IRTEMPERATURE_DATA_OBJECT", this.data["object"][0])
            this.sendNotification("IRTEMPERATURE_DATA_AMBIENT", this.data["ambient"][0])
            break
        }
        element.appendChild(content)
    },

    convertTemp: function(data){
        switch(this.config.unit) {
            case "F":
                return [(data * (9/5) + 32).toFixed(this.config.digits), "°F"]
            case "K":
                return [(data + 273.15).toFixed(this.config.digits), "K"]
            default:
                return [data.toFixed(this.config.digits), "°C"]
        }
    }

  })