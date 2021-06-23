import Blockly, { Block } from 'blockly';

export function defineBlocks() {
  Blockly.Blocks['start'] = {
    init: function() {
      let block = this as Block;

      block.appendDummyInput()
          .appendField("when the program starts, do:");
      block.setNextStatement(true, null);
      block.setColour(230);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['set_color'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
          .appendField("set color to");
      block.appendValueInput("COLOR")
          .setCheck("Color");
      block.setInputsInline(true);
      block.setPreviousStatement(true, null);
      block.setNextStatement(true, null);
      block.setColour(230);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['set_color_simple'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
          .appendField("set color to")
          .appendField("H")
          .appendField(new Blockly.FieldNumber(0, 0, 359, 1), "HUE")
          .appendField("S")
          .appendField(new Blockly.FieldNumber(100, 0, 100, 1), "SATURATION")
          .appendField("B")
          .appendField(new Blockly.FieldNumber(100, 0, 100, 1), "BRIGHTNESS");
      block.setInputsInline(true);
      block.setPreviousStatement(true, null);
      block.setNextStatement(true, null);
      block.setColour(230);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['color_simple'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
          .appendField("color:")
          .appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
      block.setOutput(true, "Color");
      block.setColour(120);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['color_components'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
          .appendField("color from components:");
      block.appendValueInput("HUE")
          .setCheck("Number")
          .appendField("H");
      block.appendValueInput("SATURATION")
          .setCheck("Number")
          .appendField("S");
      block.appendValueInput("BRIGHTNESS")
          .setCheck("Number")
          .appendField("B");
      block.setInputsInline(true);
      block.setOutput(true, "Color");
      block.setColour(120);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['light_on'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
          .appendField("turn the light on");
      block.setPreviousStatement(true, null);
      block.setNextStatement(true, null);
      block.setColour(230);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['light_off'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
          .appendField("turn the light off");
      block.setPreviousStatement(true, null);
      block.setNextStatement(true, null);
      block.setColour(230);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['wait'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
        .appendField("wait for");

      block.appendValueInput("TIME")
        .setCheck("Number");

      block.appendDummyInput()
        .appendField("seconds");

      block.setPreviousStatement(true, null);
      block.setNextStatement(true, null);
      block.setColour(0);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };

  Blockly.Blocks['math_random_between'] = {
    init: function() {
      let block = this as Block;
      block.appendDummyInput()
        .appendField("random number between");

      block.appendValueInput("MIN")
        .setCheck("Number");

      block.appendDummyInput()
        .appendField("and");

        block.appendValueInput("MAX")
        .setCheck("Number");

      block.setColour(230);
      block.setTooltip("");
      block.setHelpUrl("");
      block.setInputsInline(true);
      block.setOutput(true, "Number");
    }
  };
}

