/*******************************************************************************
 * Functions for sumo:bit mode.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

namespace sumobit {

/**
 * Return mode value (0-15).
 */
//% group="Mode"
//% weight=16
//% blockGap=8
//% blockId=sumobit_read_mode_value
//% block="mode"
export function readModeValue(): number {
    return sumobit.i2cRead(REG_ADD_DIP);
}

/**
* Check the mode value (0-15) and returns the result (true/false).
* @param modevalue The current DIP position. eg: 7
*/
//% group="Mode"
//% weight=15
//% blockGap=40
//% blockId=sumobit_check_mode_value
//% block="Mode % modevalue"
//% modevalue.min=0 modevalue.max=15
export function checkMode(modevalue: number): boolean {
let result = false;

    if (readModeValue() === modevalue) {
    result = true;
        }

        return result;
    }


}