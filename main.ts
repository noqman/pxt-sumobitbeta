const I2C_ADDRESS = 0x09;

// Register address.
const REG_ADD_REVISION = 0;
const REG_ADD_SERVO_1 = 1;
const REG_ADD_SERVO_2 = 2;
const REG_ADD_PWM1 = 3;
const REG_ADD_DIR1 = 4;
const REG_ADD_PWM2 = 5;
const REG_ADD_DIR2 = 6;
const REG_ADD_VIN_HIGH = 7;
const REG_ADD_VIN_LOW = 8;
const REG_ADD_AN1_HIGH = 9;
const REG_ADD_AN1_LOW = 10;
const REG_ADD_AN2_HIGH = 11;
const REG_ADD_AN2_LOW = 12;
const REG_ADD_DIP = 13;
const REG_ADD_RESET = 14;

/**
* Blocks for SUMO:BIT.
*/
//% weight=30 color=#ff8000 icon="\uf6a7" block="SUMO:BIT"
//% groups=['DC Motors', 'Servos' , 'Mode', 'Opponent Sensors']
namespace sumobit {

brakeMotor(MotorChannel.M1);
brakeMotor(MotorChannel.M2);

// Disable the servos.
disableServo(ServoChannel.S1);
disableServo(ServoChannel.S2);

/**
 * Limit the range of a number.
 * @param value The number we want to limit.
 * @param min Minimum value of the number.
 * @param max Maximum value of the number.
 */
//% blockHidden=true
//% blockId=sumobit_limit
export function limit(value: number, min: number, max: number): number {
    if (value < min) {
        value = min;
    }
    else if (value > max) {
        value = max;
    }
    return value;
}


/**
     * I2C read from the register of RP2040.
     * @param register Register address.
     */
//% blockHidden=true
//% blockId=sumobit_i2c_read
export function i2cRead(register: number): number {
    let value = 0;
    pins.i2cWriteNumber(I2C_ADDRESS, register, NumberFormat.UInt8LE, true);
    value = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8LE);
    return value;
}



/**
 * I2C write to the register of RP2040.
 * @param register Register address.
 * @param data Data to write.
 */
//% blockHidden=true
//% blockId=sumobit_i2c_write
export function i2cWrite(register: number, data: number): void {
    let buffer = pins.createBuffer(2);
    buffer[0] = register;
    buffer[1] = data;
    pins.i2cWriteBuffer(I2C_ADDRESS, buffer);
}
    

}
