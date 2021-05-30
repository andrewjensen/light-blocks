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
      block.appendValueInput("H")
          .setCheck(null)
          .appendField("H");
      block.appendValueInput("S")
          .setCheck(null)
          .appendField("S");
      block.appendValueInput("B")
          .setCheck(null)
          .appendField("B");
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
          .appendField("wait for")
          .appendField(new Blockly.FieldNumber(1.5, 0.1, Infinity, 0.01), "TIME")
          .appendField("seconds");
      block.setPreviousStatement(true, null);
      block.setNextStatement(true, null);
      block.setColour(0);
      block.setTooltip("");
      block.setHelpUrl("");
    }
  };
}

