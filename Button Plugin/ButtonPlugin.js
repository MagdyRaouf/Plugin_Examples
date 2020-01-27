/*global MOT_Plugin,console,extend*/
var ButtonPlugin = (function () {
  var ButtonPlugin = function () {
    var self = this;
    MOT_Plugin.call(this); // call Plugin Constructor
    self.PluginType = "ButtonPlugin";
    self.SetParameterValue("PluginName", self.PluginType);
    self.SetParameterValue("PluginWidth", "auto");
    self.SetParameterValue("PluginHeight", "auto");
    delete self.Parameters.DataSource;
    delete self.Parameters.Query;
    // self.Parameters.PluginWidth = self.addPluginParameters("PluginWidth", "input", "auto", "Plugin Width", "Set Plugin Width");
    // self.Parameters.PluginHeight = self.addPluginParameters("PluginHeight", "input", "auto", "Plugin Height", "Set Plugin Height");

    self.Parameters.Caption = self.addPluginParameters("Caption", "input", "Button", "Caption ", "The text appearing on your button");
    self.Parameters.ButtonStyle = self.addPluginParameters("ButtonStyle", "Select", ["default", "primary", "success", "info", "warning", "danger"], "Button style", "Select button style");
    self.Parameters.ButtonStyle.addProperty("SelectedValue", "default");
    self.Parameters.FontFamily = self.addPluginParameters("FontFamily", "Select", ["Arial", "Courrier New", "Times New Roman"], "Font Family", "The fontFamily property sets a list of font-family names for text");
    self.Parameters.FontFamily.addProperty("SelectedValue", "Arial");
    self.Parameters.FontSize = self.addPluginParameters("FontSize", "input", 14, "Font Size", "The fontSize property sets the font size of the text in pixels.");
    self.Parameters.FontStyle = self.addPluginParameters("FontStyle", "Select", ["normal", "italic", "oblique", "initial"], "Font Style", "The fontStyle property sets or returns whether the style of the font is normal, italic or oblique.");
    self.Parameters.FontStyle.addProperty("SelectedValue", "normal");
    self.Parameters.FontWeight = self.addPluginParameters("FontWeight", "Select", ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"], "Font Weight", "The fontWeight property sets or returns how thick or thin characters in a text should be displayed.");
    self.Parameters.FontWeight.addProperty("SelectedValue", "normal");
    self.Parameters.FontColor = self.addPluginParameters("FontColor", "color", "", "Font Color", "Font color");
    self.Parameters.BackgroundColor = self.addPluginParameters("BackgroundColor", "color", "", "Background Color", "Background Color");
    self.Parameters.BorderRounded = self.addPluginParameters("BorderRounded", "True/False", 0, "Border Rounded", "Whether Border is Rounded");


  };
  //do GridPlugin extend MOT_Plugin
  extend(ButtonPlugin, MOT_Plugin);

  ButtonPlugin.prototype.Draw = function (WorkSpace) {
    var self = this;
    self.GetPlugin(WorkSpace);
    var d = new Date();
    var n = d.getTime() * Math.random();

    var Button = document.createElement("button");
    Button.id = n;
    Button.style.top = self.GetParameterValue("LocationY") + "px"; //To relocate the plugin in a different position according to y axis from the top of the page
    Button.style.left = self.GetParameterValue("LocationX") + "px"; //To relocate the plugin in a different position according to x axis from the left of the page
    Button.style.width = self.GetParameterValue("PluginWidth") + "px";
    Button.style.height = self.GetParameterValue("PluginHeight") + "px";
    //Button.style.position="absolute";
    var span = document.createElement('span');
    var Caption = document.createTextNode(self.GetParameterValue("Caption"));
    span.style.fontFamily = self.GetParameterByName("FontFamily").SelectedValue;
    span.style.fontSize = self.GetParameterValue("FontSize") + "px";
    span.style.fontStyle = self.GetParameterByName("FontStyle").SelectedValue;
    span.style.fontWeight = self.GetParameterByName("FontWeight").SelectedValue;
    span.style.color = self.GetParameterValue("FontColor");
    Button.style.backgroundColor = self.GetParameterValue("BackgroundColor");
    if (self.GetParameterValue("BorderRounded") == 1) {
      Button.style.borderRadius = "25px";
    }
    span.appendChild(Caption);
    Button.appendChild(span);
    WorkSpace.appendChild(Button);
    Button.className = "btn";

    var SlectedStyle = self.GetParameterByName("ButtonStyle").SelectedValue;
    if (SlectedStyle === "default") {

      Button.classList.add("btn-default");
    } else if (SlectedStyle === "primary") {
      Button.classList.add("btn-primary");
    } else if (SlectedStyle === "success") {
      Button.classList.add("btn-success");
    } else if (SlectedStyle === "info") {
      Button.classList.add("btn-info");
    } else if (SlectedStyle === "warning") {
      Button.classList.add("btn-warning");
    } else if (SlectedStyle === "danger") {
      Button.classList.add("btn-danger");
    }
    // To Add Class To Plugin 
    self.addCssClasses(Button);


  };

  return ButtonPlugin;
}());