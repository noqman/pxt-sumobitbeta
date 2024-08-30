// Default pin.
const EDGE_R_PIN = AnalogPin.P0;
const EDGE_L_PIN = AnalogPin.P1;

// Event source.
const EDGE_SENSOR_EVENT_SOURCE = 0x03;

enum EdgeSide{
  Right = 0,
  Left =1,
  Both = 1000
}

// Comparison type.
enum PotCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
}

/**
  * Return right edge sensor value (0-1023).
  */
//% group="Edge Sensors"
//% weight=15
//% blockGap=8
//% blockId=sumobit_read_edge_R_value
//% block="right edge sensor value"
function readEdgeRValue(): number {
return pins.analogReadPin(EDGE_R_PIN);
}

/**
  * Return left edge sensor value (0-1023).
  */
//% group="Edge Sensors"
//% weight=16
//% blockGap=8
//% blockId=sumobit_read_edge_L_value
//% block="left edge sensor value"
function readEdgeLValue(): number {
    return pins.analogReadPin(EDGE_L_PIN);
}
