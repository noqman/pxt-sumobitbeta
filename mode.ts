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

}