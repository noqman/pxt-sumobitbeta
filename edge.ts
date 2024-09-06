// Default pin.
const EDGE_R_PIN = AnalogPin.P0;
const EDGE_L_PIN = AnalogPin.P1;

// Event source.
const EDGE_SENSOR_EVENT_SOURCE = 0x03;

enum EdgeSide{
  Right = 0,
  Left =1,

  //% block="Right and Left"
  Both = 1000
}

// Comparison type.
enum EdgeCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
}

namespace sumobit {

/**
  * Return right edge sensor value (0-1023).
  */
//% group="Edge Sensors"
//% weight=16
//% blockGap=8
//% blockId=sumobit_read_edge_R_value
//% block="right edge sensor value"
export function readEdgeRValue(): number {
return pins.analogReadPin(EDGE_R_PIN);
}

/**
  * Return left edge sensor value (0-1023).
  */
//% group="Edge Sensors"
//% weight=15
//% blockGap=8
//% blockId=sumobit_read_edge_L_value
//% block="left edge sensor value"
export function readEdgeLValue(): number {
    return pins.analogReadPin(EDGE_L_PIN);
}


/**
* Compare the edge sensors value (0-1023) with a number and return the result (true/false).
* @param compareType More than or less than.
* @param threshold The value to compare with. eg: 512
*/
//% group="Edge Sensors"
//% weight=14
//% blockGap=40
//% blockId=sumobit_compare_edge_value
//% block="%side edge sensor value %compareType %threshold"
//% threshold.min=0 threshold.max=1023
//% blockHidden=true
export function compareEdge(side: EdgeSide, compareType: EdgeCompareType, threshold: number,): boolean {

    let result = false;
    let R = readEdgeRValue();
    let L = readEdgeLValue();


    switch (side) {
        case EdgeSide.Right:
            if ((R > threshold && EdgeCompareType.MoreThan) || (R < threshold && EdgeCompareType.LessThan)) {
                result = true;
            }
            break;

        case EdgeSide.Left:
            if ((L > threshold && EdgeCompareType.MoreThan) || (L < threshold && EdgeCompareType.LessThan)) {
                result = true;
            }
            break;

        case EdgeSide.Both:
            if (((R > threshold && L > threshold) && EdgeCompareType.MoreThan) || ((R > threshold && L > threshold) && EdgeCompareType.LessThan)) {
                result = true;
            }
            break;
    }

    return result;

}
}
