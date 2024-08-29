/*******************************************************************************
 * Functions for sumo:bit motor current measurement.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/


const MOTORCURRENT_EVENT_SOURCE = 0x02;


enum MotorSelect {
    M1 = 0,
    M2 = 1,

    //% block="both"
    AND = 1000

}

enum CompareSelect {
    M1 = 0,
    M2 = 1,

    //% block="both"
    AND = 1000

}

enum CompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};

namespace sumobit {

    let bgFunctionCreated = false;

    // Event type.
    let eventType = 0;

    // Array for mode value.
    let thresholdsArray: number[] = [];
    let compareTypesArray: CompareType[] = [];
    let motorArray: CompareSelect[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];


    /**
     * Return motor 1 current value.
     */
    //% group="Motor Current"
    //% weight=10
    //% blockGap=8
    //% blockId=sumobit_read_m1_current_value
    //% block="motor 1 current"
    export function readM1CurrentValue(): number {
        let highByte: number;
        let lowByte: number;
        highByte = sumobit.i2cRead(REG_ADD_AN1_HIGH);
        lowByte = sumobit.i2cRead(REG_ADD_AN1_LOW);
        return ((highByte << 8) | lowByte) / 100;
    }

    /**
     * Return motor 2 current value.
     */
    //% group="Motor Current"
    //% weight=9
    //% blockGap=8
    //% blockId=sumobit_read_m2_current_value
    //% block="motor 2 current"
    export function readM2CurrentValue(): number {
        let highByte: number;
        let lowByte: number;
        highByte = sumobit.i2cRead(REG_ADD_AN2_HIGH);
        lowByte = sumobit.i2cRead(REG_ADD_AN2_LOW);
        return ((highByte << 8) | lowByte) / 100;
    }
    
    

    /**
    * Compare the motor current value (0.00-20.00) and returns the result (true/false).
    * @param threshold The current DIP position. eg: 14.00
    */
    //% group="Motor Current"
    //% weight=8
    //% blockGap=40
    //% blockId=sumobit_compare_current_value
    //% block="%motor current %compareType %threshold"
    //% threshold.min=0.00 threshold.max=15.00 REG_ADD_AN1_HIGH
    export function compareCurrent(motor: CompareSelect, compareType: CompareType,  threshold: number,): boolean {
        let result = false;
        let a = readM1CurrentValue();
        let b = readM2CurrentValue();
        

        switch (motor) {
            case CompareSelect.M1:
            if((a > threshold && CompareType.MoreThan) || (a < threshold && CompareType.LessThan)){
            result = true;}
            break;

            case CompareSelect.M2:
            if((b > threshold && CompareType.MoreThan) || (b < threshold && CompareType.LessThan)){
            result = true;}
            break;

            case CompareSelect.AND:
            if (((a > threshold && b > threshold) && CompareType.MoreThan) || ((a > threshold && b > threshold) && CompareType.LessThan)){
            result = true;
            }
            break;
        }
 
        return result;
    }

 



/**
* Compare the motor current value with a number and do something when true.
* @param motor M1, M2 or Both.
* @param compareType More than or less than.
* @param threshold The value to compare with. eg: 7.00
* @param handler Code to run when the event is raised.
*/
//% group="Motor Current"
//% weight=6
//% blockGap=40
//% blockId=sumobit_motorcurrent_event
//% block="on %motor current value %compareType %threshold"
//% threshold.min=0.00 threshold.max=15.00
export function onEvent(motor: CompareSelect, compareType: CompareType, threshold: number, handler: Action): void {
    // Use a new event type everytime a new event is create.
    eventType++;

    // Add the event info to the arrays.
    motorArray.push(motor);
    compareTypesArray.push(compareType);
    thresholdsArray.push(threshold);

    // Create a placeholder for the old compare result.
    oldCompareResult.push(false);

    // Register the event.
    control.onEvent(MOTORCURRENT_EVENT_SOURCE, eventType, handler);

    // Create a function in background if haven't done so.
    // This function will check for pot value and raise the event if the condition is met.
    if (bgFunctionCreated == false) {
        control.inBackground(function () {

            while (true) {
                // Loop for all the event created.
                for (let i = 0; i < eventType; i++) {
                   
                    // Check if the condition is met.
                    if (compareCurrent(motorArray[i], compareTypesArray[i], thresholdsArray[i]) == true) {
                        // Raise the event if the compare result changed from false to true.
                        if (oldCompareResult[i] == false) {
                            control.raiseEvent(MOTORCURRENT_EVENT_SOURCE, i + 1);
                        }

                        // Save old compare result.
                        oldCompareResult[i] = true;
                    }
                    else {
                        // Save old compare result.
                        oldCompareResult[i] = false;
                    }
                    basic.pause(10)
                }
            }

        });

        bgFunctionCreated = true;
    }

}

}