enum SensorPosition {
    //% block="left"
    Left2 = 0,

    //% block="front left"
    Left1 = 1,

    //% block="front center"
    Center = 2,

    //% block="front right"
    Right1 = 3,

    //% block="right"
    Right2 = 4,

    //% block="all"
    All = 5,

    //% block="none"
    None = 6
}

enum Sensor{
    //% block="left"
    Left2 = 0,

    //% block="front left"
    Left1 = 1,

    //% block="front center"
    Center = 2,

    //% block="front right"
    Right1 = 3,

    //% block="right"
    Right2 = 4,
}

let L  = pins.digitalReadPin(DigitalPin.P16);
let FL = pins.digitalReadPin(DigitalPin.P15);
let FC = pins.digitalReadPin(DigitalPin.P14);
let FR = pins.digitalReadPin(DigitalPin.P13);
let R  = pins.digitalReadPin(DigitalPin.P12);

namespace sumobit{

    /**
    * Give each. 
    */
    //% group="Opponent Sensors"
    //% weight=18
    //% blockGap=8
    //% blockId=sumobit_maker_object_read_digital
    //% block="Read %sensor value"
    export function OppSensorValue(sensor: Sensor): number {

        switch (sensor) {
            case Sensor.Left2:
                return pins.digitalReadPin(DigitalPin.P16);
            case Sensor.Left1:
                return pins.digitalReadPin(DigitalPin.P15);
            case Sensor.Center:
                return pins.digitalReadPin(DigitalPin.P14);
            case Sensor.Right1:
                return pins.digitalReadPin(DigitalPin.P13);
            case Sensor.Right2:
                return pins.digitalReadPin(DigitalPin.P12);

        }

    }

    /**
     * Return true if the Maker Object is low (Obstacle detected). 
     */
    //% group="Opponent Sensors"
    //% weight=17
    //% blockGap=8
    //% blockId=sumobit_maker_object_detect_opponent
    //% block="%position sensor detect opponent"
    //% position.fieldEditor="gridpicker" position.fieldOptions.columns=5
    export function OppSensorDetection(position: SensorPosition): boolean {

        switch (position) {
            case SensorPosition.None:
                if (L == 1 && FL == 1 && FC == 1 && FR == 1 && R == 1) 
                return true;
                else return false;

            case SensorPosition.Left2:
                if (L == 0 && FL == 1 && FC == 1 && FR == 1 && R == 1)
                return true;
                else return false;

            case SensorPosition.Left1:
                if (L == 1 && FL == 0 && FC == 1 && FR == 1 && R == 1)
                return true;
                else return false;

            case SensorPosition.Center:
                if (L == 1 && FL == 1 && FC == 0 && FR == 1 && R == 1)
                return true;
                else return false;

            case SensorPosition.Right1:
                if (L == 1 && FL == 1 && FC == 1 && FR == 0 && R == 1)
                return true;
                else return false;

            case SensorPosition.Right2:
                if (L == 1 && FL == 1 && FC == 1 && FR == 1 && R == 0)
                return true;
                else return false;

            case SensorPosition.All:
                if (L == 0 && FL == 0 && FC == 0 && FR == 0 && R == 0)
                return true;
                else return false;
        }

        return false;
    }
    

}