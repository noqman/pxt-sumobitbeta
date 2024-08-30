namespace sumobit{

/**
* Return battery current voltage.
*/
//% group="Battery"
//% weight=12
//% blockGap=8
//% blockId=sumobit_read_VIN
//% block="battery voltage"
export function readBatteryValue(): number {
    let highByte: number;
    let lowByte: number;
    highByte = sumobit.i2cRead(REG_ADD_VIN_HIGH);
    lowByte = sumobit.i2cRead(REG_ADD_VIN_LOW);
    return ((highByte << 8) | lowByte) / 100;}
}