/*global MOT_Plugin,console,extend*/
var LabelPlugin = (function () {
    var LabelPlugin = function () {
        var self = this;
        MOT_Plugin.call(this); // call Plugin Constructor
        self.PluginType = "LabelPlugin";
        self.SetParameterValue("PluginWidth", 70);
        self.SetParameterValue("PluginHeight", 35);
        self.SetParameterValue("PluginName", self.PluginType);
        self.Parameters.LabelValue = self.addPluginParameters("LabelValue", "input", "Mylabel", "Caption", "Set label caption");
        self.Parameters.MultipleLine = self.addPluginParameters("MultipleLine", "True/False", 0, "Multiple lines", "Enable/disable multiple lines to control the width and hight of label");
        self.Parameters.Scroll = self.addPluginParameters("Scroll", "True/False", 0, "Scroll", "Enable/disable Scroll feature when multiple lines parameter is true");
        self.Parameters.HasBorder = self.addPluginParameters("HasBorder", "True/False", 0, "Show border", "Show/hide border");
        self.Parameters.BorderRounded = self.addPluginParameters("BorderRounded", "True/False", 0, "Rounded borders", "Enable/disable rounded border edges");
        self.Parameters.TextRotation = self.addPluginParameters("TextRotation", "Select", ["rotate(0deg)", "rotate(90deg)", "rotate(270deg)"], "Rotation", "Select rotation angle for text");
        self.Parameters.TextRotation.addProperty("SelectedValue", "rotate(0deg)");
        self.Parameters.FontSize = self.addPluginParameters("FontSize", "Select", ["14px", "17px", "20px", "22px", "24px", "26px", "28px"], "Font size", "Select font size");
        self.Parameters.FontSize.addProperty("SelectedValue", "14px");
        self.Parameters.PluginVersion = self.addPluginParameters("PluginVersion", "label", "1", "Version", "plugin version");
        self.Parameters.FontStyle = self.addPluginParameters("FontStyle", "Select", ["normal", "italic", "oblique", "initial"], "Font style", "Select font style");
        self.Parameters.FontStyle.addProperty("SelectedValue", "normal");
        self.Parameters.FontWeight = self.addPluginParameters("FontWeight", "Select", ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"], "Font weight", "Select font weight");
        self.Parameters.FontWeight.addProperty("SelectedValue", "normal");
        self.Parameters.BorderColor = self.addPluginParameters("BorderColor", "color", "#000000", "Border color", "Set border color");
        self.Parameters.FontColor = self.addPluginParameters("FontColor", "color", "#000000", "Font color", "Set font color");
        self.Parameters.BackGroundColor = self.addPluginParameters("BackGroundColor", "color", "#ffffff", "Background color", "Set background color");
        self.Parameters.BorderRounded = self.addPluginParameters("BorderRounded", "True/False", 0, "Rounded border", "Enable/disable rounded border");
        self.Parameters.BorderThikness = self.addPluginParameters("BorderThikness", "input", "2", "Border thikness", "Set border thikness in pixel");
        self.Parameters.BorderStyle = self.addPluginParameters("BorderStyle", "Select", ["solid", "dashed", "dotted"], "Border style", "Select boreder style");
        self.Parameters.BorderStyle.addProperty("SelectedValue", "solid");
        self.Parameters.DataSource = self.addPluginParameters("DataSource", "SensorsList", ["No Sensor", "No Reading"], "Data Source", "Select Data Source");

    };
    //do GridPlugin extend MOT_Plugin
    extend(LabelPlugin, MOT_Plugin);

    LabelPlugin.prototype.Draw = function (WorkSpace) {
        var self = this;
        self.GetPlugin(WorkSpace);
        var p = document.createElement("p");
        WorkSpace.appendChild(p);
        p.id = self.unique;
        p.innerHTML = this.GetParameterValue("LabelValue");
        p.style.fontSize = this.GetParameterByName("FontSize").SelectedValue;
        p.style.fontStyle = this.GetParameterByName("FontStyle").SelectedValue;
        p.style.fontWeight = this.GetParameterByName("FontWeight").SelectedValue;
        p.style.color = this.GetParameterValue("FontColor");
        // p.style.height = this.GetParameterValue("PluginHeight") + "px";
        // p.style.width = this.GetParameterValue("PluginWidth") + "px";
        p.style.fontWeight = this.GetParameterByName("FontWeight").SelectedValue;
        WorkSpace.style.transform = this.GetParameterByName("TextRotation").SelectedValue;
        p.style.backgroundColor = this.GetParameterValue("BackGroundColor");
        p.style.float = "left";
        if (this.GetParameterValue("HasBorder") == 1) {
            p.style.borderWidth = this.GetParameterValue("BorderThikness") + "px";
            p.style.borderStyle = this.GetParameterByName("BorderStyle").SelectedValue;
            p.style.borderColor = this.GetParameterValue("BorderColor");
        }
        if (this.GetParameterValue("BorderRounded") == 1) {
            p.style.borderRadius = "5px";
        }
        if (this.GetParameterValue("MultipleLine") == 1) {
            p.style.width = this.GetParameterValue("PluginWidth") + "px";
            p.style.height = this.GetParameterValue("PluginHeight") + "px";
            p.style.wordWrap = "break-word";

        }
        if (this.GetParameterValue("MultipleLine") == 1 && this.GetParameterValue("Scroll") == 1) {
            p.style.overflowY = "scroll";
        }
        WorkSpace.style.height = "auto";
        WorkSpace.style.width = "auto";
        var DataArray = this.GetParameterByName("Query").Data;
        if (DataArray != undefined || DataArray != null) {
            p.innerHTML = "";
            if (Object.keys(DataArray).length === 0) {
                p.innerHTML = "No Data Found";
            } else {
                for (var x = 0; x < 1; x++) {
                    var index = 0;
                    for (var i in DataArray[x]) {
                        if (index > 0) {
                            p.innerHTML += "," + DataArray[x][i];
                        } else {
                            p.innerHTML += DataArray[x][i];
                        }
                        index++;
                    }
                }
                this.SetParameterValue("Caption", p.innerHTML);
            }
        }

    
        		// add css classes to WorkSpace div
	              self.addCssClasses(p)
        
    };

    return LabelPlugin;
}());