/*******************************************************************************
 * Functions for SUMO:BIT servos and motors driver.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/



// Motor direction.
enum MotorDirection {
    //% block="forward"
    Forward = 0,

    //% block="backward"
    Backward = 1
};

// Servo Channel.
enum ServoChannel {
    S1 = REG_ADD_SRV1_POS,
    S2 = REG_ADD_SRV2_POS,

    //% block="all"
    All = 1000,
};



namespace sumobit {

    // Motor channel.
    export enum MotorChannel {
        MR = 0,
        ML = 1,

        //% block="both"
        All = 1000,
    };

    /**
     * Brake the motor
     * @param motor Motor channel. eg: Motor.M1, Motor.M2
     */
    //% group="DC Motors"
    //% weight=29
    //% blockGap=8
    //% blockId=sumobit_brake_motor
    //% block="brake motor %motor"
    export function brakeMotor(motor: MotorChannel): void {
        switch (motor) {
            case MotorChannel.MR:
                sumobit.i2cWrite(REG_ADD_PWM1, 0);
                sumobit.i2cWrite(REG_ADD_DIR1, 0);
                break;

            case MotorChannel.ML:
                sumobit.i2cWrite(REG_ADD_PWM2, 0);
                sumobit.i2cWrite(REG_ADD_DIR2, 0);
                break;

            case MotorChannel.All:
                sumobit.i2cWrite(REG_ADD_PWM1, 0);
                sumobit.i2cWrite(REG_ADD_DIR1, 0);
                sumobit.i2cWrite(REG_ADD_PWM2, 0);
                sumobit.i2cWrite(REG_ADD_DIR2, 0);
                break;
        }
    }


    /**
     * Run the motor forward or backward (Speed = 0-255).
     * @param motor Motor channel.
     * @param direction Motor direction.
     * @param speed Motor speed (0-255). eg: 128
     */
    //% group="DC Motors"
    //% weight=30
    //% blockGap=8
    //% blockId=sumobit_run_motor
    //% block="run motor %motor %direction at speed %speed"
    //% speed.min=0 speed.max=255
    export function runMotor(motor: MotorChannel, direction: MotorDirection, speed: number): void {
        speed = sumobit.limit(speed, 0, 255);
        switch (motor) {
            case MotorChannel.MR:
                if (direction == MotorDirection.Forward) {
                    sumobit.i2cWrite(REG_ADD_PWM1, speed);
                    sumobit.i2cWrite(REG_ADD_DIR1, 0);
                }
                else {
                    sumobit.i2cWrite(REG_ADD_PWM1, speed);
                    sumobit.i2cWrite(REG_ADD_DIR1, 1);
                }
                break;

            case MotorChannel.ML:
                if (direction == MotorDirection.Forward) {
                    sumobit.i2cWrite(REG_ADD_PWM2, speed);
                    sumobit.i2cWrite(REG_ADD_DIR2, 0);
                }
                else {
                    sumobit.i2cWrite(REG_ADD_PWM2, speed);
                    sumobit.i2cWrite(REG_ADD_DIR2, 1);
                }
                break;

            case MotorChannel.All:
                if (direction == MotorDirection.Forward) {
                    sumobit.i2cWrite(REG_ADD_PWM1, speed);
                    sumobit.i2cWrite(REG_ADD_DIR1, 0);
                    sumobit.i2cWrite(REG_ADD_PWM2, speed);
                    sumobit.i2cWrite(REG_ADD_DIR2, 0);
                }
                else {
                    sumobit.i2cWrite(REG_ADD_PWM1, speed);
                    sumobit.i2cWrite(REG_ADD_DIR1, 1);
                    sumobit.i2cWrite(REG_ADD_PWM2, speed);
                    sumobit.i2cWrite(REG_ADD_DIR2, 1);
                }
                break;
        }
    }


    /**
     * Disable the servo.
     * @param servo Servo channel.
     */
    //% group="Servos"
    //% weight=27
    //% blockGap=8
    //% blockId=sumobit_disable_servo
    //% block="disable servo %servo"
    export function disableServo(servo: ServoChannel): void {
        if (servo == ServoChannel.All) {
            sumobit.i2cWrite(ServoChannel.S1, 0);
            sumobit.i2cWrite(ServoChannel.S2, 0);
        }
        else {
            sumobit.i2cWrite(servo, 0);
        }
    }


    /**
     * Set the position for servo (0-180 degrees).
     * @param servo Servo channel.
     * @param position Servo positon. eg: 90
     */
    //% group="Servos"
    //% weight=28
    //% blockGap=8
    //% blockId=sumobit_set_servo_position
    //% block="set servo %servo position to %position degrees"
    //% position.min=0 position.max=180
    export function setServoPosition(servo: ServoChannel, position: number): void {
        position = sumobit.limit(position, 0, 180);

        // pulseWidth = position * 20 / 18 + 50
        if (servo == ServoChannel.All) {
            sumobit.i2cWrite(ServoChannel.S1, position);
            sumobit.i2cWrite(ServoChannel.S2, position);
        }
        else {
            sumobit.i2cWrite(servo, position);
        }
    }

}