/*global MOT_Plugin,console,extend*/


var HelpIconPlugin = (function () {

  var HelpIconPlugin = function () {
    var self = this;
    MOT_Plugin.call(this);
    self.PluginType = "HelpIconPlugin"; //plugin type must be plugin name
    self.SetParameterValue("PluginName", self.PluginType);

    // these parameters I dont need .
    delete self.Parameters.DataSource;
    delete self.Parameters.Query;

    self.Parameters.ImageOrFontAwesome = self.addPluginParameters("ImageOrFontAwesome", "Select", ["Image", "Font Awesome Class"], "Icon Shape", " Select Icon Shape");
    self.Parameters.ImageOrFontAwesome.addProperty("SelectedValue", "Image");

    self.Parameters.ImageURL = self.addPluginParameters("ImageURL", "input", "images/HelpIcon.png", "Image URL", " Write Image URL");
    self.Parameters.FontAwesomeClass = self.addPluginParameters("FontAwesomeClass", "input", "fa fa-info fa-5x", "Font Awesome Class", " Write Font Awesome Class");
    self.SetParameterValue("PluginWidth", 100);
    self.SetParameterValue("PluginHeight", 100);
    //image paramerts
    self.Parameters.ImageWidth = self.addPluginParameters("ImageWidth", "Deprecated");
    self.Parameters.ImageHeight = self.addPluginParameters("ImageHeight", "Deprecated");
    self.Parameters.ImageRotation = self.addPluginParameters("ImageRotation", "input", "", "Rotate image", " Set the angle to rotate image");
    self.Parameters.HasBorder = self.addPluginParameters("HasBorder", "True/False", "0", "Show border", " Show/hide image border");
    self.Parameters.BorderColor = self.addPluginParameters("BorderColor", "color", "", "Border color", " Set border color");
    self.Parameters.BorderThikness = self.addPluginParameters("BorderThikness", "input", "", "Border Thikness", " Set border thikness");
    self.Parameters.BorderStyle = self.addPluginParameters("BorderStyle", "Select", ["solid", "dashed", "dotted"], "Border style", " Select border style");
    self.Parameters.BorderStyle.addProperty("SelectedValue", "solid");

  };

  extend(HelpIconPlugin, MOT_Plugin);

  HelpIconPlugin.prototype.Draw = function (WorkSpace) {


    var self = this;
    self.GetPlugin(WorkSpace);
    var Width = this.GetParameterValue("ImageWidth");
    var height = this.GetParameterValue("ImageHeight");
    var ImageOrFontAwesomeDiv = document.createElement("div");
    ImageOrFontAwesomeDiv.id = "ImageOrFontAwesomeDivID"
    ImageOrFontAwesomeDiv.style.display = "block";
    WorkSpace.style.top = self.GetParameterValue("LocationY") + "px"; //To relocate the plugin in a different position according to y axis from the top of the page
    WorkSpace.style.left = self.GetParameterValue("LocationX") + "px"; //To relocate the plugin in a different position according to x axis from the left of the page
    //get Selected choise (Image Or FontAwesome)
    var selectedShape = self.GetParameterByName("ImageOrFontAwesome").SelectedValue;
    //get image parameters value
    if (selectedShape === "Image") {
      var image = self.GetParameterValue("ImageURL");
      if (image != null && image != undefined) {
        var imgTag = document.createElement("IMG");
        imgTag.src = '' + image + '';
        imgTag.className = "btn";
        imgTag.style.position = 'absoulte';
        if (Width && Width != " " && height && height != " ") {
          imgTag.style.width = Width + "px"
          imgTag.style.height = height + "px"
          WorkSpace.style.width = Width
          WorkSpace.style.height = height
          self.SetParameterValue("PluginWidth", Width);
          self.SetParameterValue("PluginHeight", height);
        } else {
          RTEConsoleLog("width", this.GetParameterValue("PluginWidth"))
          imgTag.style.width = this.GetParameterValue("PluginWidth") + "px";
          imgTag.style.height = this.GetParameterValue("PluginHeight") + "px";
          WorkSpace.style.width = this.GetParameterValue("PluginWidth");
          WorkSpace.style.height = this.GetParameterValue("PluginHeight");
        }
        imgTag.style.transform = "rotate(" + this.GetParameterValue("ImageRotation") + "deg)";
        imgTag.style.webkitTransform = "rotate(" + this.GetParameterValue("ImageRotation") + "deg)";
        // if (this.GetParameterValue("HasBorder") == 1) {
        //     imgTag.style.borderWidth = this.GetParameterValue("BorderThikness") + "px";
        //     imgTag.style.borderStyle = this.GetParameterByName("BorderStyle").SelectedValue + '';
        //     imgTag.style.borderColor = this.GetParameterValue("BorderColor") + '';
        // }
        ImageOrFontAwesomeDiv.appendChild(imgTag);
        WorkSpace.appendChild(ImageOrFontAwesomeDiv);

      }

    } else {
      var FontAwesomeSpan = document.createElement("span");
      FontAwesomeSpan.className = self.GetParameterValue("FontAwesomeClass");
      ImageOrFontAwesomeDiv.appendChild(FontAwesomeSpan)
      //HelpPluginDiv.appendChild();
    }
    WorkSpace.appendChild(ImageOrFontAwesomeDiv);

    // to set parameter value on onclick event
    this.SetParameterValue("onclick", "ShowHelp();");
    // add css classes to WorkSpace div
    self.addCssClasses(WorkSpace);

    // check for visibility value
    if (this.GetParameterValue("Visible") == 0) {

      if (ExecutionEnvironment === "IDE") {
        WorkSpace.style.visibility = "hidden";
      } else {
        WorkSpace.style.display = "none";
      }
    } else {
      if (ExecutionEnvironment === "RTE") {
        WorkSpace.style.display = "block";
      } else {
        WorkSpace.style.visibility = "visible";
      }

    }

  };
  return HelpIconPlugin;
}());