/*******************************************************************************
 * Functions for sumo:bit motor current measurement.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/


const MOTORCURRENT1_EVENT_SOURCE = 0x02;
const MOTORCURRENT2_EVENT_SOURCE = 0x03;

enum MotorSelect {
    M1 = 0,
    M2 = 1,
    
    //% block="either one"
    OR = 500,

    //% block="both"
    AND = 1000

}

enum CompareSelect {
    M1 = 0,
    M2 = 1,

    ////% block="either one"
    //OR = 500,

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
    let modevalueArray: number[] = [];

    // Array for old compare result.
    let oldCompareResult: boolean[] = [];


    /**
     * Return motor 1 current value.
     */
    //% group="Motor Current"
    //% weight=13
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
    //% weight=12
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
    //% weight=11
    //% blockGap=40
    //% blockId=sumobit_compare_current_value
    //% block="%motor %compareType threshold"
    //% threshold.min=0 threshold.max=15 REG_ADD_AN1_HIGH
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

 
}