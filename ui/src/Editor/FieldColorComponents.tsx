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

class FieldColorComponents extends Blockly.Field {
  SERIALIZABLE = true;
  CURSOR = 'default';
  DEFAULT_VALUE = DEFAULT_VALUE;
  isDirty_ = false;

  static fromJson = function(options: any): any {
    return new FieldColorComponents(options['colour'], undefined, options);
  }

  static initView = function() {
    this.size_ = new Blockly.utils.Size(
      FIELD_COLOUR_DEFAULT_WIDTH,
      FIELD_COLOUR_DEFAULT_HEIGHT
    );

    this.createBorderRect_();
    this.borderRect_.style['fillOpacity'] = '1';
  };

  configure_(config) {
    FieldColorComponents.superClass_.configure_.call(this, config);
  };

  applyColour() {
    if (this.borderRect_) {
      const { hue, saturation, brightness } = this.getHSB_();
      const [r, g, b] = HSBToRGB(hue, saturation, brightness);
      this.borderRect_.style.fill = `rgb(${r}, ${g}, ${b})`;
    }

    // Set block's fill color to black
    this.sourceBlock_.pathObject.svgPath.setAttribute('fill', "#000");
  };

  getText() {
    return '    ';
  };

  getHSB_() {
    const [hue, saturation, brightness] = this.value_.split(',');
    return {
      hue: parseInt(hue),
      saturation: parseInt(saturation),
      brightness: parseInt(brightness),
    };
  };

  doClassValidation_(opt_newValue) {
    if (typeof opt_newValue != 'string') {
      return null;
    }
    return opt_newValue;
  };

  updateValue_(hue, saturation, brightness) {
    const combinedValue = `${hue},${saturation},${brightness}`;
    this.setValue(combinedValue);
    this.applyColour();
  }

  showEditor_() {
    this.dropdownCreate_();
    Blockly.DropDownDiv.getContentDiv().appendChild(this.picker_);

    Blockly.DropDownDiv.showPositionedByField(
        this, this.dropdownDispose_.bind(this));

    // Focus so we can start receiving keyboard events.
    this.picker_.focus({preventScroll:true});
  };

  dropdownCreate_() {
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

  dropdownDispose_() {
    this.picker_ = null;
  };
}

export default FieldColorComponents;
