/*******************************************************************************
 * Functions for sumo:bit mode.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/
const MODE_EVENT_SOURCE = 0x01;
namespace sumobit {

    let bgFunctionCreated = false;

    // Event type.
    let eventType = 0;

    // Array for mode value.
    let modevalueArray: number[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];


/**
 * Return mode value (0-15).
 */
//% group="Mode"
//% weight=46
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
//% weight=45
//% blockGap=40
//% blockId=sumobit_check_mode_value
//% block="Mode %modevalue"
//% modevalue.min=0 modevalue.max=15
export function checkMode(modevalue: number): boolean {
let result = false;

    if (readModeValue() === modevalue) {
    result = true;
        }

        return result;
    }

/**
* Check current mode value and do something when true.
* @param modevalue The current mode value. eg: 7
* @param handler Code to run when the event is raised.
*/
//% weight=44
//% blockGap=8
//% blockId=sumobit_mode_event
//% block="on mode value %modevalue"
//% modevalue.min=0 modevalue.max=15
export function onModeEvent(modevalue: number, handler: Action): void {
// Use a new event type everytime a new event is create.
        eventType++;

        // Add the event info to the arrays.
        modevalueArray.push(modevalue);

        // Create a placeholder for the old compare result.
        oldCompareResult.push(false);

        // Register the event.
        control.onEvent(MODE_EVENT_SOURCE, eventType, handler);

        // Create a function in background if haven't done so.
        // This function will check for pot value and raise the event if the condition is met.
        if (bgFunctionCreated == false) {
            control.inBackground(function () {

                while (true) {
                    // Loop for all the event created.
                    for (let i = 0; i < eventType; i++) {

                        // Check if the condition is met.
                        if (checkMode(modevalueArray[i]) == true) {
                            // Raise the event if the compare result changed from false to true.
                            if (oldCompareResult[i] == false) {
                                control.raiseEvent(MODE_EVENT_SOURCE, i + 1);
                            }

                            // Save old compare result.
                            oldCompareResult[i] = true;
                        }
                        else {
                            // Save old compare result.
                            oldCompareResult[i] = false;
                        }
                        basic.pause(20)
                    }
                }

            });

            bgFunctionCreated = true;
        }

    }

}