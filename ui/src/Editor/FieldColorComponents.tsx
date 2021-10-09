// @ts-nocheck

// Modified from the built-in `FieldColour` class: https://github.com/google/blockly/blob/64188ae27297b1ca23a3244cc987dfbfc6e98f34/core/field_colour.js

import Blockly  from 'blockly';
import React from 'react';
import ReactDOM from 'react-dom';

import ColorPicker from './ColorPicker';
import { HSBToRGB } from './HSBtoRGB';

const DEFAULT_VALUE = '240,100,100';

const FIELD_COLOUR_DEFAULT_WIDTH = 300;
const FIELD_COLOUR_DEFAULT_HEIGHT = 200;

function FieldColorComponents(opt_value: string, opt_validator?: Function, opt_config?: Object) {
  FieldColorComponents.superClass_.constructor.call(this, opt_value, opt_validator, opt_config);

  console.log('new FieldColorComponents');
}

Blockly.utils.object.inherits(FieldColorComponents, Blockly.Field);

FieldColorComponents.prototype.SERIALIZABLE = true;

FieldColorComponents.prototype.CURSOR = 'default';

FieldColorComponents.prototype.isDirty_ = false;

FieldColorComponents.prototype.DEFAULT_VALUE = DEFAULT_VALUE;

FieldColorComponents.fromJson = function(options: any): any {
  return new FieldColorComponents(options['colour'], undefined, options);
}

FieldColorComponents.initView = function() {
  this.size_ = new Blockly.utils.Size(
    FIELD_COLOUR_DEFAULT_WIDTH,
    FIELD_COLOUR_DEFAULT_HEIGHT
  );

  this.createBorderRect_();
  this.borderRect_.style['fillOpacity'] = '1';
};

FieldColorComponents.prototype.configure_ = function(config) {
  FieldColorComponents.superClass_.configure_.call(this, config);
};

FieldColorComponents.prototype.applyColour = function() {
  if (this.borderRect_) {
    const { hue, saturation, brightness } = this.getHSB_();
    const [r, g, b] = HSBToRGB(hue, saturation, brightness);
    this.borderRect_.style.fill = `rgb(${r}, ${g}, ${b})`;
  }

  // Set block's fill color to black
  this.sourceBlock_.pathObject.svgPath.setAttribute('fill', "#000");
};

FieldColorComponents.prototype.getText = function() {
  return '    ';
};

FieldColorComponents.prototype.getHSB_ = function() {
  const [hue, saturation, brightness] = this.value_.split(',');
  return {
    hue: parseInt(hue),
    saturation: parseInt(saturation),
    brightness: parseInt(brightness),
  };
};

FieldColorComponents.prototype.doClassValidation_ = function(opt_newValue) {
  if (typeof opt_newValue != 'string') {
    return null;
  }
  return opt_newValue;
};

FieldColorComponents.prototype.updateValue_ = function(hue, saturation, brightness) {
  const combinedValue = `${hue},${saturation},${brightness}`;
  this.setValue(combinedValue);
  this.applyColour();
}

FieldColorComponents.prototype.showEditor_ = function() {
  this.dropdownCreate_();
  Blockly.DropDownDiv.getContentDiv().appendChild(this.picker_);

  Blockly.DropDownDiv.showPositionedByField(
      this, this.dropdownDispose_.bind(this));

  // Focus so we can start receiving keyboard events.
  this.picker_.focus({preventScroll:true});
};

FieldColorComponents.prototype.dropdownCreate_ = function() {
  const wrapper = document.createElement('div');

  const { hue, saturation, brightness } = this.getHSB_();

  ReactDOM.render(
    <React.StrictMode>
      <ColorPicker
        initialHue={hue}
        initialSaturation={saturation}
        initialBrightness={brightness}
        onUpdateValue={(hue, saturation, brightness) => {
          this.updateValue_(hue, saturation, brightness);
        }}
      />
    </React.StrictMode>,
    wrapper
  );

  this.picker_ = wrapper;
}

FieldColorComponents.prototype.dropdownDispose_ = function() {
  this.picker_ = null;
};

export default FieldColorComponents;
