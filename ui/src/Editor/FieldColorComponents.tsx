// @ts-nocheck

// Modified from the built-in `FieldColour` class: https://github.com/google/blockly/blob/64188ae27297b1ca23a3244cc987dfbfc6e98f34/core/field_colour.js

import Blockly  from 'blockly';
import React from 'react';
import ReactDOM from 'react-dom';

import ColorPicker from './ColorPicker';

const DEFAULT_VALUE = '240,100,100';

const FIELD_COLOUR_DEFAULT_WIDTH = 30;
const FIELD_COLOUR_DEFAULT_HEIGHT = 30;
const FIELD_COLOUR_FULL_BLOCK = true;

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

  if (!FIELD_COLOUR_FULL_BLOCK) {
    this.createBorderRect_();
    this.borderRect_.style['fillOpacity'] = '1';
  } else {
    this.clickTarget_ = this.sourceBlock_.getSvgRoot();
  }
};

FieldColorComponents.prototype.configure_ = function(config) {
  FieldColorComponents.superClass_.configure_.call(this, config);
  if (config['colourOptions']) {
    this.colours_ = config['colourOptions'];
    this.titles_ = config['colourTitles'];
  }
  if (config['columns']) {
    this.columns_ = config['columns'];
  }
};

FieldColorComponents.prototype.applyColour = function() {
  if (!FIELD_COLOUR_FULL_BLOCK) {
    if (this.borderRect_) {
      this.borderRect_.style.fill = /** @type {string} */ (this.getValue());
    }
  } else {
    this.sourceBlock_.pathObject.svgPath.setAttribute('fill', this.getValue());
    this.sourceBlock_.pathObject.svgPath.setAttribute('stroke', '#fff');
  }
};

FieldColorComponents.prototype.getText = function() {
  const { hue, saturation, brightness } = this.getHSB_();
  return `H ${hue}, S ${saturation}, B ${brightness}`;
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
  // if (this.onClickWrapper_) {
  //   Blockly.browserEvents.unbind(this.onClickWrapper_);
  //   this.onClickWrapper_ = null;
  // }
  // if (this.onMouseMoveWrapper_) {
  //   Blockly.browserEvents.unbind(this.onMouseMoveWrapper_);
  //   this.onMouseMoveWrapper_ = null;
  // }
  // if (this.onMouseEnterWrapper_) {
  //   Blockly.browserEvents.unbind(this.onMouseEnterWrapper_);
  //   this.onMouseEnterWrapper_ = null;
  // }
  // if (this.onMouseLeaveWrapper_) {
  //   Blockly.browserEvents.unbind(this.onMouseLeaveWrapper_);
  //   this.onMouseLeaveWrapper_ = null;
  // }
  // if (this.onKeyDownWrapper_) {
  //   Blockly.browserEvents.unbind(this.onKeyDownWrapper_);
  //   this.onKeyDownWrapper_ = null;
  // }
  this.picker_ = null;
  // this.highlightedIndex_ = null;
};



// const FieldColorComponents: IRegistrableField = (opt_value: string, opt_validator: Function, opt_config: Object) => {

//   console.log('new FieldColorComponent');
// };

// FieldColorComponents.fromJson = (json: Object) => {
//   throw new Error('TODO: implement');
// };

export default FieldColorComponents;
